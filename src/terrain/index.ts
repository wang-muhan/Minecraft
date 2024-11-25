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

        this.outerShape = new THREE.Shape();
        this.outerShape.moveTo(-500, -500);  // 左下角
        this.outerShape.lineTo(-500, 500);   // 左上角
        this.outerShape.lineTo(500, 500);    // 右上角
        this.outerShape.lineTo(500, -500);   // 右下角
        this.outerShape.lineTo(-500, -500);  // 闭合路径

        // 创建要移除的区域（孔洞）
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
            waterColor: 0x0000ff,
            // distortionScale: 3.7,
            fog: false,
            side: THREE.DoubleSide,
            alpha: 0.7
        })

        this.water_.rotation.x = -Math.PI / 2
        this.water_.material.transparent = true
        this.water_.position.set(0, 30, 100)
        this.overworld.add(this.water_)

        this.water.position.setX(50)
        this.water.position.setZ(50)
        this.overworld.add(this.water)

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
                this.current_blocks = this.overworld_blocks
                this.current_blocksCount = this.overworld_blocksCount
                this.current_blocksFactor = this.overworld_blocksFactor
                this.current_world = this.overworld
            }

            if (this.worldtype === WorldType.nether) {
                this.current_blocks = this.nether_blocks
                this.current_blocksCount = this.nether_blocksCount
                this.current_blocksFactor = this.nether_blocksFactor
                this.current_world = this.nether
            }

            this.scene.add(this.current_world)
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
    current_blocks: THREE.InstancedMesh[] = []
    current_blocksCount: number[] = []
    current_blocksFactor: number[]


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

    waterGeometry = new THREE.PlaneGeometry(100, 100);
    // waterGeometry_ = new THREE.PlaneGeometry(1000, 1000);

    // 创建外部形状（整个平面区域）
    outerShape: THREE.Shape
    // 创建几何体
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
    current_world: THREE.Group
    worldtype = WorldType.nether

    yOffsetstd = 1
    cloudCount = 0
    cloudGap = 5

    getCount = (type: BlockType) => {
        return this.current_blocksCount[type]
    }

    setCount = (type: BlockType) => {
        this.current_blocksCount[type] = this.current_blocksCount[type] + 1
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
        console.log('this.worldtype', this.worldtype)
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

        this.current_blocks[type].instanceMatrix.needsUpdate = true
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
