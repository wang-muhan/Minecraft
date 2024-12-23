import * as THREE from 'three'
import {Water} from 'three/examples/jsm/objects/Water'

import Materials from './mesh/materials'
import Block from './mesh/block'
import Highlight from './highlight'
import Noise from './noise'
import WaterSimulation from './simulation'

import {BlockType, MaterialType, WorldType, overworld_blocksFactor, nether_blocksFactor} from './config'

export {BlockType, MaterialType, WorldType, overworld_blocksFactor, nether_blocksFactor} from './config'

import Generate from './worker/generate?worker'

function throttle(func: Function, limit: number) {
    let lastFunc: number;
    let lastRan: number;
    return function(this: any, ...args: any[]) {
        const context = this;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = window.setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    }
}

export default class Terrain {
    constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) {
        this.scene = scene
        this.camera = camera
        this.renderer = renderer

        this.waterSimulation.setRenderer(renderer)
        this.waterSimulation.setWater(this.water)
        this.waterSimulation.setViewer(camera)


        this.maxCount =
            (this.distance * this.chunkSize * 2 + this.chunkSize) ** 2 + 500
        this.highlight = new Highlight(scene, camera, this)

        this.overworld.add(this.cloud)

        this.water.rotation.x = -Math.PI / 2
        this.water.material.transparent = true
        this.water.material.side = THREE.DoubleSide
        this.water.position.setY(30)
        this.water.position.setX(50)
        this.water.position.setZ(50)
        // this.overworld.add(this.water)

        this.outerShape = new THREE.Shape();
        this.outerShape.moveTo(-500, -500);  // 左下角
        this.outerShape.lineTo(-500, 500);   // 左上角
        this.outerShape.lineTo(500, 500);    // 右上角
        this.outerShape.lineTo(500, -500);   // 右下角
        this.outerShape.lineTo(-500, -500);  // 闭合路径

        const holePath = new THREE.Path();
        holePath.moveTo(0, 0);          // 孔的左下角
        holePath.lineTo(0, 100);        // 孔的左上角
        holePath.lineTo(100, 100);      // 孔的右上角
        holePath.lineTo(100, 0);        // 孔的右下角
        holePath.lineTo(0, 0);          // 闭合路径

        this.outerShape.holes.push(holePath)
        this.waterGeometry_ = new THREE.ShapeGeometry(this.outerShape)
        this.water_ = new Water(this.waterGeometry_, {
            textureWidth: 256,
            textureHeight: 256,
            waterNormals: new THREE.TextureLoader().load(
                'src/static/water.png',
                function (texture) {
                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                }
            ),
            // sunDirection: new THREE.Vector3(),
            // sunColor: 0xffffff,
            waterColor: 0x000066,
            // distortionScale: 3.7,
            fog: false,
            side: THREE.DoubleSide,
            alpha: 0.7
        })
        this.water_.rotation.x = -Math.PI / 2
        this.water_.material.transparent = true
        this.water_.position.set(0, 30, 100)
        // this.overworld.add(this.water_)

        // generate worker callback handler (set the idMap, blocksCount, and instanceMatrix)
        this.generateWorker.onmessage = (
            msg: MessageEvent<{
                idMap: Map<string, number>
                arrays: ArrayLike<number>[]
                blocksCount: number[]
            }>
        ) => {
            this.resetBlocks()
            this.idMap = msg.data.idMap
            this.overworld_blocksCount = msg.data.blocksCount

            for (let i = 0; i < msg.data.arrays.length; i++) {
                this.overworld_blocks[i].instanceMatrix = new THREE.InstancedBufferAttribute(
                    (this.overworld_blocks[i].instanceMatrix.array = msg.data.arrays[i]),
                    16
                )
            }
            for (const block of this.overworld_blocks) {
                block.instanceMatrix.needsUpdate = true
            }

            // nether part
            this.nether_blocksCount = msg.data.blocksCount

            for (let i = 0; i < msg.data.arrays.length; i++) {
                this.nether_blocks[i].instanceMatrix = new THREE.InstancedBufferAttribute(
                    (this.nether_blocks[i].instanceMatrix.array = msg.data.arrays[i]),
                    16
                )
            }
            for (const block of this.nether_blocks) {
                block.instanceMatrix.needsUpdate = true
            }

            if (this.worldtype === WorldType.overworld) {
                // this.current_blocks = this.overworld_blocks
                // this.current_blocksCount = this.overworld_blocksCount
                // this.current_blocksFactor = this.overworld_blocksFactor
                // this.current_world = this.overworld
                this.scene.add(this.overworld)
            }

            if (this.worldtype === WorldType.nether) {
                // this.current_blocks = this.nether_blocks
                // this.current_blocksCount = this.nether_blocksCount
                // this.current_blocksFactor = this.nether_blocksFactor
                // this.current_world = this.nether
                this.scene.add(this.nether)
            }

            // this.scene.add(this.current_world)
        }
    }

    // core properties
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    renderer: THREE.WebGLRenderer
    raycaster = new THREE.Raycaster()
    distance = 3
    chunkSize = 24

    // terrain properties
    maxCount: number
    chunk = new THREE.Vector2(0, 0)
    previousChunk = new THREE.Vector2(0, 0)
    noise = new Noise()

    // materials
    materials = new Materials()
    materialType = Object.keys(MaterialType) //.map((key) => MaterialType[key])

    // world properties
    overworld_blocks: THREE.InstancedMesh[] = []
    overworld_blocksCount: number[] = []
    overworld_blocksFactor = overworld_blocksFactor
    nether_blocks: THREE.InstancedMesh[] = []
    nether_blocksCount: number[] = []
    nether_blocksFactor = nether_blocksFactor
    // current_blocks: THREE.InstancedMesh[] = []
    // current_blocksCount: number[] = []
    // current_blocksFactor: number[]


    customBlocks: Block[] = []
    highlight: Highlight

    // idMap.set(`${x}_${y + yOffset}_${z}`, blocksCount[BlockType])
    idMap = new Map<string, number>()
    generateWorker = new Generate()

    // cloud
    cloud = new THREE.InstancedMesh(
        new THREE.BoxGeometry(20, 5, 14),
        new THREE.MeshStandardMaterial({
            transparent: true,
            color: 0xffffff,
            opacity: 0.4
        }),
        1000
    )

    // water
    testGeometry = new THREE.PlaneGeometry(1000, 1000)
    testMesh = new THREE.Mesh(
        this.testGeometry,
        new THREE.MeshStandardMaterial({
            color: 0x4169E1,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1.0
        })
    )

    waterState: boolean = false

    waterGeometry = new THREE.PlaneGeometry(100, 100);
    outerShape: THREE.Shape
    waterGeometry_: THREE.ShapeGeometry 

    water = new Water(this.waterGeometry, {
        textureWidth: 256,
        textureHeight: 256,
        waterNormals: new THREE.TextureLoader().load(
            'src/static/img.png',
            function (texture) {
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            }
        ),
        // sunDirection: new THREE.Vector3(),
        // sunColor: 0xffffff,
        waterColor: 0x0000ff,
        // distortionScale: 3.7,
        fog: false,
        side: THREE.DoubleSide,
        alpha: 0.7
    });

    water_: Water

    waterSimulation = new WaterSimulation()

    //world groups
    overworld = new THREE.Group()
    nether = new THREE.Group()
    // current_world: THREE.Group
    worldtype = WorldType.overworld

    yOffsetstd = 1
    cloudCount = 0
    cloudGap = 5

    getCount = (type: BlockType) => {
        if (this.worldtype === WorldType.overworld) {
            return this.overworld_blocksCount[type]
        } else {
            return this.nether_blocksCount[type]
        }
        // return this.current_blocksCount[type]
    }

    setCount = (type: BlockType) => {
        // this.current_blocksCount[type] = this.current_blocksCount[type] + 1
        if (this.worldtype === WorldType.overworld) {
            this.overworld_blocksCount[type] = this.overworld_blocksCount[type] + 1
        } else {
            this.nether_blocksCount[type] = this.nether_blocksCount[type] + 1
        }
    }

    // initialize instance meshes of each type, blocksCount set to 0
    initBlocks = () => {

        const geometry = new THREE.BoxGeometry()

        // reset all blocks in overworld
        for (const block of this.overworld_blocks) {
            this.scene.remove(block)
        }
        this.overworld_blocks = []

        for (let i = 0; i < this.materialType.length; i++) {
            let block = new THREE.InstancedMesh(
                geometry,
                this.materials.get(this.materialType[i]),
                this.maxCount * this.overworld_blocksFactor[i]
            )
            block.name = BlockType[i]
            this.overworld_blocks.push(block)
            this.overworld.add(block)
        }

        this.overworld_blocksCount = new Array(this.materialType.length).fill(0)

        // reset all blocks in nether, change the order of materials
        for (const block of this.nether_blocks) {
            this.scene.remove(block)
        }
        this.nether_blocks = []

        for (let i = 0; i < this.materialType.length; i++) {
            let block = new THREE.InstancedMesh(
                geometry,
                this.materials.get(this.materialType[i]),
                this.maxCount * this.nether_blocksFactor[i]
            )
            block.name = BlockType[i]
            this.nether_blocks.push(block)
            this.nether.add(block)
        }

        this.nether_blocksCount = new Array(this.materialType.length).fill(0)
    }

    // reset count and instance matrix of each block
    resetBlocks = () => {
        for (let i = 0; i < this.overworld_blocks.length; i++) {
            this.overworld_blocks[i].instanceMatrix = new THREE.InstancedBufferAttribute(
                new Float32Array(this.maxCount * this.overworld_blocksFactor[i] * 16),
                16
            )
        }

        for (let i = 0; i < this.nether_blocks.length; i++) {
            this.nether_blocks[i].instanceMatrix = new THREE.InstancedBufferAttribute(
                new Float32Array(this.maxCount * this.nether_blocksFactor[i] * 16),
                16
            )
        }
    }

    // generate terrain from scratch
    generate = () => {
        this.overworld_blocksCount = new Array(this.overworld_blocks.length).fill(0)
        this.nether_blocksCount = new Array(this.nether_blocks.length).fill(0)

        // post work to generate worker
        if (this.worldtype === WorldType.overworld) {
            this.generateWorker.postMessage({
                distance: this.distance,
                chunk: this.chunk,
                noiseSeed: this.noise.seed,
                treeSeed: this.noise.treeSeed,
                stoneSeed: this.noise.stoneSeed,
                coalSeed: this.noise.coalSeed,
                idMap: new Map<string, number>(),
                blocksFactor: this.overworld_blocksFactor,
                blocksCount: this.overworld_blocksCount,
                customBlocks: this.customBlocks,
                chunkSize: this.chunkSize,
                worldType: WorldType.overworld
            })
        }

        if (this.worldtype === WorldType.nether) {
            this.generateWorker.postMessage({
                distance: this.distance,
                chunk: this.chunk,
                noiseSeed: this.noise.seed,
                treeSeed: this.noise.treeSeed,
                stoneSeed: this.noise.stoneSeed,
                coalSeed: this.noise.coalSeed,
                idMap: new Map<string, number>(),
                blocksFactor: this.nether_blocksFactor,
                blocksCount: this.nether_blocksCount,
                customBlocks: this.customBlocks,
                chunkSize: this.chunkSize,
                worldType: WorldType.nether
            })
        }

        // cloud(only for overworld)

        if (this.cloudGap++ > 5) {
            this.cloudGap = 0
            this.cloud.instanceMatrix = new THREE.InstancedBufferAttribute(
                new Float32Array(1000 * 16),
                16
            )
            this.cloudCount = 0
            for (
                let x =
                    -this.chunkSize * this.distance * 3 + this.chunkSize * this.chunk.x;
                x <
                this.chunkSize * this.distance * 3 +
                this.chunkSize +
                this.chunkSize * this.chunk.x;
                x += 20
            ) {
                for (
                    let z =
                        -this.chunkSize * this.distance * 3 + this.chunkSize * this.chunk.y;
                    z <
                    this.chunkSize * this.distance * 3 +
                    this.chunkSize +
                    this.chunkSize * this.chunk.y;
                    z += 20
                ) {
                    const matrix = new THREE.Matrix4()
                    matrix.setPosition(x, 80 + (Math.random() - 0.5) * 30, z)

                    if (Math.random() > 0.8) {
                        this.cloud.setMatrixAt(this.cloudCount++, matrix)
                    }
                }
            }
            this.cloud.instanceMatrix.needsUpdate = true
        }
    }

    // generate adjacent blocks after removing a block (vertical infinity world), keep the type of the block
    generateAdjacentBlocks = (position: THREE.Vector3) => {
        const {x, y, z} = position
        const noise = this.noise
        const yOffset = Math.floor(
            noise.get(x / noise.gap, z / noise.gap, noise.seed) * noise.amp
        )

        // do not generate blocks above the existing blocks
        if (y > 30 + yOffset) {
            return
        }

        const stoneOffset =
            noise.get(x / noise.stoneGap, z / noise.stoneGap, noise.stoneSeed) *
            noise.stoneAmp

        let type: BlockType

        if (stoneOffset > noise.stoneThreshold || y < 23) {
            type = BlockType.stone
        } else {
            if (yOffset < -3) {
                type = BlockType.sand
            } else {
                type = BlockType.dirt
            }
        }

        this.buildBlock(new THREE.Vector3(x, y - 1, z), type)
        this.buildBlock(new THREE.Vector3(x, y + 1, z), type)
        this.buildBlock(new THREE.Vector3(x - 1, y, z), type)
        this.buildBlock(new THREE.Vector3(x + 1, y, z), type)
        this.buildBlock(new THREE.Vector3(x, y, z - 1), type)
        this.buildBlock(new THREE.Vector3(x, y, z + 1), type)

        // this.current_blocks[type].instanceMatrix.needsUpdate = true
        if (this.worldtype === WorldType.overworld) {
            this.overworld_blocks[type].instanceMatrix.needsUpdate = true
        } else {
            this.nether_blocks[type].instanceMatrix.needsUpdate = true
        }

    }

    //build a custom block at a specific position
    buildBlock = (position: THREE.Vector3, type: BlockType) => {
        const noise = this.noise

        // Do not generate at natural terrain
        const yOffset = Math.floor(
            noise.get(position.x / noise.gap, position.z / noise.gap, noise.seed) *
            noise.amp
        )
        if (position.y >= 30 + yOffset || position.y < 0) {
            return
        }

        position.y === 0 && (type = BlockType.bedrock)

        // Do not generate at custom blocks
        for (const block of this.customBlocks) {
            if (
                block.x === position.x &&
                block.y === position.y &&
                block.z === position.z
            ) {
                return
            }
        }

        // add new placed custom block
        this.customBlocks.push(
            new Block(position.x, position.y, position.z, type, true)
        )

        // update this.overworld_blocks
        const matrix = new THREE.Matrix4()
        matrix.setPosition(position)
        this.overworld_blocks[type].setMatrixAt(this.getCount(type), matrix)
        this.overworld_blocks[type].instanceMatrix.needsUpdate = true
        this.setCount(type)
    }

    changeWorld= () => {
        // let current = this.current_world
        if (this.worldtype === WorldType.overworld) {
            this.scene.remove(this.overworld)
            this.scene.add(this.nether)
            this.worldtype = WorldType.nether
            // this.scene.remove(this.current_world)
            // this.current_blocks = this.nether_blocks
            // this.current_blocksCount = this.nether_blocksCount
            // this.current_blocksFactor = this.nether_blocksFactor
            // this.current_world = this.nether
            // this.scene.add(this.current_world)
        }

        else if (this.worldtype === WorldType.nether) {
            this.scene.remove(this.nether)
            this.scene.add(this.overworld)
            this.worldtype = WorldType.overworld
            // this.scene.remove(this.current_world)
            // this.current_blocks = this.overworld_blocks
            // this.current_blocksCount = this.overworld_blocksCount
            // this.current_blocksFactor = this.overworld_blocksFactor
            // this.current_world = this.overworld
            // this.scene.add(this.current_world)
        }

        // for (const block of this.current_blocks) {
        //     block.instanceMatrix.needsUpdate = true
        // }

        this.generate()


        // this.scene.remove(current)
        // this.scene.add(this.current_world)
    }

    changeWater = () => {
        this.waterState = !this.waterState
        if (this.waterState) {
            // this.overworld.remove(this.testMesh)
            this.overworld.add(this.water)
            this.overworld.add(this.water_)
        } else {
            this.overworld.remove(this.water)
            this.overworld.remove(this.water_)
            // this.overworld.add(this.testMesh)
        }
    }

    getNearbyBlocks = (position: THREE.Vector3) => {
        let index = 0
        let instanceMesh = new THREE.InstancedMesh(
            new THREE.BoxGeometry(),
            new THREE.MeshBasicMaterial(),
            1000
        )
        instanceMesh.instanceMatrix = new THREE.InstancedBufferAttribute(
            new Float32Array(1000 * 16),
            16
        )
        const matrix = new THREE.Matrix4()
        const idMap = new Map<string, number>()
        const noise = this.noise
        let xPos = Math.round(position.x)
        let zPos = Math.round(position.z)

        for (let i = -4; i < 5; i++) {
            for (let j = -4; j < 5; j++) {
                // check terrain
                let x = xPos + i
                let z = zPos + j
                let y =
                    Math.floor(
                    noise.get(x / noise.gap, z / noise.gap, noise.seed) * noise.amp
                    ) + 30

                idMap.set(`${x}_${y}_${z}`, index)
                matrix.setPosition(x, y, z)
                instanceMesh.setMatrixAt(index++, matrix)

                let stoneOffset =
                    noise.get(x / noise.stoneGap, z / noise.stoneGap, noise.stoneSeed) *
                    noise.stoneAmp

                let treeOffset =
                    noise.get(x / noise.treeGap, z / noise.treeGap, noise.treeSeed) *
                    noise.treeAmp

                if (this.worldtype === WorldType.overworld) {
                    // check tree
                    if (
                        treeOffset > noise.treeThreshold &&
                        y - 30 >= -3 &&
                        stoneOffset < noise.stoneThreshold
                    ) {
                        for (let t = 1; t <= noise.treeHeight; t++) {
                            idMap.set(`${x}_${y + t}_${z}`, index)
                            matrix.setPosition(x, y + t, z)
                            instanceMesh.setMatrixAt(index++, matrix)
                        }
            
                        // leaf
                        for (let i = -3; i < 3; i++) {
                            for (let j = -3; j < 3; j++) {
                                for (let k = -3; k < 3; k++) {
                                    if (i === 0 && k === 0) {
                                    continue
                                }
                                let leafOffset =
                                    noise.get(
                                        (x + i + j) / noise.leafGap,
                                        (z + k) / noise.leafGap,
                                        noise.leafSeed
                                    ) * noise.leafAmp
            
                                if (leafOffset > noise.leafThreshold) {
                                    idMap.set(
                                        `${x + i}_${y + noise.treeHeight + j}_${z + k}`,
                                        index
                                    )
                                    matrix.setPosition(x + i, y + noise.treeHeight + j, z + k)
                                    instanceMesh.setMatrixAt(index++, matrix)
                                }
                            }
                        }
                        }
                    }
                } else if (this.worldtype === WorldType.nether) {
                    y = 30
                    // generate ceilings
                    const ceilingmean = Math.floor(
                        noise.get(x / noise.netherGap, z / noise.netherGap, noise.netherSeed) * noise.netherAmp + 10
                    )
                    const ceilingstd = 1
                    for (let yOffset = ceilingmean - ceilingstd; yOffset <= ceilingmean - ceilingstd; yOffset++) {
                    matrix.setPosition(x, y + yOffset, z)
        
                    const stoneOffset =
                        noise.get(x / noise.stoneGap, z / noise.stoneGap, noise.stoneSeed) *
                        noise.stoneAmp
        
                    const coalOffset =
                        noise.get(x / noise.coalGap, z / noise.coalGap, noise.coalSeed) *
                        noise.coalAmp
        
                    // set stones and coal
                    if (stoneOffset > noise.stoneThreshold) {
                        if (coalOffset > noise.coalThreshold) {
                        // coal
                        idMap.set(`${x}_${y + yOffset}_${z}`, index)
                        instanceMesh.setMatrixAt(
                            index++,
                            matrix
                        )
                        } else {
                        // stone
                        idMap.set(`${x}_${y + yOffset}_${z}`, index)
                        instanceMesh.setMatrixAt(
                            index++,
                            matrix
                        )
                        }
                    }
        
                    // set grass, sand and water
                    else {
                        if (yOffset < -3) {
                        // sand
                        idMap.set(`${x}_${y + yOffset}_${z}`, index)
                        instanceMesh.setMatrixAt(
                            index++,
                            matrix
                        )
                        } else {
                        // nether_bricks
                        idMap.set(`${x}_${y + yOffset}_${z}`, index)
                        instanceMesh.setMatrixAt(
                            index++,
                            matrix
                        )
                        }
                    }
                    }
        
                    // generate magma
                    const yOffset = y - 30
                    if (
                        treeOffset > noise.magmaThreshold &&
                        yOffset >= -3 && // not in water or sand
                        stoneOffset < noise.stoneThreshold // not on stones
                    ) {
                    for (let i = 1; i <= noise.magmaHeight; i++) {
                        idMap.set(`${x}_${y + yOffset + i}_${z}`, this.index)
        
                        matrix.setPosition(x, y + yOffset + i, z)
        
                        instanceMesh.setMatrixAt(
                            index++,
                            matrix
                        )
                    }
        
                    for (let j = -3; j < 3; j++) {
                        let l = (j + 5) / 2
                        for (let i = -l; i < l; i++) {
                        for (let k = -l; k < l; k++) {
                            if (i === 0 && k === 0) {
                            continue
                            }
                            const leafOffset =
                                noise.get(
                                    (x + i + j) / noise.leafGap,
                                    (z + k) / noise.leafGap,
                                    noise.leafSeed
                                ) * noise.leafAmp
        
                            // add leaf if noise is greater than threshold
                            if (leafOffset > noise.leafThreshold) {
        
                            idMap.set(`${x}_${y + yOffset + noise.magmaHeight + j}_${z}`, index)
        
                            matrix.setPosition(
                                x + i,
                                y + yOffset + noise.magmaHeight + j,
                                z + k
                            )
                            instanceMesh.setMatrixAt(
                                index++,
                                matrix
                            )
                            }
                        }
                        }
                    }
                    }
                }
                }
            }
        
        
            // check custom blocks
            for (const block of this.customBlocks) {
                if (block.placed) {
                matrix.setPosition(block.x, block.y, block.z)
                instanceMesh.setMatrixAt(index++, matrix)
                } else {
                if (idMap.has(`${block.x}_${block.y}_${block.z}`)) {
                    let id = idMap.get(`${block.x}_${block.y}_${block.z}`)
                    instanceMesh.setMatrixAt(
                        id!,
                        new THREE.Matrix4().set(
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0
                        )
                    )
                }
                }
            }
        return instanceMesh
    }

    getHight = (position: THREE.Vector3) => {
        position.y = 100
        const instanceMesh = this.getNearbyBlocks(position)
        const raycaster = new THREE.Raycaster()
        raycaster.far = 100
        raycaster.set(position, new THREE.Vector3(0, -1, 0))
        const intersects = raycaster.intersectObject(instanceMesh)
        if (intersects.length > 0) {
          return intersects[0].point.y
        }
        return 0
    }

    computeDistance = (box: THREE.Box3, sneaking: boolean) => {
        // process collision box
        const center = new THREE.Vector3()
        const size = new THREE.Vector3()
        box.getCenter(center)
        box.getSize(size)
        // get nearby blocks
        const instanceMesh = this.getNearbyBlocks(center)
        const frontLeftBottom = new THREE.Vector3( center.x + size.x / 2, center.y - size.y / 2, center.z - size.z / 2 )
        const frontRightBottom = new THREE.Vector3( center.x + size.x / 2, center.y - size.y / 2, center.z + size.z / 2 )
        const frontLeftTop = new THREE.Vector3( center.x + size.x / 2, center.y + size.y / 2, center.z - size.z / 2 )
        const frontRightTop = new THREE.Vector3( center.x + size.x / 2, center.y + size.y / 2, center.z + size.z / 2 )
        const backLeftBottom = new THREE.Vector3( center.x - size.x / 2, center.y - size.y / 2, center.z - size.z / 2 )
        const backRightBottom = new THREE.Vector3( center.x - size.x / 2, center.y - size.y / 2, center.z + size.z / 2 )
        const backLeftTop = new THREE.Vector3( center.x - size.x / 2, center.y + size.y / 2, center.z - size.z / 2 )
        const backRightTop = new THREE.Vector3( center.x - size.x / 2, center.y + size.y / 2, center.z + size.z / 2 )
        const frontDirection = new THREE.Vector3(1, 0, 0)
        const backDirection = new THREE.Vector3(-1, 0, 0)
        const leftDirection = new THREE.Vector3(0, 0, -1)
        const rightDirection = new THREE.Vector3(0, 0, 1)
        const topDirection = new THREE.Vector3(0, 1, 0)
        const bottomDirection = new THREE.Vector3(0, -1, 0)
        const raycaster = new THREE.Raycaster()
        raycaster.far = 1.0
        let frontDistance = Infinity
        let backDistance = Infinity
        let leftDistance = Infinity
        let rightDistance = Infinity
        let topDistance = Infinity
        let bottomDistance = Infinity
        let bottomFrontLeftDistance = Infinity
        let bottomFrontRightDistance = Infinity
        let bottomBackLeftDistance = Infinity
        let bottomBackRightDistance = Infinity
        // front 
        raycaster.set(frontLeftBottom, frontDirection)
        let intersects = raycaster.intersectObject(instanceMesh)
        if (intersects.length > 0) {
          frontDistance = Math.min(frontDistance, intersects[0].distance)
        }
        raycaster.set(frontRightBottom, frontDirection)
        intersects = raycaster.intersectObject(instanceMesh)
        if (intersects.length > 0) {
          frontDistance = Math.min(frontDistance, intersects[0].distance)
        }
        raycaster.set(frontLeftTop, frontDirection)
        intersects = raycaster.intersectObject(instanceMesh)
        if (intersects.length > 0) {
          frontDistance = Math.min(frontDistance, intersects[0].distance)
        }
        raycaster.set(frontRightTop, frontDirection)
        intersects = raycaster.intersectObject(instanceMesh)
        if (intersects.length > 0) {
          frontDistance = Math.min(frontDistance, intersects[0].distance)
        }
        // back 
        raycaster.set(backLeftBottom, backDirection)
        intersects = raycaster.intersectObject(instanceMesh)
        if (intersects.length > 0) {
          backDistance = Math.min(backDistance, intersects[0].distance)
        }
        raycaster.set(backRightBottom, backDirection)
        intersects = raycaster.intersectObject(instanceMesh)
        if (intersects.length > 0) {
          backDistance = Math.min(backDistance, intersects[0].distance)
        }
        raycaster.set(backLeftTop, backDirection)
        intersects = raycaster.intersectObject(instanceMesh)
        if (intersects.length > 0) {
          backDistance = Math.min(backDistance, intersects[0].distance)
        }
        raycaster.set(backRightTop, backDirection)
        intersects = raycaster.intersectObject(instanceMesh)
        if (intersects.length > 0) {
          backDistance = Math.min(backDistance, intersects[0].distance)
        }
        // left 
        raycaster.set(frontLeftBottom, leftDirection)
        intersects = raycaster.intersectObject(instanceMesh)
        if (intersects.length > 0) {
          leftDistance = Math.min(leftDistance, intersects[0].distance)
        }
        raycaster.set(backLeftBottom, leftDirection)
        intersects = raycaster.intersectObject(instanceMesh)
        if (intersects.length > 0) {
          leftDistance = Math.min(leftDistance, intersects[0].distance)
        }
        raycaster.set(frontLeftTop, leftDirection)
        intersects = raycaster.intersectObject(instanceMesh)
        if (intersects.length > 0) {
          leftDistance = Math.min(leftDistance, intersects[0].distance)
        }
        raycaster.set(backLeftTop, leftDirection)
        intersects = raycaster.intersectObject(instanceMesh)
        if (intersects.length > 0) {
          leftDistance = Math.min(leftDistance, intersects[0].distance)
        }
        // right 
        raycaster.set(frontRightBottom, rightDirection)
        intersects = raycaster.intersectObject(instanceMesh)
        if (intersects.length > 0) {
          rightDistance = Math.min(rightDistance, intersects[0].distance)
        }
        raycaster.set(backRightBottom, rightDirection)
        intersects = raycaster.intersectObject(instanceMesh)
        if (intersects.length > 0) {
          rightDistance = Math.min(rightDistance, intersects[0].distance)
        }
        raycaster.set(frontRightTop, rightDirection)
        intersects = raycaster.intersectObject(instanceMesh)
        if (intersects.length > 0) {
          rightDistance = Math.min(rightDistance, intersects[0].distance)
        }
        raycaster.set(backRightTop, rightDirection)
        intersects = raycaster.intersectObject(instanceMesh)
        if (intersects.length > 0) {
          rightDistance = Math.min(rightDistance, intersects[0].distance)
        }
        // top 
        raycaster.set(frontLeftTop, topDirection)
        intersects = raycaster.intersectObject(instanceMesh)
        if (intersects.length > 0) {
          topDistance = Math.min(topDistance, intersects[0].distance)
        }
        raycaster.set(frontRightTop, topDirection)
        intersects = raycaster.intersectObject(instanceMesh)
        if (intersects.length > 0) {
          topDistance = Math.min(topDistance, intersects[0].distance)
        }
        raycaster.set(backLeftTop, topDirection)
        intersects = raycaster.intersectObject(instanceMesh)
        if (intersects.length > 0) {
          topDistance = Math.min(topDistance, intersects[0].distance)
        }
        raycaster.set(backRightTop, topDirection)
        intersects = raycaster.intersectObject(instanceMesh)
        if (intersects.length > 0) {
          topDistance = Math.min(topDistance, intersects[0].distance)
        }
        // bottom 
        raycaster.set(frontLeftBottom, bottomDirection)
        intersects = raycaster.intersectObject(instanceMesh)
        if (intersects.length > 0) {
          bottomDistance = Math.min(bottomDistance, intersects[0].distance)
          bottomFrontLeftDistance = intersects[0].distance
        }
        raycaster.set(frontRightBottom, bottomDirection)
        intersects = raycaster.intersectObject(instanceMesh)
        if (intersects.length > 0) {
          bottomDistance = Math.min(bottomDistance, intersects[0].distance)
          bottomFrontRightDistance = intersects[0].distance
        }
        raycaster.set(backLeftBottom, bottomDirection)
        intersects = raycaster.intersectObject(instanceMesh)
        if (intersects.length > 0) {
          bottomDistance = Math.min(bottomDistance, intersects[0].distance)
          bottomBackLeftDistance = intersects[0].distance
        }
        raycaster.set(backRightBottom, bottomDirection)
        intersects = raycaster.intersectObject(instanceMesh)
        if (intersects.length > 0) {
          bottomDistance = Math.min(bottomDistance, intersects[0].distance)
          bottomBackRightDistance = intersects[0].distance
        }
        if (sneaking) {
          frontLeftBottom.y -= 0.05
          frontRightBottom.y -= 0.05
          backLeftBottom.y -= 0.05
          backRightBottom.y -= 0.05
          // front
          if (bottomFrontLeftDistance > 0.1 && bottomFrontRightDistance > 0.1) {
            raycaster.set(frontLeftBottom, backDirection)
            intersects = raycaster.intersectObject(instanceMesh)
            let tolerance = size.x
            if (intersects.length > 0) {
              tolerance = Math.min(tolerance, intersects[0].distance)
            }
            raycaster.set(frontRightBottom, backDirection)
            intersects = raycaster.intersectObject(instanceMesh)
            if (intersects.length > 0) {
              tolerance = Math.min(tolerance, intersects[0].distance)
            }
            frontDistance = Math.min(frontDistance, size.x - tolerance)
          }
          // back
          if (bottomBackLeftDistance > 0.1 && bottomBackRightDistance > 0.1) {
            raycaster.set(backLeftBottom, frontDirection)
            intersects = raycaster.intersectObject(instanceMesh)
            let tolerance = size.x
            if (intersects.length > 0) {
              tolerance = Math.min(tolerance, intersects[0].distance)
            }
            raycaster.set(backRightBottom, frontDirection)
            intersects = raycaster.intersectObject(instanceMesh)
            if (intersects.length > 0) {
              tolerance = Math.min(tolerance, intersects[0].distance)
            }
            backDistance = Math.min(backDistance, size.x - tolerance)
          }
          // left
          if (bottomFrontLeftDistance > 0.1 && bottomBackLeftDistance > 0.1) {
            raycaster.set(frontLeftBottom, rightDirection)
            intersects = raycaster.intersectObject(instanceMesh)
            let tolerance = size.z
            if (intersects.length > 0) {
              tolerance = Math.min(tolerance, intersects[0].distance)
            }
            raycaster.set(backLeftBottom, rightDirection)
            intersects = raycaster.intersectObject(instanceMesh)
            if (intersects.length > 0) {
              tolerance = Math.min(tolerance, intersects[0].distance)
            }
            leftDistance = Math.min(leftDistance, size.z - tolerance)
          }
          // right
          if (bottomFrontRightDistance > 0.1 && bottomBackRightDistance > 0.1) {
            raycaster.set(frontRightBottom, leftDirection)
            intersects = raycaster.intersectObject(instanceMesh)
            let tolerance = size.z
            if (intersects.length > 0) {
              tolerance = Math.min(tolerance, intersects[0].distance)
            }
            raycaster.set(backRightBottom, leftDirection)
            intersects = raycaster.intersectObject(instanceMesh)
            if (intersects.length > 0) {
              tolerance = Math.min(tolerance, intersects[0].distance)
            }
            rightDistance = Math.min(rightDistance, size.z - tolerance)
          }
        }
        return {
          front: frontDistance,
          back: backDistance,
          left: leftDistance,
          right: rightDistance,
          top: topDistance,
          bottom: bottomDistance
        }
    }

    // update the terrain
    update = () => {
        this.chunk.set(
            Math.floor(this.camera.position.x / this.chunkSize),
            Math.floor(this.camera.position.z / this.chunkSize)
        )

        //generate terrain when getting into new chunk
        if (
            this.chunk.x !== this.previousChunk.x ||
            this.chunk.y !== this.previousChunk.y
        ) {
            this.generate()
        }

        this.previousChunk.copy(this.chunk)

        this.highlight.update()

        this.materials.update()

        this.water_.material.uniforms['time'].value += 1.0 / 240.0

        Promise.all([this.waterSimulation.loaded]).then(() => {
            for (let i = 0; i < 1; i++) {
                this.waterSimulation.addDrop(
                    (Math.random() - 0.5) * 1.5 ,
                    (Math.random() - 0.5) * 1.5 ,
                    0.01,
                    i % 2 === 0 ? 2.0 : -2.0
                );
            }

            this.raycaster.setFromCamera({ x: 0, y: 0 }, this.camera)
            const intersects = this.raycaster.intersectObject(this.water)
            for (const intersect of intersects) {
                this.waterSimulation.addDrop((intersect.point.x / 100) * 2 - 1, (intersect.point.z / 100) * 2 - 1, 0.01, 1.0)
            }
            this.waterSimulation.update()
        })

    }
}
