import * as THREE from 'three'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
import Player, { Mode } from '../player'
import Terrain, { BlockType, WorldType } from '../terrain'

import Block from '../terrain/mesh/block'
// import Noise from '../terrain/noise'
import Audio from '../audio'
import Entity from '../entity'
import { isMobile } from '../utils'
import { lerp } from 'three/src/math/MathUtils'

export default class Control {
  constructor(
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    player: Player,
    terrain: Terrain,
    audio: Audio,
    entity: Entity
  ) {
    this.scene = scene
    this.original_camera = camera
    this.camera = new THREE.PerspectiveCamera(
        camera.fov,
        camera.aspect,
        camera.near,
        camera.far
        )
    this.player = player
    this.terrain = terrain
    this.entity = entity
    this.control = new PointerLockControls(this.camera, document.body)
    this.audio = audio

    this.raycaster = new THREE.Raycaster()
    this.raycaster.far = 8
    this.far = this.player.body.height

    this.initEventListeners()
  }

  // core properties
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  original_camera: THREE.PerspectiveCamera
  player: Player
  terrain: Terrain
  entity: Entity
  control: PointerLockControls
  audio: Audio
  velocity = new THREE.Vector3(0, 0, 0)

  shake = true
  shakeStatus = 0
  shakeIntensity = 0.01
  shakeSpeed = 10
  walkStartTime = 0
  isWalking = false

  // collide and jump properties
  isJumping = false

 
  // other properties
  p1 = performance.now()
  p2 = performance.now()
  raycaster: THREE.Raycaster
  far: number

  holdingBlock = BlockType.tnt
  holdingBlocks = [
    BlockType.grass,
    BlockType.stone,
    BlockType.tree,
    BlockType.wood,
    BlockType.diamond,
    BlockType.quartz,
    BlockType.glass,
    BlockType.grass,
    BlockType.grass,
    BlockType.grass
  ]
  holdingIndex = 0
  wheelGap = false
  clickInterval?: ReturnType<typeof setInterval>
  jumpInterval?: ReturnType<typeof setInterval>
  mouseHolding = false
  spaceHolding = false

  downKeys = {
    a: false,
    d: false,
    w: false,
    s: false
  }
  setMovementHandler = (e: KeyboardEvent) => {
    if (e.repeat) {
      return
    }

    switch (e.key) {
      case 'q':
      case 'Q':
        if (this.player.mode === Mode.walking) {
          this.player.setMode(Mode.flying)
          this.entity.setPlayerMode(Mode.flying)
        } else {
          this.player.setMode(Mode.walking)
          this.entity.setPlayerMode(Mode.walking)
        }
        this.velocity.y = 0
        this.velocity.x = 0
        this.velocity.z = 0
        break
      case 'w':
      case 'W':
        this.downKeys.w = true
        this.velocity.x = this.player.speed
        break
      case 's':
      case 'S':
        this.downKeys.s = true
        this.velocity.x = -this.player.speed
        break
      case 'a':
      case 'A':
        this.downKeys.a = true
        this.velocity.z = -this.player.speed
        break
      case 'd':
      case 'D':
        this.downKeys.d = true
        this.velocity.z = this.player.speed
        break
      case ' ':
        if (this.player.mode === Mode.sneaking && !this.isJumping) {
          return
        }
        if (this.player.mode === Mode.walking) {
          // jump
          if (!this.isJumping) {
            this.velocity.y = 8
            this.isJumping = true
            this.far = 0
            setTimeout(() => {
              this.far = this.player.body.height
            }, 300)
          }
        } else {
          this.velocity.y += this.player.speed
        }
        if (this.player.mode === Mode.walking && !this.spaceHolding) {
          this.spaceHolding = true
          this.jumpInterval = setInterval(() => {
            this.setMovementHandler(e)
          }, 10)
        }
        break
      case 'Shift':
        if (this.player.mode === Mode.walking) {
          if (!this.isJumping) {
            this.player.setMode(Mode.sneaking)
            this.entity.setPlayerMode(Mode.sneaking)
            if (this.downKeys.w) {
              this.velocity.x = this.player.speed
            }
            if (this.downKeys.s) {
              this.velocity.x = -this.player.speed
            }
            if (this.downKeys.a) {
              this.velocity.z = -this.player.speed
            }
            if (this.downKeys.d) {
              this.velocity.z = this.player.speed
            }
            this.camera.position.setY(this.camera.position.y - 0.35 + 1e-3)
          }
        } else {
          this.velocity.y -= this.player.speed
        }
        break
      default:
        break
    }
  }

  resetMovementHandler = (e: KeyboardEvent) => {
    if (e.repeat) {
      return
    }

    switch (e.key) {
      case 'w':
      case 'W':
        this.downKeys.w = false
        this.velocity.x = 0
        break
      case 's':
      case 'S':
        this.downKeys.s = false
        this.velocity.x = 0
        break
      case 'a':
      case 'A':
        this.downKeys.a = false
        this.velocity.z = 0
        break
      case 'd':
      case 'D':
        this.downKeys.d = false
        this.velocity.z = 0
        break
      case ' ':
        if (this.player.mode === Mode.sneaking && !this.isJumping) {
          return
        }
        this.jumpInterval && clearInterval(this.jumpInterval)
        this.spaceHolding = false
        if (this.player.mode === Mode.walking) {
          return
        }
        this.velocity.y = 0
        break
      case 'Shift':
        if (this.player.mode === Mode.sneaking) {
          if (!this.isJumping) {
            this.player.setMode(Mode.walking)
            this.entity.setPlayerMode(Mode.walking)
            if (this.downKeys.w) {
              this.velocity.x = this.player.speed
            }
            if (this.downKeys.s) {
              this.velocity.x = -this.player.speed
            }
            if (this.downKeys.a) {
              this.velocity.z = -this.player.speed
            }
            if (this.downKeys.d) {
              this.velocity.z = this.player.speed
            }
            this.camera.position.setY(this.camera.position.y + 0.35 + 1e-3)
          }
        }
        if (this.player.mode === Mode.walking) {
          return
        }
        this.velocity.y = 0
        break
      default:
        break
    }
  }

  mousedownHandler = (e: MouseEvent) => {
    e.preventDefault()
    // let p1 = performance.now()
    this.raycaster.setFromCamera({ x: 0, y: 0 }, this.original_camera)
      
    // const block = this.raycaster.intersectObjects(this.terrain.current_blocks)[0]
    const block = this.raycaster.intersectObjects(this.terrain.worldtype === WorldType.overworld ? this.terrain.overworld_blocks : this.terrain.nether_blocks)[0]
    const matrix = new THREE.Matrix4()

    switch (e.button) {
      // left click to remove block
      case 0:
        {
          if (block && block.object instanceof THREE.InstancedMesh) {
            // calculate position
            block.object.getMatrixAt(block.instanceId!, matrix)
            const position = new THREE.Vector3().setFromMatrixPosition(matrix)

            // don't remove bedrock and magma
            if (
              (BlockType[block.object.name as any] as unknown as BlockType) ===
              BlockType.bedrock || (BlockType[block.object.name as any] as unknown as BlockType) === BlockType.magma
            ) {
              this.terrain.generateAdjacentBlocks(position)
              return
            }

            // remove the block
            block.object.setMatrixAt(
              block.instanceId!,
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
            block.object.instanceMatrix.needsUpdate = true
            // block and sound effect
            this.audio.playSound(
              BlockType[block.object.name as any] as unknown as BlockType
            )

            const mesh = new THREE.Mesh(
              new THREE.BoxGeometry(1, 1, 1),
              this.terrain.materials.get(
                this.terrain.materialType[
                  parseInt(BlockType[block.object.name as any])
                ]
              )
            )
            mesh.position.set(position.x, position.y, position.z)
            this.scene.add(mesh)
            const time = performance.now()
            let raf = 0
            const animate = () => {
              if (performance.now() - time > 250) {
                this.scene.remove(mesh)
                cancelAnimationFrame(raf)
                return
              }
              raf = requestAnimationFrame(animate)
              mesh.geometry.scale(0.85, 0.85, 0.85)
            }
            this.terrain.generateAdjacentBlocks(position)
            animate()

            // update
            block.object.instanceMatrix.needsUpdate = true

            // check existence
            let existed = false
            for (const customBlock of this.terrain.customBlocks) {
              if (
                customBlock.x === position.x &&
                customBlock.y === position.y &&
                customBlock.z === position.z
              ) {
                existed = true
                customBlock.placed = false
              }
            }

            // add to custom blocks when it's not existed
            if (!existed) {
              this.terrain.customBlocks.push(
                new Block(
                  position.x,
                  position.y,
                  position.z,
                  BlockType[block.object.name as any] as unknown as BlockType,
                  false
                )
              )
            }

            // generate adjacent blocks
            // this.terrain.generateAdjacentBlocks(position)
          }
        }
        break

      // right click to put block
      case 2:
        {
          if (block && block.object instanceof THREE.InstancedMesh) {
            // calculate normal and position
            const normal = block.face!.normal
            block.object.getMatrixAt(block.instanceId!, matrix)
            const position = new THREE.Vector3().setFromMatrixPosition(matrix)

            // return when block overlaps with player
            if (
              position.x + normal.x === Math.round(this.camera.position.x) &&
              position.z + normal.z === Math.round(this.camera.position.z) &&
              (position.y + normal.y === Math.round(this.camera.position.y) ||
                position.y + normal.y ===
                  Math.round(this.camera.position.y - 1))
            ) {
              return
            }

            // put the block
            matrix.setPosition(
              normal.x + position.x,
              normal.y + position.y,
              normal.z + position.z
            )
            if (this.terrain.worldtype === WorldType.overworld) {
              this.terrain.overworld_blocks[this.holdingBlock].setMatrixAt(
                this.terrain.getCount(this.holdingBlock),
                matrix
              )
            } else {
              this.terrain.nether_blocks[this.holdingBlock].setMatrixAt(
                this.terrain.getCount(this.holdingBlock),
                matrix
              )
            }
           
            this.terrain.setCount(this.holdingBlock)

            //sound effect
            this.audio.playSound(this.holdingBlock)

            // update
            if (this.terrain.worldtype === WorldType.overworld) {
              this.terrain.overworld_blocks[this.holdingBlock].instanceMatrix.needsUpdate =
                true
            } else {
              this.terrain.nether_blocks[this.holdingBlock].instanceMatrix.needsUpdate =
                true
            }
            // this.terrain.current_blocks[this.holdingBlock].instanceMatrix.needsUpdate =
            //   true

            // add to custom blocks
            this.terrain.customBlocks.push(
              new Block(
                normal.x + position.x,
                normal.y + position.y,
                normal.z + position.z,
                this.holdingBlock,
                true
              )
            )
          }
        }
        break
      default:
        break
    }

    if (!isMobile && !this.mouseHolding) {
      this.mouseHolding = true
      this.clickInterval = setInterval(() => {
        this.mousedownHandler(e)
      }, 333)
    }

    // console.log(performance.now() - p1)
  }
  mouseupHandler = () => {
    this.clickInterval && clearInterval(this.clickInterval)
    this.mouseHolding = false
  }

  changeHoldingBlockHandler = (e: KeyboardEvent) => {
    if (isNaN(parseInt(e.key)) || e.key === '0') {
      return
    }
    this.holdingIndex = parseInt(e.key) - 1

    this.holdingBlock = this.holdingBlocks[this.holdingIndex] ?? BlockType.grass
  }

  wheelHandler = (e: WheelEvent) => {
    if (!this.wheelGap) {
      this.wheelGap = true
      setTimeout(() => {
        this.wheelGap = false
      }, 100)
      if (e.deltaY > 0) {
        this.holdingIndex++
        this.holdingIndex > 9 && (this.holdingIndex = 0)
      } else if (e.deltaY < 0) {
        this.holdingIndex--
        this.holdingIndex < 0 && (this.holdingIndex = 9)
      }
      this.holdingBlock =
        this.holdingBlocks[this.holdingIndex] ?? BlockType.grass
    }
  }

  initEventListeners = () => {
    // add / remove handler when pointer lock / unlock
    document.addEventListener('pointerlockchange', () => {
      if (document.pointerLockElement) {
        document.body.addEventListener(
          'keydown',
          this.changeHoldingBlockHandler
        )
        document.body.addEventListener('wheel', this.wheelHandler)
        document.body.addEventListener('keydown', this.setMovementHandler)
        document.body.addEventListener('keyup', this.resetMovementHandler)
        document.body.addEventListener('mousedown', this.mousedownHandler)
        document.body.addEventListener('mouseup', this.mouseupHandler)
      } else {
        document.body.removeEventListener(
          'keydown',
          this.changeHoldingBlockHandler
        )
        document.body.removeEventListener('wheel', this.wheelHandler)
        document.body.removeEventListener('keydown', this.setMovementHandler)
        document.body.removeEventListener('keyup', this.resetMovementHandler)
        document.body.removeEventListener('mousedown', this.mousedownHandler)
        document.body.removeEventListener('mouseup', this.mouseupHandler)
        this.velocity = new THREE.Vector3(0, 0, 0)
      }
    })
  }

  // move along X with direction factor
  moveX(distance: number, delta: number) {
    this.camera.position.x +=
      distance * (this.player.speed / Math.PI) * 2 * delta
  }

  // move along Z with direction factor
  moveZ = (distance: number, delta: number) => {
    this.camera.position.z +=
      distance * (this.player.speed / Math.PI) * 2 * delta
  }


  update = () => {
    this.p1 = performance.now()
    const delta = (this.p1 - this.p2) / 1000
    if (
      // dev mode
      this.player.mode === Mode.flying
    ) {
      this.original_camera.position.copy(this.camera.position)
      this.original_camera.quaternion.copy(this.camera.quaternion)
      const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion)
      forward.y = 0
      forward.normalize()
      const right = new THREE.Vector3(1, 0, 0).applyQuaternion(this.camera.quaternion)
      right.y = 0
      right.normalize()
      const worldVelocity = new THREE.Vector3()
      worldVelocity.addScaledVector(forward, this.velocity.x)
      worldVelocity.addScaledVector(right, this.velocity.z)
      worldVelocity.y = this.velocity.y
      const displacement = worldVelocity.clone().multiplyScalar(delta)
      this.camera.position.add(displacement)
    } else {
      if (Math.abs(this.velocity.y) < this.player.falling) {
        this.velocity.y -= 25 * delta
      }
      const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion)
      forward.y = 0
      forward.normalize()
      const right = new THREE.Vector3(1, 0, 0).applyQuaternion(this.camera.quaternion)
      right.y = 0
      right.normalize()
      const worldVelocity = new THREE.Vector3()
      worldVelocity.addScaledVector(forward, this.velocity.x)
      worldVelocity.addScaledVector(right, this.velocity.z)
      worldVelocity.y = this.velocity.y
      const boxCenter = this.camera.position.clone()
      const boxSize = new THREE.Vector3(0.6, 0.0, 0.6)
      if (this.player.mode === Mode.sneaking) {
        boxCenter.y -= 0.445
        boxSize.y = 1.65
      }
      if (this.player.mode === Mode.walking) {
        boxCenter.y -= 0.72
        boxSize.y = 1.8
      }
      if (this.velocity.x !== 0 || this.velocity.z !== 0) {
        if (!this.isWalking) {
          this.walkStartTime = performance.now()
          this.isWalking = true
        }
        this.shakeStatus = Math.sin((performance.now() - this.walkStartTime) * this.shakeSpeed / 1000) * this.shakeIntensity
      } else {
        this.isWalking = false
        this.shakeStatus = lerp(this.shakeStatus, 0, 0.1)
      }
      this.original_camera.position.copy(this.camera.position)
      const deltaQuaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, this.shakeStatus))
      this.original_camera.setRotationFromQuaternion(this.camera.quaternion.clone().multiply(deltaQuaternion))
      const collisionBox = new THREE.Box3().setFromCenterAndSize(boxCenter, boxSize)
      const addtionalVelocity = this.entity.collisionHandler(collisionBox)
      worldVelocity.add(addtionalVelocity)
      const displacement = worldVelocity.clone().multiplyScalar(delta)
      
      const distance = this.terrain.computeDistance(collisionBox, this.player.mode === Mode.sneaking)
      if (displacement.x > 0) {
        displacement.x = Math.min(displacement.x, distance.front - 1e-3)
      } else {
        displacement.x = Math.max(displacement.x, -distance.back + 1e-3)
      }
      if (displacement.z > 0) {
        displacement.z = Math.min(displacement.z, distance.right - 1e-3)
      } else {
        displacement.z = Math.max(displacement.z, -distance.left + 1e-3)
      }
      if (displacement.y > 0) {
        displacement.y = Math.min(displacement.y, distance.top - 1e-3)
      } else {
        displacement.y = Math.max(displacement.y, -distance.bottom + 1e-3)
      }
      if (distance.top < 2e-3) {
        this.velocity.y = -225 * delta
      }
      if (distance.bottom < 2e-3) {
        if (this.isJumping) {
          this.isJumping = false
        } else {
          this.velocity.y = 0
        }
      }
      this.camera.position.add(displacement)
      // catching net
      if (this.camera.position.y < 0) {
        this.camera.position.y = 50
      }
    }
    this.p2 = this.p1
  }
}