import * as THREE from 'three'

let loader = new THREE.TextureLoader()
import skeleton_head_front from '../../static/textures/entity/skeleton/skeleton_head_front.png'
import skeleton_head_back from '../../static/textures/entity/skeleton/skeleton_head_back.png'
import skeleton_head_left from '../../static/textures/entity/skeleton/skeleton_head_left.png'
import skeleton_head_right from '../../static/textures/entity/skeleton/skeleton_head_right.png'
import skeleton_head_top from '../../static/textures/entity/skeleton/skeleton_head_top.png'
import skeleton_head_bottom from '../../static/textures/entity/skeleton/skeleton_head_bottom.png'
import skeleton_head_bottom_alpha from '../../static/textures/entity/skeleton/skeleton_head_bottom_alpha.png'
import skeleton_arm_front from '../../static/textures/entity/skeleton/skeleton_arm_front.png'
import skeleton_arm_back from '../../static/textures/entity/skeleton/skeleton_arm_back.png'
import skeleton_arm_left from '../../static/textures/entity/skeleton/skeleton_arm_left.png'
import skeleton_arm_right from '../../static/textures/entity/skeleton/skeleton_arm_right.png'
import skeleton_arm_top from '../../static/textures/entity/skeleton/skeleton_arm_top.png'
import skeleton_arm_bottom from '../../static/textures/entity/skeleton/skeleton_arm_bottom.png'
import skeleton_body_front from '../../static/textures/entity/skeleton/skeleton_body_front.png'
import skeleton_body_front_alpha from '../../static/textures/entity/skeleton/skeleton_body_front_alpha.png'
import skeleton_body_back from '../../static/textures/entity/skeleton/skeleton_body_back.png'
import skeleton_body_back_alpha from '../../static/textures/entity/skeleton/skeleton_body_back_alpha.png'
import skeleton_body_left from '../../static/textures/entity/skeleton/skeleton_body_left.png'
import skeleton_body_left_alpha from '../../static/textures/entity/skeleton/skeleton_body_left_alpha.png'
import skeleton_body_right from '../../static/textures/entity/skeleton/skeleton_body_right.png'
import skeleton_body_right_alpha from '../../static/textures/entity/skeleton/skeleton_body_right_alpha.png'
import skeleton_body_top from '../../static/textures/entity/skeleton/skeleton_body_top.png'
import skeleton_body_top_alpha from '../../static/textures/entity/skeleton/skeleton_body_top_alpha.png'   
import skeleton_body_bottom from '../../static/textures/entity/skeleton/skeleton_body_bottom.png'
import skeleton_body_bottom_alpha from '../../static/textures/entity/skeleton/skeleton_body_bottom_alpha.png'
import skeleton_leg_front from '../../static/textures/entity/skeleton/skeleton_leg_front.png'
import skeleton_leg_back from '../../static/textures/entity/skeleton/skeleton_leg_back.png'
import skeleton_leg_left from '../../static/textures/entity/skeleton/skeleton_leg_left.png'
import skeleton_leg_right from '../../static/textures/entity/skeleton/skeleton_leg_right.png'
import skeleton_leg_top from '../../static/textures/entity/skeleton/skeleton_leg_top.png'
import skeleton_leg_bottom from '../../static/textures/entity/skeleton/skeleton_leg_bottom.png'

const skeletonHeadFrontMaterial = loader.load(skeleton_head_front)
const skeletonHeadBackMaterial = loader.load(skeleton_head_back)
const skeletonHeadLeftMaterial = loader.load(skeleton_head_left)
const skeletonHeadRightMaterial = loader.load(skeleton_head_right)
const skeletonHeadTopMaterial = loader.load(skeleton_head_top)
const skeletonHeadBottomMaterial = loader.load(skeleton_head_bottom)
const skeletonHeadBottomAlphaMaterial = loader.load(skeleton_head_bottom_alpha)
const skeletonArmFrontMaterial = loader.load(skeleton_arm_front)
const skeletonArmBackMaterial = loader.load(skeleton_arm_back)
const skeletonArmLeftMaterial = loader.load(skeleton_arm_left)
const skeletonArmRightMaterial = loader.load(skeleton_arm_right)
const skeletonArmTopMaterial = loader.load(skeleton_arm_top)
const skeletonArmBottomMaterial = loader.load(skeleton_arm_bottom)
const skeletonBodyFrontMaterial = loader.load(skeleton_body_front)
const skeletonBodyFrontAlphaMaterial = loader.load(skeleton_body_front_alpha)
const skeletonBodyBackMaterial = loader.load(skeleton_body_back)
const skeletonBodyBackAlphaMaterial = loader.load(skeleton_body_back_alpha)
const skeletonBodyLeftMaterial = loader.load(skeleton_body_left)
const skeletonBodyLeftAlphaMaterial = loader.load(skeleton_body_left_alpha)
const skeletonBodyRightMaterial = loader.load(skeleton_body_right)
const skeletonBodyRightAlphaMaterial = loader.load(skeleton_body_right_alpha)
const skeletonBodyTopMaterial = loader.load(skeleton_body_top)
const skeletonBodyTopAlphaMaterial = loader.load(skeleton_body_top_alpha)
const skeletonBodyBottomMaterial = loader.load(skeleton_body_bottom)
const skeletonBodyBottomAlphaMaterial = loader.load(skeleton_body_bottom_alpha)
const skeletonLegFrontMaterial = loader.load(skeleton_leg_front)
const skeletonLegBackMaterial = loader.load(skeleton_leg_back)
const skeletonLegLeftMaterial = loader.load(skeleton_leg_left)
const skeletonLegRightMaterial = loader.load(skeleton_leg_right)
const skeletonLegTopMaterial = loader.load(skeleton_leg_top)
const skeletonLegBottomMaterial = loader.load(skeleton_leg_bottom)

skeletonHeadFrontMaterial.magFilter = THREE.NearestFilter
skeletonHeadBackMaterial.magFilter = THREE.NearestFilter
skeletonHeadLeftMaterial.magFilter = THREE.NearestFilter
skeletonHeadRightMaterial.magFilter = THREE.NearestFilter
skeletonHeadTopMaterial.magFilter = THREE.NearestFilter
skeletonHeadBottomMaterial.magFilter = THREE.NearestFilter
skeletonHeadBottomAlphaMaterial.magFilter = THREE.NearestFilter
skeletonArmFrontMaterial.magFilter = THREE.NearestFilter
skeletonArmBackMaterial.magFilter = THREE.NearestFilter
skeletonArmLeftMaterial.magFilter = THREE.NearestFilter
skeletonArmRightMaterial.magFilter = THREE.NearestFilter
skeletonArmTopMaterial.magFilter = THREE.NearestFilter
skeletonArmBottomMaterial.magFilter = THREE.NearestFilter
skeletonBodyFrontMaterial.magFilter = THREE.NearestFilter
skeletonBodyFrontAlphaMaterial.magFilter = THREE.NearestFilter
skeletonBodyBackMaterial.magFilter = THREE.NearestFilter
skeletonBodyBackAlphaMaterial.magFilter = THREE.NearestFilter
skeletonBodyLeftMaterial.magFilter = THREE.NearestFilter
skeletonBodyLeftAlphaMaterial.magFilter = THREE.NearestFilter
skeletonBodyRightMaterial.magFilter = THREE.NearestFilter
skeletonBodyRightAlphaMaterial.magFilter = THREE.NearestFilter
skeletonBodyTopMaterial.magFilter = THREE.NearestFilter
skeletonBodyTopAlphaMaterial.magFilter = THREE.NearestFilter
skeletonBodyBottomMaterial.magFilter = THREE.NearestFilter
skeletonBodyBottomAlphaMaterial.magFilter = THREE.NearestFilter
skeletonLegFrontMaterial.magFilter = THREE.NearestFilter
skeletonLegBackMaterial.magFilter = THREE.NearestFilter
skeletonLegLeftMaterial.magFilter = THREE.NearestFilter
skeletonLegRightMaterial.magFilter = THREE.NearestFilter
skeletonLegTopMaterial.magFilter = THREE.NearestFilter
skeletonLegBottomMaterial.magFilter = THREE.NearestFilter

const head_geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
const head_material = [
    new THREE.MeshStandardMaterial({
        map: skeletonHeadFrontMaterial, 
        side: THREE.DoubleSide
    }),
    new THREE.MeshStandardMaterial({
        map: skeletonHeadBackMaterial,
        side: THREE.DoubleSide
    }),
    new THREE.MeshStandardMaterial({
        map: skeletonHeadTopMaterial,
        side: THREE.DoubleSide
    }),
    new THREE.MeshStandardMaterial({
        map: skeletonHeadBottomMaterial,
        alphaMap: skeletonHeadBottomAlphaMaterial,
        transparent: true,
        opacity: 1,
        side: THREE.DoubleSide
    }),
    new THREE.MeshStandardMaterial({
        map: skeletonHeadLeftMaterial,
        side: THREE.DoubleSide
    }),
    new THREE.MeshStandardMaterial({
        map: skeletonHeadRightMaterial,
        side: THREE.DoubleSide
    }),
]

const arm_geometry = new THREE.BoxGeometry(0.125, 0.75, 0.125)
const arm_material = [
    new THREE.MeshStandardMaterial({ map: skeletonArmFrontMaterial }),
    new THREE.MeshStandardMaterial({ map: skeletonArmBackMaterial }),
    new THREE.MeshStandardMaterial({ map: skeletonArmTopMaterial }),
    new THREE.MeshStandardMaterial({ map: skeletonArmBottomMaterial }),
    new THREE.MeshStandardMaterial({ map: skeletonArmLeftMaterial }),
    new THREE.MeshStandardMaterial({ map: skeletonArmRightMaterial }),
]

const body_geometry = new THREE.BoxGeometry(0.25, 0.75, 0.5)
const body_material = [
    new THREE.MeshStandardMaterial({
        map: skeletonBodyFrontMaterial,
        alphaMap: skeletonBodyFrontAlphaMaterial,
        transparent: true,
        opacity: 1,
        side: THREE.DoubleSide,
        alphaTest: 0.1,
    }),
    new THREE.MeshStandardMaterial({
        map: skeletonBodyBackMaterial,
        alphaMap: skeletonBodyBackAlphaMaterial,
        transparent: true,
        opacity: 1,
        side: THREE.DoubleSide,
        alphaTest: 0.1,
    }),
    new THREE.MeshStandardMaterial({
        map: skeletonBodyTopMaterial,
        alphaMap: skeletonBodyTopAlphaMaterial,
        transparent: true,
        opacity: 1,
        side: THREE.DoubleSide,
        alphaTest: 0.1,
    }),
    new THREE.MeshStandardMaterial({
        map: skeletonBodyBottomMaterial,
        alphaMap: skeletonBodyBottomAlphaMaterial,
        transparent: true,
        opacity: 1,
        side: THREE.DoubleSide,
        alphaTest: 0.1,
    }),
    new THREE.MeshStandardMaterial({
        map: skeletonBodyLeftMaterial,
        alphaMap: skeletonBodyLeftAlphaMaterial,
        transparent: true,
        opacity: 1,
        side: THREE.DoubleSide,
        alphaTest: 0.1,
    }),
    new THREE.MeshStandardMaterial({
        map: skeletonBodyRightMaterial,
        alphaMap: skeletonBodyRightAlphaMaterial,
        transparent: true,
        opacity: 1,
        side: THREE.DoubleSide,
        alphaTest: 0.1,
    }),
]

const leg_geometry = new THREE.BoxGeometry(0.125, 0.75, 0.125)
const leg_material = [
    new THREE.MeshStandardMaterial({ map: skeletonLegFrontMaterial }),
    new THREE.MeshStandardMaterial({ map: skeletonLegBackMaterial }),
    new THREE.MeshStandardMaterial({ map: skeletonLegTopMaterial }),
    new THREE.MeshStandardMaterial({ map: skeletonLegBottomMaterial }),
    new THREE.MeshStandardMaterial({ map: skeletonLegLeftMaterial }),
    new THREE.MeshStandardMaterial({ map: skeletonLegRightMaterial }),
]

export const createSkeleton = () => {
    const skeleton = new THREE.Group()
    const head = new THREE.Mesh(head_geometry, head_material)
    head.position.set(0, 1.75, 0)
    const body = new THREE.Mesh(body_geometry, body_material)
    body.position.set(0, 1.125, 0)
    const left_arm = new THREE.Mesh(arm_geometry, arm_material)
    left_arm.position.set(0, 1.125, -0.3125)
    left_arm.scale.set(1, 1, -1)
    const right_arm = new THREE.Mesh(arm_geometry, arm_material)
    right_arm.position.set(0, 1.125, 0.3125)
    const left_leg = new THREE.Mesh(leg_geometry, leg_material)
    left_leg.position.set(0, 0.375, -0.125)
    left_leg.scale.set(1, 1, -1)
    const right_leg = new THREE.Mesh(leg_geometry, leg_material)
    right_leg.position.set(0, 0.375, 0.125)
    skeleton.add(head, body, left_arm, right_arm, left_leg, right_leg)
    return skeleton
}

export const skeletonOffset: THREE.Vector3 = new THREE.Vector3(0, 0.995, 0)
export const skeletonSize: THREE.Vector3 = new THREE.Vector3(0.6, 1.99, 0.6)