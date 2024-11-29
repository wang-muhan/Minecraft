import * as THREE from 'three'

let loader = new THREE.TextureLoader()
import zombie_head_front from '../../static/textures/entity/zombie/zombie_head_front.png'
import zombie_head_back from '../../static/textures/entity/zombie/zombie_head_back.png'
import zombie_head_left from '../../static/textures/entity/zombie/zombie_head_left.png'
import zombie_head_right from '../../static/textures/entity/zombie/zombie_head_right.png'
import zombie_head_top from '../../static/textures/entity/zombie/zombie_head_top.png'
import zombie_head_bottom from '../../static/textures/entity/zombie/zombie_head_bottom.png'
import zombie_arm_front from '../../static/textures/entity/zombie/zombie_arm_front.png'
import zombie_arm_back from '../../static/textures/entity/zombie/zombie_arm_back.png'
import zombie_arm_left from '../../static/textures/entity/zombie/zombie_arm_left.png'
import zombie_arm_right from '../../static/textures/entity/zombie/zombie_arm_right.png'
import zombie_arm_top from '../../static/textures/entity/zombie/zombie_arm_top.png'
import zombie_arm_bottom from '../../static/textures/entity/zombie/zombie_arm_bottom.png'
import zombie_body_front from '../../static/textures/entity/zombie/zombie_body_front.png'
import zombie_body_back from '../../static/textures/entity/zombie/zombie_body_back.png'
import zombie_body_left from '../../static/textures/entity/zombie/zombie_body_left.png'
import zombie_body_right from '../../static/textures/entity/zombie/zombie_body_right.png'
import zombie_body_top from '../../static/textures/entity/zombie/zombie_body_top.png'
import zombie_body_bottom from '../../static/textures/entity/zombie/zombie_body_bottom.png'
import zombie_leg_front from '../../static/textures/entity/zombie/zombie_leg_front.png'
import zombie_leg_back from '../../static/textures/entity/zombie/zombie_leg_back.png'
import zombie_leg_left from '../../static/textures/entity/zombie/zombie_leg_left.png'
import zombie_leg_right from '../../static/textures/entity/zombie/zombie_leg_right.png'
import zombie_leg_top from '../../static/textures/entity/zombie/zombie_leg_top.png'
import zombie_leg_bottom from '../../static/textures/entity/zombie/zombie_leg_bottom.png'


const zombieHeadFrontMaterial = loader.load(zombie_head_front)
const zombieHeadBackMaterial = loader.load(zombie_head_back)
const zombieHeadLeftMaterial = loader.load(zombie_head_left)
const zombieHeadRightMaterial = loader.load(zombie_head_right)
const zombieHeadTopMaterial = loader.load(zombie_head_top)
const zombieHeadBottomMaterial = loader.load(zombie_head_bottom)
const zombieArmFrontMaterial = loader.load(zombie_arm_front)
const zombieArmBackMaterial = loader.load(zombie_arm_back)
const zombieArmLeftMaterial = loader.load(zombie_arm_left)
const zombieArmRightMaterial = loader.load(zombie_arm_right)
const zombieArmTopMaterial = loader.load(zombie_arm_top)
const zombieArmBottomMaterial = loader.load(zombie_arm_bottom)
const zombieBodyFrontMaterial = loader.load(zombie_body_front)
const zombieBodyBackMaterial = loader.load(zombie_body_back)
const zombieBodyLeftMaterial = loader.load(zombie_body_left)
const zombieBodyRightMaterial = loader.load(zombie_body_right)
const zombieBodyTopMaterial = loader.load(zombie_body_top)
const zombieBodyBottomMaterial = loader.load(zombie_body_bottom)
const zombieLegFrontMaterial = loader.load(zombie_leg_front)
const zombieLegBackMaterial = loader.load(zombie_leg_back)
const zombieLegLeftMaterial = loader.load(zombie_leg_left)
const zombieLegRightMaterial = loader.load(zombie_leg_right)
const zombieLegTopMaterial = loader.load(zombie_leg_top)
const zombieLegBottomMaterial = loader.load(zombie_leg_bottom)

zombieHeadFrontMaterial.magFilter = THREE.NearestFilter
zombieHeadBackMaterial.magFilter = THREE.NearestFilter
zombieHeadLeftMaterial.magFilter = THREE.NearestFilter
zombieHeadRightMaterial.magFilter = THREE.NearestFilter
zombieHeadTopMaterial.magFilter = THREE.NearestFilter
zombieHeadBottomMaterial.magFilter = THREE.NearestFilter
zombieArmFrontMaterial.magFilter = THREE.NearestFilter
zombieArmBackMaterial.magFilter = THREE.NearestFilter
zombieArmLeftMaterial.magFilter = THREE.NearestFilter
zombieArmRightMaterial.magFilter = THREE.NearestFilter
zombieArmTopMaterial.magFilter = THREE.NearestFilter
zombieArmBottomMaterial.magFilter = THREE.NearestFilter
zombieBodyFrontMaterial.magFilter = THREE.NearestFilter
zombieBodyBackMaterial.magFilter = THREE.NearestFilter
zombieBodyLeftMaterial.magFilter = THREE.NearestFilter
zombieBodyRightMaterial.magFilter = THREE.NearestFilter
zombieBodyTopMaterial.magFilter = THREE.NearestFilter
zombieBodyBottomMaterial.magFilter = THREE.NearestFilter
zombieLegFrontMaterial.magFilter = THREE.NearestFilter
zombieLegBackMaterial.magFilter = THREE.NearestFilter
zombieLegLeftMaterial.magFilter = THREE.NearestFilter
zombieLegRightMaterial.magFilter = THREE.NearestFilter
zombieLegTopMaterial.magFilter = THREE.NearestFilter
zombieLegBottomMaterial.magFilter = THREE.NearestFilter

const head_geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
const head_materials = [
    new THREE.MeshStandardMaterial({ map: zombieHeadFrontMaterial }),
    new THREE.MeshStandardMaterial({ map: zombieHeadBackMaterial }),
    new THREE.MeshStandardMaterial({ map: zombieHeadTopMaterial }),
    new THREE.MeshStandardMaterial({ map: zombieHeadBottomMaterial }),
    new THREE.MeshStandardMaterial({ map: zombieHeadLeftMaterial }),
    new THREE.MeshStandardMaterial({ map: zombieHeadRightMaterial }),
]

const body_geometry = new THREE.BoxGeometry(0.25, 0.75, 0.5)
const body_materials = [
    new THREE.MeshStandardMaterial({ map: zombieBodyFrontMaterial }),
    new THREE.MeshStandardMaterial({ map: zombieBodyBackMaterial }),
    new THREE.MeshStandardMaterial({ map: zombieBodyTopMaterial }),
    new THREE.MeshStandardMaterial({ map: zombieBodyBottomMaterial }),
    new THREE.MeshStandardMaterial({ map: zombieBodyLeftMaterial }),
    new THREE.MeshStandardMaterial({ map: zombieBodyRightMaterial }),
]

const arm_geometry = new THREE.BoxGeometry(0.25, 0.75, 0.25)
const arm_materials = [
    new THREE.MeshStandardMaterial({ map: zombieArmFrontMaterial }),
    new THREE.MeshStandardMaterial({ map: zombieArmBackMaterial }),
    new THREE.MeshStandardMaterial({ map: zombieArmTopMaterial }),
    new THREE.MeshStandardMaterial({ map: zombieArmBottomMaterial }),
    new THREE.MeshStandardMaterial({ map: zombieArmLeftMaterial }),
    new THREE.MeshStandardMaterial({ map: zombieArmRightMaterial }),
]

const leg_geometry = new THREE.BoxGeometry(0.25, 0.75, 0.25)
const leg_materials = [
    new THREE.MeshStandardMaterial({ map: zombieLegFrontMaterial }),
    new THREE.MeshStandardMaterial({ map: zombieLegBackMaterial }),
    new THREE.MeshStandardMaterial({ map: zombieLegTopMaterial }),
    new THREE.MeshStandardMaterial({ map: zombieLegBottomMaterial }),
    new THREE.MeshStandardMaterial({ map: zombieLegLeftMaterial }),
    new THREE.MeshStandardMaterial({ map: zombieLegRightMaterial }),
]

export const createZombie = () => {
    const zombie = new THREE.Group()
    const head = new THREE.Mesh(head_geometry, head_materials)
    head.position.set(0, 1.75, 0)
    const body = new THREE.Mesh(body_geometry, body_materials)
    body.position.set(0, 1.125, 0)
    const left_arm = new THREE.Mesh(arm_geometry, arm_materials)
    left_arm.position.set(0, 1.125, -0.375)
    left_arm.scale.set(1, 1, -1)
    const right_arm = new THREE.Mesh(arm_geometry, arm_materials)
    right_arm.position.set(0, 1.125, 0.375)
    const left_leg = new THREE.Mesh(leg_geometry, leg_materials)
    left_leg.position.set(0, 0.375, -0.125)
    left_leg.scale.set(1, 1, -1)
    const right_leg = new THREE.Mesh(leg_geometry, leg_materials)
    right_leg.position.set(0, 0.375, 0.125)
    zombie.add(head, body, left_arm, right_arm, left_leg, right_leg)
    return zombie
}

export const zombieOffset: THREE.Vector3 = new THREE.Vector3(0.0, 0.975, 0.0)
export const zombieSize: THREE.Vector3 = new THREE.Vector3(0.6, 1.95, 0.6)