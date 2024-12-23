import * as THREE from 'three'

let loader = new THREE.TextureLoader()
import chicken_head_front from '../../static/textures/entity/chicken/chicken_head_front.png'
import chicken_head_back from '../../static/textures/entity/chicken/chicken_head_back.png'
import chicken_head_left from '../../static/textures/entity/chicken/chicken_head_left.png'
import chicken_head_right from '../../static/textures/entity/chicken/chicken_head_right.png'
import chicken_head_top from '../../static/textures/entity/chicken/chicken_head_top.png'
import chicken_head_bottom from '../../static/textures/entity/chicken/chicken_head_bottom.png'
import chicken_beak_front from '../../static/textures/entity/chicken/chicken_beak_front.png'
import chicken_beak_back from '../../static/textures/entity/chicken/chicken_beak_back.png'
import chicken_beak_left from '../../static/textures/entity/chicken/chicken_beak_left.png'
import chicken_beak_right from '../../static/textures/entity/chicken/chicken_beak_right.png'
import chicken_beak_top from '../../static/textures/entity/chicken/chicken_beak_top.png'
import chicken_beak_bottom from '../../static/textures/entity/chicken/chicken_beak_bottom.png'
import chicken_wattle_front from '../../static/textures/entity/chicken/chicken_wattle_front.png'
import chicken_wattle_back from '../../static/textures/entity/chicken/chicken_wattle_back.png'
import chicken_wattle_left from '../../static/textures/entity/chicken/chicken_wattle_left.png'
import chicken_wattle_right from '../../static/textures/entity/chicken/chicken_wattle_right.png'
import chicken_wattle_top from '../../static/textures/entity/chicken/chicken_wattle_top.png'
import chicken_wattle_bottom from '../../static/textures/entity/chicken/chicken_wattle_bottom.png'
import chicken_body_front from '../../static/textures/entity/chicken/chicken_body_front.png'
import chicken_body_back from '../../static/textures/entity/chicken/chicken_body_back.png'
import chicken_body_left from '../../static/textures/entity/chicken/chicken_body_left.png'
import chicken_body_right from '../../static/textures/entity/chicken/chicken_body_right.png'
import chicken_body_top from '../../static/textures/entity/chicken/chicken_body_top.png'
import chicken_body_bottom from '../../static/textures/entity/chicken/chicken_body_bottom.png'
import chicken_leg_front from '../../static/textures/entity/chicken/chicken_leg_front.png'
import chicken_leg_front_alpha from '../../static/textures/entity/chicken/chicken_leg_front_alpha.png'
import chicken_leg_back from '../../static/textures/entity/chicken/chicken_leg_back.png'
import chicken_leg_back_alpha from '../../static/textures/entity/chicken/chicken_leg_back_alpha.png'
import chicken_leg_left from '../../static/textures/entity/chicken/chicken_leg_left.png'
import chicken_leg_left_alpha from '../../static/textures/entity/chicken/chicken_leg_left_alpha.png'
import chicken_leg_right from '../../static/textures/entity/chicken/chicken_leg_right.png'
import chicken_leg_right_alpha from '../../static/textures/entity/chicken/chicken_leg_right_alpha.png'
import chicken_leg_top from '../../static/textures/entity/chicken/chicken_leg_top.png'
import chicken_leg_top_alpha from '../../static/textures/entity/chicken/chicken_leg_top_alpha.png'
import chicken_leg_bottom from '../../static/textures/entity/chicken/chicken_leg_bottom.png'
import chicken_leg_bottom_alpha from '../../static/textures/entity/chicken/chicken_leg_bottom_alpha.png'
import chicken_wing_front from '../../static/textures/entity/chicken/chicken_wing_front.png'
import chicken_wing_back from '../../static/textures/entity/chicken/chicken_wing_back.png'
import chicken_wing_left from '../../static/textures/entity/chicken/chicken_wing_left.png'
import chicken_wing_right from '../../static/textures/entity/chicken/chicken_wing_right.png'
import chicken_wing_top from '../../static/textures/entity/chicken/chicken_wing_top.png'
import chicken_wing_bottom from '../../static/textures/entity/chicken/chicken_wing_bottom.png'

const chickenHeadFrontMaterial = loader.load(chicken_head_front)
const chickenHeadBackMaterial = loader.load(chicken_head_back)
const chickenHeadLeftMaterial = loader.load(chicken_head_left)
const chickenHeadRightMaterial = loader.load(chicken_head_right)
const chickenHeadTopMaterial = loader.load(chicken_head_top)
const chickenHeadBottomMaterial = loader.load(chicken_head_bottom)
const chickenBeakFrontMaterial = loader.load(chicken_beak_front)
const chickenBeakBackMaterial = loader.load(chicken_beak_back)
const chickenBeakLeftMaterial = loader.load(chicken_beak_left)
const chickenBeakRightMaterial = loader.load(chicken_beak_right)
const chickenBeakTopMaterial = loader.load(chicken_beak_top)
const chickenBeakBottomMaterial = loader.load(chicken_beak_bottom)
const chickenWattleFrontMaterial = loader.load(chicken_wattle_front)
const chickenWattleBackMaterial = loader.load(chicken_wattle_back)
const chickenWattleLeftMaterial = loader.load(chicken_wattle_left)
const chickenWattleRightMaterial = loader.load(chicken_wattle_right)
const chickenWattleTopMaterial = loader.load(chicken_wattle_top)
const chickenWattleBottomMaterial = loader.load(chicken_wattle_bottom)
const chickenBodyFrontMaterial = loader.load(chicken_body_front)
const chickenBodyBackMaterial = loader.load(chicken_body_back)
const chickenBodyLeftMaterial = loader.load(chicken_body_left)
const chickenBodyRightMaterial = loader.load(chicken_body_right)
const chickenBodyTopMaterial = loader.load(chicken_body_top)
const chickenBodyBottomMaterial = loader.load(chicken_body_bottom)
const chickenLegFrontMaterial = loader.load(chicken_leg_front)
const chickenLegFrontAlphaMaterial = loader.load(chicken_leg_front_alpha)
const chickenLegBackMaterial = loader.load(chicken_leg_back)
const chickenLegBackAlphaMaterial = loader.load(chicken_leg_back_alpha)
const chickenLegLeftMaterial = loader.load(chicken_leg_left)
const chickenLegLeftAlphaMaterial = loader.load(chicken_leg_left_alpha)
const chickenLegRightMaterial = loader.load(chicken_leg_right)
const chickenLegRightAlphaMaterial = loader.load(chicken_leg_right_alpha)
const chickenLegTopMaterial = loader.load(chicken_leg_top)
const chickenLegTopAlphaMaterial = loader.load(chicken_leg_top_alpha)
const chickenLegBottomMaterial = loader.load(chicken_leg_bottom)
const chickenLegBottomAlphaMaterial = loader.load(chicken_leg_bottom_alpha)
const chickenWingFrontMaterial = loader.load(chicken_wing_front)
const chickenWingBackMaterial = loader.load(chicken_wing_back)
const chickenWingLeftMaterial = loader.load(chicken_wing_left)
const chickenWingRightMaterial = loader.load(chicken_wing_right)
const chickenWingTopMaterial = loader.load(chicken_wing_top)
const chickenWingBottomMaterial = loader.load(chicken_wing_bottom)

chickenHeadFrontMaterial.magFilter = THREE.NearestFilter
chickenHeadBackMaterial.magFilter = THREE.NearestFilter
chickenHeadLeftMaterial.magFilter = THREE.NearestFilter
chickenHeadRightMaterial.magFilter = THREE.NearestFilter
chickenHeadTopMaterial.magFilter = THREE.NearestFilter
chickenHeadBottomMaterial.magFilter = THREE.NearestFilter
chickenBeakFrontMaterial.magFilter = THREE.NearestFilter
chickenBeakBackMaterial.magFilter = THREE.NearestFilter
chickenBeakLeftMaterial.magFilter = THREE.NearestFilter
chickenBeakRightMaterial.magFilter = THREE.NearestFilter
chickenBeakTopMaterial.magFilter = THREE.NearestFilter
chickenBeakBottomMaterial.magFilter = THREE.NearestFilter
chickenWattleFrontMaterial.magFilter = THREE.NearestFilter
chickenWattleBackMaterial.magFilter = THREE.NearestFilter
chickenWattleLeftMaterial.magFilter = THREE.NearestFilter
chickenWattleRightMaterial.magFilter = THREE.NearestFilter
chickenWattleTopMaterial.magFilter = THREE.NearestFilter
chickenWattleBottomMaterial.magFilter = THREE.NearestFilter
chickenBodyFrontMaterial.magFilter = THREE.NearestFilter
chickenBodyBackMaterial.magFilter = THREE.NearestFilter
chickenBodyLeftMaterial.magFilter = THREE.NearestFilter
chickenBodyRightMaterial.magFilter = THREE.NearestFilter
chickenBodyTopMaterial.magFilter = THREE.NearestFilter
chickenBodyBottomMaterial.magFilter = THREE.NearestFilter
chickenLegFrontMaterial.magFilter = THREE.NearestFilter
chickenLegFrontAlphaMaterial.magFilter = THREE.NearestFilter
chickenLegBackMaterial.magFilter = THREE.NearestFilter
chickenLegBackAlphaMaterial.magFilter = THREE.NearestFilter
chickenLegLeftMaterial.magFilter = THREE.NearestFilter
chickenLegLeftAlphaMaterial.magFilter = THREE.NearestFilter
chickenLegRightMaterial.magFilter = THREE.NearestFilter
chickenLegRightAlphaMaterial.magFilter = THREE.NearestFilter
chickenLegTopMaterial.magFilter = THREE.NearestFilter
chickenLegTopAlphaMaterial.magFilter = THREE.NearestFilter
chickenLegBottomMaterial.magFilter = THREE.NearestFilter
chickenLegBottomAlphaMaterial.magFilter = THREE.NearestFilter
chickenWingFrontMaterial.magFilter = THREE.NearestFilter
chickenWingBackMaterial.magFilter = THREE.NearestFilter
chickenWingLeftMaterial.magFilter = THREE.NearestFilter
chickenWingRightMaterial.magFilter = THREE.NearestFilter
chickenWingTopMaterial.magFilter = THREE.NearestFilter
chickenWingBottomMaterial.magFilter = THREE.NearestFilter

const head_geometry = new THREE.BoxGeometry(0.1875, 0.375, 0.25)
const head_materials = [
    new THREE.MeshStandardMaterial({ map: chickenHeadFrontMaterial }),
    new THREE.MeshStandardMaterial({ map: chickenHeadBackMaterial }),
    new THREE.MeshStandardMaterial({ map: chickenHeadTopMaterial }),
    new THREE.MeshStandardMaterial({ map: chickenHeadBottomMaterial }),
    new THREE.MeshStandardMaterial({ map: chickenHeadLeftMaterial }),
    new THREE.MeshStandardMaterial({ map: chickenHeadRightMaterial }),
]

const beak_geometry = new THREE.BoxGeometry(0.125, 0.125, 0.25)
const beak_materials = [
    new THREE.MeshStandardMaterial({ map: chickenBeakFrontMaterial }),
    new THREE.MeshStandardMaterial({ map: chickenBeakBackMaterial }),
    new THREE.MeshStandardMaterial({ map: chickenBeakTopMaterial }),
    new THREE.MeshStandardMaterial({ map: chickenBeakBottomMaterial }),
    new THREE.MeshStandardMaterial({ map: chickenBeakLeftMaterial }),
    new THREE.MeshStandardMaterial({ map: chickenBeakRightMaterial }),
]

const wattle_geometry = new THREE.BoxGeometry(0.125, 0.125, 0.125)
const wattle_materials = [
    new THREE.MeshStandardMaterial({ map: chickenWattleFrontMaterial }),
    new THREE.MeshStandardMaterial({ map: chickenWattleBackMaterial }),
    new THREE.MeshStandardMaterial({ map: chickenWattleTopMaterial }),
    new THREE.MeshStandardMaterial({ map: chickenWattleBottomMaterial }),
    new THREE.MeshStandardMaterial({ map: chickenWattleLeftMaterial }),
    new THREE.MeshStandardMaterial({ map: chickenWattleRightMaterial }),
]

const body_geometry = new THREE.BoxGeometry(0.375, 0.5, 0.375)
const body_materials = [
    new THREE.MeshStandardMaterial({ map: chickenBodyFrontMaterial }),
    new THREE.MeshStandardMaterial({ map: chickenBodyBackMaterial }),
    new THREE.MeshStandardMaterial({ map: chickenBodyTopMaterial }),
    new THREE.MeshStandardMaterial({ map: chickenBodyBottomMaterial }),
    new THREE.MeshStandardMaterial({ map: chickenBodyLeftMaterial }),
    new THREE.MeshStandardMaterial({ map: chickenBodyRightMaterial }),
]

const leg_geometry = new THREE.BoxGeometry(0.1875, 0.3125, 0.1875)
const leg_materials = [
    new THREE.MeshStandardMaterial({ 
        map: chickenLegFrontMaterial,
        alphaMap: chickenLegFrontAlphaMaterial,
        transparent: true,
        opacity: 1,
        side: THREE.DoubleSide,
        alphaTest: 0.1,
    }),
    new THREE.MeshStandardMaterial({ 
        map: chickenLegBackMaterial,
        alphaMap: chickenLegBackAlphaMaterial,
        transparent: true,
        opacity: 1,
        side: THREE.DoubleSide,
        alphaTest: 0.1,
    }),
    new THREE.MeshStandardMaterial({ 
        map: chickenLegTopMaterial,
        alphaMap: chickenLegTopAlphaMaterial,
        transparent: true,
        opacity: 1,
        side: THREE.DoubleSide,
        alphaTest: 0.1,
    }),
    new THREE.MeshStandardMaterial({ 
        map: chickenLegBottomMaterial,
        alphaMap: chickenLegBottomAlphaMaterial,
        transparent: true,
        opacity: 1,
        side: THREE.DoubleSide,
        alphaTest: 0.1,
    }),
    new THREE.MeshStandardMaterial({ 
        map: chickenLegLeftMaterial,
        alphaMap: chickenLegLeftAlphaMaterial,
        transparent: true,
        opacity: 1,
        side: THREE.DoubleSide,
        alphaTest: 0.1,
    }),
    new THREE.MeshStandardMaterial({ 
        map: chickenLegRightMaterial,
        alphaMap: chickenLegRightAlphaMaterial,
        transparent: true,
        opacity: 1,
        side: THREE.DoubleSide,
        alphaTest: 0.1,
    }),
]

const wing_geometry = new THREE.BoxGeometry(0.375, 0.25, 0.0625)
const wing_materials = [
    new THREE.MeshStandardMaterial({ map: chickenWingFrontMaterial }),
    new THREE.MeshStandardMaterial({ map: chickenWingBackMaterial }),
    new THREE.MeshStandardMaterial({ map: chickenWingTopMaterial }),
    new THREE.MeshStandardMaterial({ map: chickenWingBottomMaterial }),
    new THREE.MeshStandardMaterial({ map: chickenWingLeftMaterial }),
    new THREE.MeshStandardMaterial({ map: chickenWingRightMaterial }),
]

export const createChicken = () => {
    const chicken = new THREE.Group()
    const head = new THREE.Mesh(head_geometry, head_materials)
    head.castShadow = true
    head.receiveShadow = true
    const beak = new THREE.Mesh(beak_geometry, beak_materials)
    beak.castShadow = true
    beak.receiveShadow = true
    beak.position.set(0.15625, 0, 0)
    const wattle = new THREE.Mesh(wattle_geometry, wattle_materials)
    wattle.castShadow = true
    wattle.receiveShadow = true
    wattle.position.set(0.09375, -0.125, 0)
    head.add(beak, wattle)
    head.position.set(0.28125, 0.75, 0)
    const body = new THREE.Mesh(body_geometry, body_materials)
    body.castShadow = true
    body.receiveShadow = true
    body.position.set(0, 0.5, 0)
    body.rotation.set(0, 0, -Math.PI / 2)
    const left_leg = new THREE.Mesh(leg_geometry, leg_materials)
    left_leg.castShadow = true
    left_leg.receiveShadow = true
    left_leg.position.set(0.03125, 0.15625, -0.09375)
    const right_leg = new THREE.Mesh(leg_geometry, leg_materials)
    right_leg.castShadow = true
    right_leg.receiveShadow = true
    right_leg.position.set(0.03125, 0.15625, 0.09375)
    const left_wing = new THREE.Mesh(wing_geometry, wing_materials)
    left_wing.castShadow = true
    left_wing.receiveShadow = true
    left_wing.position.set(0, 0.5625, -0.21875)
    const right_wing = new THREE.Mesh(wing_geometry, wing_materials)
    right_wing.castShadow = true
    right_wing.receiveShadow = true
    right_wing.position.set(0, 0.5625, 0.21875)
    chicken.add(head, body, left_leg, right_leg, left_wing, right_wing)
    return chicken
}

export const chickenOffset: THREE.Vector3 = new THREE.Vector3(0, 0.33, 0)
export const chickenSize: THREE.Vector3 = new THREE.Vector3(0.4, 0.7, 0.4)