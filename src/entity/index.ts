import * as THREE from 'three'
import { createCreeper, creeperOffset, creeperSize} from './creeper/model'
import { createCreeperAnimation } from './creeper/animation'
import { createZombie, zombieOffset, zombieSize} from './zombie/model'
import { createZombieAnimation } from './zombie/animation'
import { createSkeleton, skeletonOffset, skeletonSize } from './skeleton/model'
import { createSkeletonAnimation } from './skeleton/animation'
import { createSpider, spiderOffset, spiderSize } from './spider/model'
import { createSpiderAnimation } from './spider/animation'
import { createCow, cowOffset, cowSize } from './cow/model'
import { createCowAnimation } from './cow/animation'
import { createPig, pigOffset, pigSize } from './pig/model'
import { createPigAnimation } from './pig/animation'
import { createSheep, sheepOffset, sheepSize } from './sheep/model'
import { createSheepAnimation } from './sheep/animation'
import { createChicken, chickenOffset, chickenSize } from './chicken/model'
import { createChickenAnimation } from './chicken/animation'
import Terrain from '../terrain'
import { Mode } from '../player'
enum EntityType {
    Creeper,
    Skeleton,
    Zombie,
    Spider,
    Pig,
    Cow,
    Sheep,
    Chicken
}

function createEntity(type: EntityType): THREE.Group {
    switch (type) {
        case EntityType.Creeper:
            return createCreeper()
        case EntityType.Skeleton:
            return createSkeleton()
        case EntityType.Zombie:
            return createZombie()
        case EntityType.Spider:
            return createSpider()
        case EntityType.Pig:
            return createPig()
        case EntityType.Cow:
            return createCow()
        case EntityType.Sheep:
            return createSheep()
        case EntityType.Chicken:
            return createChicken()
    }
}

function entityOffset(type: EntityType): THREE.Vector3 {
    switch (type) {
        case EntityType.Creeper:
            return creeperOffset
        case EntityType.Skeleton:
            return skeletonOffset
        case EntityType.Zombie:
            return zombieOffset
        case EntityType.Spider:
            return spiderOffset
        case EntityType.Pig:
            return pigOffset
        case EntityType.Cow:
            return cowOffset
        case EntityType.Sheep:
            return sheepOffset
        case EntityType.Chicken:
            return chickenOffset
    }
}

function entitySize(type: EntityType): THREE.Vector3 {
    switch (type) {
        case EntityType.Creeper:
            return creeperSize
        case EntityType.Skeleton:
            return skeletonSize
        case EntityType.Zombie:
            return zombieSize
        case EntityType.Spider:
            return spiderSize
        case EntityType.Pig:
            return pigSize
        case EntityType.Cow:
            return cowSize
        case EntityType.Sheep:
            return sheepSize
        case EntityType.Chicken:
            return chickenSize
    }
}

function createEntityAnimation(type: EntityType, entity: THREE.Group, camera: THREE.PerspectiveCamera): (stop: boolean) => boolean {
    switch (type) {
        case EntityType.Creeper:
            return createCreeperAnimation(entity, camera)
        case EntityType.Skeleton:
            return createSkeletonAnimation(entity, camera)
        case EntityType.Zombie:
            return createZombieAnimation(entity, camera)
        case EntityType.Spider:
            return createSpiderAnimation(entity, camera)
        case EntityType.Pig:
            return createPigAnimation(entity, camera)
        case EntityType.Cow:
            return createCowAnimation(entity, camera)
        case EntityType.Sheep:
            return createSheepAnimation(entity, camera)
        case EntityType.Chicken:
            return createChickenAnimation(entity, camera)
    }
}




class singleEntity {
    constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera, terrain: Terrain, parent: Entity, type: EntityType, position: THREE.Vector3, speed: number) {
        this.scene = scene
        this.camera = camera
        this.terrain = terrain
        this.parent = parent
        this.entity = createEntity(type)
        this.offset = entityOffset(type)
        this.size = entitySize(type)
        this.walkingAnimation = createEntityAnimation(type, this.entity, camera)
        this.entity.position.copy(position)
        this.entity.rotation.y = Math.random() * 2 * Math.PI;
        this.scene.add(this.entity)
        this.speed = speed
    }
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    terrain: Terrain
    entity: THREE.Group
    offset: THREE.Vector3
    size: THREE.Vector3
    walkingAnimation: (stop:boolean) => boolean
    speed: number = 0.0
    falling: number = 38.4
    lastTime: number = performance.now()
    isWalking: boolean = false
    isJumping: boolean = false
    stop: boolean = false
    velocity: THREE.Vector3 = new THREE.Vector3(0, 0, 0)
    collisionFactor: number = 10
    parent: Entity

    collisionHandler(collisionBox: THREE.Box3): THREE.Vector3 {
        const boxCenter = collisionBox.getCenter(new THREE.Vector3())
        const selfBoxCenter = this.entity.position.clone().add(this.offset)
        const distance = boxCenter.distanceTo(selfBoxCenter)
        if (distance > 8.0 || distance < 1e-3) {
            return new THREE.Vector3(0, 0, 0)
        }
        const selfCollisionBox = new THREE.Box3().setFromCenterAndSize(selfBoxCenter, this.size)
        const intersection = selfCollisionBox.intersect(collisionBox)
        let volume = 0.0
        if(!intersection.isEmpty()){
            const size = intersection.getSize(new THREE.Vector3())
            volume = size.x * size.y * size.z
        }
        const size = collisionBox.getSize(new THREE.Vector3())
        const normalizedVolume = volume / (size.x * size.y * size.z)
        const direction = collisionBox.getCenter(new THREE.Vector3()).sub(selfBoxCenter)
        direction.y = 0
        direction.normalize()
        const addtionalVelocity = direction.multiplyScalar(normalizedVolume * this.collisionFactor)
        return addtionalVelocity
    }

    update() {
        const currentTime = performance.now()
        const delta = (currentTime - this.lastTime) / 1000
        this.lastTime = currentTime
        // change walking state
        this.isWalking = this.walkingAnimation(this.stop)
        // perform walking
        if (this.isWalking) {
            const direction = this.entity.rotation.y
            this.velocity.x = this.speed * Math.cos(direction)
            this.velocity.z = -this.speed * Math.sin(direction)
        } else {
            this.velocity.x = 0
            this.velocity.z = 0
        }
        // perform falling
        if (Math.abs(this.velocity.y) < this.falling) {
            this.velocity.y -= 25 * delta
        }
        // handle collision
        const boxCenter = this.entity.position.clone().add(this.offset)
        const collisionBox = new THREE.Box3().setFromCenterAndSize(boxCenter, this.size)
        const addtionalVelocity = this.parent.collisionHandler(collisionBox)
        const playerBoxCenter = this.camera.position.clone()
        const playerBoxSize = new THREE.Vector3(0.6, 0.0, 0.6)
        if (this.parent.playerMode === Mode.walking) {
            playerBoxCenter.y -= 0.445
            playerBoxSize.y = 1.65
        } else {
            playerBoxCenter.y -= 0.72
            playerBoxSize.y = 1.8
        }
        const playerCollisionBox = new THREE.Box3().setFromCenterAndSize(playerBoxCenter, playerBoxSize)
        const playerAddtionalVelocity = this.parent.collisionHandler(playerCollisionBox)
        const velocityFactor = -1.0 * (playerBoxSize.x * playerBoxSize.y * playerBoxSize.z) / (this.size.x * this.size.y * this.size.z)
        addtionalVelocity.add(playerAddtionalVelocity.multiplyScalar(velocityFactor))
        this.velocity.add(addtionalVelocity)
        // move entity
        const displacement = this.velocity.clone().multiplyScalar(delta)
        const distance = this.terrain.computeDistance(collisionBox, false)
        const upperboxCenter = boxCenter.add(new THREE.Vector3(0, 0.5, 0))
        const upperboxSize = this.size.clone().add(new THREE.Vector3(0, -1.0, 0))
        const upperCollisionBox = new THREE.Box3().setFromCenterAndSize(upperboxCenter, upperboxSize)
        const upperDistance = this.terrain.computeDistance(upperCollisionBox, false)
        if (this.isWalking){
            if (this.velocity.x > 0) {
                if (distance.front < 2e-3){
                    if (upperDistance.front < 2e-3){
                        this.stop = true
                    } else {
                        this.isJumping = true
                        this.velocity.y = 8
                        this.stop = false
                    }
                }
            }
            if (this.velocity.x < 0) {
                if (distance.back < 2e-3){
                    if (upperDistance.back < 2e-3){
                        this.stop = true
                    } else {
                        this.isJumping = true
                        this.velocity.y = 4
                        this.stop = false
                    }
                }
            }
            if (this.velocity.z > 0) {
                if (distance.right < 2e-3){
                    if (upperDistance.right < 2e-3){
                        this.stop = true
                    } else {
                        this.isJumping = true
                        this.velocity.y = 8
                        this.stop = false
                    }
                }
            }
            if (this.velocity.z < 0) {
                if (distance.left < 2e-3){
                    if (upperDistance.left < 2e-3){
                        this.stop = true
                    } else {
                        this.isJumping = true
                        this.velocity.y = 8
                        this.stop = false
                    }
                }
            }
        } else {
            this.stop = false
        }
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
          this.entity.position.add(displacement)
          if( this.entity.position.y < 0){
                this.entity.position.y = 50
            }
    }
    cleanup() {
        this.scene.remove(this.entity)
    }
}



export default class Entity {
    constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera, terrain: Terrain) {
        this.scene = scene
        this.camera = camera
        this.terrain = terrain
        this.entities.push(new singleEntity(scene, camera, terrain, this, EntityType.Creeper, new THREE.Vector3(0, 50, 0), 1))
    }
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    terrain: Terrain
    entities: singleEntity[] = []
    playerMode: Mode = Mode.walking

    collisionHandler(collisionBox: THREE.Box3): THREE.Vector3 {
        let addtionalVelocity = new THREE.Vector3(0, 0, 0)
        for (let entity of this.entities) {
            addtionalVelocity.add(entity.collisionHandler(collisionBox))
        }
        return addtionalVelocity
    }

    setPlayerMode(mode: Mode) {
        this.playerMode = mode
    }

    update() {
        // this.creeper.update()
        for (let entity of this.entities) {
            entity.update()
        }
    }
    cleanup() {
        // clearInterval(this.toggleWalkInterval); // 清理定时器
    }
}