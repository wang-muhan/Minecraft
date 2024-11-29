import * as THREE from 'three'
import Materials, { MaterialType } from './mesh/materials'
import Block from './mesh/block'
import Highlight from './highlight'
import Noise from './noise'

import Generate from './worker/generate?worker'

export enum BlockType {
  grass = 0,
  sand = 1,
  tree = 2,
  leaf = 3,
  dirt = 4,
  stone = 5,
  coal = 6,
  wood = 7,
  diamond = 8,
  quartz = 9,
  glass = 10,
  bedrock = 11
}
export default class Terrain {
  constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
    this.scene = scene
    this.camera = camera
    this.maxCount =
      (this.distance * this.chunkSize * 2 + this.chunkSize) ** 2 + 500
    this.highlight = new Highlight(scene, camera, this)
    this.scene.add(this.cloud)

    // generate worker callback handler
    this.generateWorker.onmessage = (
      msg: MessageEvent<{
        idMap: Map<string, number>
        arrays: ArrayLike<number>[]
        blocksCount: number[]
      }>
    ) => {
      this.resetBlocks()
      this.idMap = msg.data.idMap
      this.blocksCount = msg.data.blocksCount

      for (let i = 0; i < msg.data.arrays.length; i++) {
        this.blocks[i].instanceMatrix = new THREE.InstancedBufferAttribute(
          (this.blocks[i].instanceMatrix.array = msg.data.arrays[i]),
          16
        )
      }

      for (const block of this.blocks) {
        block.instanceMatrix.needsUpdate = true
      }
    }
  }
  // core properties
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  distance = 3
  chunkSize = 24

  // terrain properties
  maxCount: number
  chunk = new THREE.Vector2(0, 0)
  previousChunk = new THREE.Vector2(0, 0)
  noise = new Noise()

  // materials
  materials = new Materials()
  materialType = [
    MaterialType.grass,
    MaterialType.sand,
    MaterialType.tree,
    MaterialType.leaf,
    MaterialType.dirt,
    MaterialType.stone,
    MaterialType.coal,
    MaterialType.wood,
    MaterialType.diamond,
    MaterialType.quartz,
    MaterialType.glass,
    MaterialType.bedrock
  ]

  // other properties
  blocks: THREE.InstancedMesh[] = []
  blocksCount: number[] = []
  blocksFactor = [1, 0.2, 0.1, 0.7, 0.1, 0.2, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]

  customBlocks: Block[] = []
  highlight: Highlight

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
  cloudCount = 0
  cloudGap = 5

  getCount = (type: BlockType) => {
    return this.blocksCount[type]
  }

  setCount = (type: BlockType) => {
    this.blocksCount[type] = this.blocksCount[type] + 1
  }

  initBlocks = () => {
    // reset
    for (const block of this.blocks) {
      this.scene.remove(block)
    }
    this.blocks = []

    // create instance meshes
    const geometry = new THREE.BoxGeometry()

    for (let i = 0; i < this.materialType.length; i++) {
      let block = new THREE.InstancedMesh(
        geometry,
        this.materials.get(this.materialType[i]),
        this.maxCount * this.blocksFactor[i]
      )
      block.name = BlockType[i]
      this.blocks.push(block)
      this.scene.add(block)
    }

    this.blocksCount = new Array(this.materialType.length).fill(0)
  }

  resetBlocks = () => {
    // reest count and instance matrix
    for (let i = 0; i < this.blocks.length; i++) {
      this.blocks[i].instanceMatrix = new THREE.InstancedBufferAttribute(
        new Float32Array(this.maxCount * this.blocksFactor[i] * 16),
        16
      )
    }
  }

  generate = () => {
    this.blocksCount = new Array(this.blocks.length).fill(0)
    // post work to generate worker
    this.generateWorker.postMessage({
      distance: this.distance,
      chunk: this.chunk,
      noiseSeed: this.noise.seed,
      treeSeed: this.noise.treeSeed,
      stoneSeed: this.noise.stoneSeed,
      coalSeed: this.noise.coalSeed,
      idMap: new Map<string, number>(),
      blocksFactor: this.blocksFactor,
      blocksCount: this.blocksCount,
      customBlocks: this.customBlocks,
      chunkSize: this.chunkSize
    })

    // cloud

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

  // generate adjacent blocks after removing a block (vertical infinity world)
  generateAdjacentBlocks = (position: THREE.Vector3) => {
    const { x, y, z } = position
    const noise = this.noise
    const yOffset = Math.floor(
      noise.get(x / noise.gap, z / noise.gap, noise.seed) * noise.amp
    )

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

    this.blocks[type].instanceMatrix.needsUpdate = true
  }

  buildBlock = (position: THREE.Vector3, type: BlockType) => {
    const noise = this.noise
    // check if it's natural terrain
    const yOffset = Math.floor(
      noise.get(position.x / noise.gap, position.z / noise.gap, noise.seed) *
        noise.amp
    )
    if (position.y >= 30 + yOffset || position.y < 0) {
      return
    }

    position.y === 0 && (type = BlockType.bedrock)

    // check custom blocks
    for (const block of this.customBlocks) {
      if (
        block.x === position.x &&
        block.y === position.y &&
        block.z === position.z
      ) {
        return
      }
    }

    // build block
    this.customBlocks.push(
      new Block(position.x, position.y, position.z, type, true)
    )

    const matrix = new THREE.Matrix4()
    matrix.setPosition(position)
    this.blocks[type].setMatrixAt(this.getCount(type), matrix)
    this.blocks[type].instanceMatrix.needsUpdate = true
    this.setCount(type)
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
          // for (let i = -3; i < 3; i++) {
          //   for (let j = -3; j < 3; j++) {
          //     for (let k = -3; k < 3; k++) {
          //       if (i === 0 && k === 0) {
          //         continue
          //       }
          //     let leafOffset =
          //       noise.get(
          //         (x + i + j) / noise.leafGap,
          //         (z + k) / noise.leafGap,
          //         noise.leafSeed
          //       ) * noise.leafAmp

          //       if (leafOffset > noise.leafThreshold) {
          //         idMap.set(
          //           `${x + i}_${y + noise.treeHeight + j}_${z + k}`,
          //           this.index
          //         )
          //         matrix.setPosition(x + i, y + noise.treeHeight + j, z + k)
          //         this.instanceMesh.setMatrixAt(this.index++, matrix)
          //       }
          //     }
          //   }
          // }
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
            new THREE.Matrix4().set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
          )
        }
      }
    }
    return instanceMesh
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
  }
}
