import * as THREE from 'three'

let loader = new THREE.TextureLoader()
import pig_head_front from '../../static/textures/entity/pig/pig_head_front.png'
import pig_head_back from '../../static/textures/entity/pig/pig_head_back.png'
import pig_head_left from '../../static/textures/entity/pig/pig_head_left.png'
import pig_head_right from '../../static/textures/entity/pig/pig_head_right.png'
import pig_head_top from '../../static/textures/entity/pig/pig_head_top.png'
import pig_head_bottom from '../../static/textures/entity/pig/pig_head_bottom.png'
import pig_leg_front from '../../static/textures/entity/pig/pig_leg_front.png'
import pig_leg_back from '../../static/textures/entity/pig/pig_leg_back.png'
import pig_leg_left from '../../static/textures/entity/pig/pig_leg_left.png'
import pig_leg_right from '../../static/textures/entity/pig/pig_leg_right.png'
import pig_leg_top from '../../static/textures/entity/pig/pig_leg_top.png'
import pig_leg_bottom from '../../static/textures/entity/pig/pig_leg_bottom.png'
import pig_nose_front from '../../static/textures/entity/pig/pig_nose_front.png'
import pig_nose_back from '../../static/textures/entity/pig/pig_nose_back.png'
import pig_nose_back_alpha from '../../static/textures/entity/pig/pig_nose_back_alpha.png'
import pig_nose_left from '../../static/textures/entity/pig/pig_nose_left.png'
import pig_nose_right from '../../static/textures/entity/pig/pig_nose_right.png'
import pig_nose_top from '../../static/textures/entity/pig/pig_nose_top.png'
import pig_nose_bottom from '../../static/textures/entity/pig/pig_nose_bottom.png'
import pig_body_front from '../../static/textures/entity/pig/pig_body_front.png'
import pig_body_back from '../../static/textures/entity/pig/pig_body_back.png'
import pig_body_left from '../../static/textures/entity/pig/pig_body_left.png'
import pig_body_right from '../../static/textures/entity/pig/pig_body_right.png'
import pig_body_top from '../../static/textures/entity/pig/pig_body_top.png'
import pig_body_bottom from '../../static/textures/entity/pig/pig_body_bottom.png'

const pigHeadFrontMaterial = loader.load(pig_head_front)
const pigHeadBackMaterial = loader.load(pig_head_back)
const pigHeadLeftMaterial = loader.load(pig_head_left)
const pigHeadRightMaterial = loader.load(pig_head_right)
const pigHeadTopMaterial = loader.load(pig_head_top)
const pigHeadBottomMaterial = loader.load(pig_head_bottom)
const pigLegFrontMaterial = loader.load(pig_leg_front)
const pigLegBackMaterial = loader.load(pig_leg_back)
const pigLegLeftMaterial = loader.load(pig_leg_left)
const pigLegRightMaterial = loader.load(pig_leg_right)
const pigLegTopMaterial = loader.load(pig_leg_top)
const pigLegBottomMaterial = loader.load(pig_leg_bottom)
const pigNoseFrontMaterial = loader.load(pig_nose_front)
const pigNoseBackMaterial = loader.load(pig_nose_back)
const pigNoseBackAlphaMaterial = loader.load(pig_nose_back_alpha)
const pigNoseLeftMaterial = loader.load(pig_nose_left)
const pigNoseRightMaterial = loader.load(pig_nose_right)
const pigNoseTopMaterial = loader.load(pig_nose_top)
const pigNoseBottomMaterial = loader.load(pig_nose_bottom)
const pigBodyFrontMaterial = loader.load(pig_body_front)
const pigBodyBackMaterial = loader.load(pig_body_back)
const pigBodyLeftMaterial = loader.load(pig_body_left)
const pigBodyRightMaterial = loader.load(pig_body_right)
const pigBodyTopMaterial = loader.load(pig_body_top)
const pigBodyBottomMaterial = loader.load(pig_body_bottom)

pigHeadFrontMaterial.magFilter = THREE.NearestFilter
pigHeadBackMaterial.magFilter = THREE.NearestFilter
pigHeadLeftMaterial.magFilter = THREE.NearestFilter
pigHeadRightMaterial.magFilter = THREE.NearestFilter
pigHeadTopMaterial.magFilter = THREE.NearestFilter
pigHeadBottomMaterial.magFilter = THREE.NearestFilter
pigLegFrontMaterial.magFilter = THREE.NearestFilter
pigLegBackMaterial.magFilter = THREE.NearestFilter
pigLegLeftMaterial.magFilter = THREE.NearestFilter
pigLegRightMaterial.magFilter = THREE.NearestFilter
pigLegTopMaterial.magFilter = THREE.NearestFilter
pigLegBottomMaterial.magFilter = THREE.NearestFilter
pigNoseFrontMaterial.magFilter = THREE.NearestFilter
pigNoseBackMaterial.magFilter = THREE.NearestFilter
pigNoseBackAlphaMaterial.magFilter = THREE.NearestFilter
pigNoseLeftMaterial.magFilter = THREE.NearestFilter
pigNoseRightMaterial.magFilter = THREE.NearestFilter
pigNoseTopMaterial.magFilter = THREE.NearestFilter
pigNoseBottomMaterial.magFilter = THREE.NearestFilter
pigBodyFrontMaterial.magFilter = THREE.NearestFilter
pigBodyBackMaterial.magFilter = THREE.NearestFilter
pigBodyLeftMaterial.magFilter = THREE.NearestFilter
pigBodyRightMaterial.magFilter = THREE.NearestFilter
pigBodyTopMaterial.magFilter = THREE.NearestFilter
pigBodyBottomMaterial.magFilter = THREE.NearestFilter

const head_geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
const head_material = [
    new THREE.MeshStandardMaterial({ map: pigHeadFrontMaterial }),
    new THREE.MeshStandardMaterial({ map: pigHeadBackMaterial }),
    new THREE.MeshStandardMaterial({ map: pigHeadTopMaterial }),
    new THREE.MeshStandardMaterial({ map: pigHeadBottomMaterial }),
    new THREE.MeshStandardMaterial({ map: pigHeadLeftMaterial }),
    new THREE.MeshStandardMaterial({ map: pigHeadRightMaterial }),
]

const leg_geometry = new THREE.BoxGeometry(0.25, 0.375, 0.25)
const leg_material = [
    new THREE.MeshStandardMaterial({ map: pigLegFrontMaterial }),
    new THREE.MeshStandardMaterial({ map: pigLegBackMaterial }),
    new THREE.MeshStandardMaterial({ map: pigLegTopMaterial }),
    new THREE.MeshStandardMaterial({ map: pigLegBottomMaterial }),
    new THREE.MeshStandardMaterial({ map: pigLegLeftMaterial }),
    new THREE.MeshStandardMaterial({ map: pigLegRightMaterial }),
]

const nose_geometry = new THREE.BoxGeometry(0.0625, 0.1875, 0.25)
const nose_material = [
    new THREE.MeshStandardMaterial({ map: pigNoseFrontMaterial }),
    new THREE.MeshStandardMaterial({ 
        map: pigNoseBackMaterial,
        alphaMap: pigNoseBackAlphaMaterial,
        transparent: true,
        opacity: 1,
    }),
    new THREE.MeshStandardMaterial({ map: pigNoseTopMaterial }),
    new THREE.MeshStandardMaterial({ map: pigNoseBottomMaterial }),
    new THREE.MeshStandardMaterial({ map: pigNoseLeftMaterial }),
    new THREE.MeshStandardMaterial({ map: pigNoseRightMaterial }),
]

const body_geometry = new THREE.BoxGeometry(0.5, 1, 0.625)
const body_material = [
    new THREE.MeshStandardMaterial({ map: pigBodyFrontMaterial }),
    new THREE.MeshStandardMaterial({ map: pigBodyBackMaterial }),
    new THREE.MeshStandardMaterial({ map: pigBodyTopMaterial }),
    new THREE.MeshStandardMaterial({ map: pigBodyBottomMaterial }),
    new THREE.MeshStandardMaterial({ map: pigBodyLeftMaterial }),
    new THREE.MeshStandardMaterial({ map: pigBodyRightMaterial }),
]

export const createPig = () => {
    const pig = new THREE.Group()
    const head = new THREE.Mesh(head_geometry, head_material)
    head.castShadow = true
    head.receiveShadow = true
    const nose = new THREE.Mesh(nose_geometry, nose_material)
    nose.castShadow = true
    nose.receiveShadow = true
    nose.position.set(0.28125, -0.09375, 0)
    head.add(nose)
    head.position.set(0.625, 0.75, 0)
    const body = new THREE.Mesh(body_geometry, body_material)
    body.castShadow = true
    body.receiveShadow = true
    body.position.set(0, 0.625, 0)
    body.rotation.set(0, 0, -Math.PI / 2)
    const left_front_leg = new THREE.Mesh(leg_geometry, leg_material)
    left_front_leg.castShadow = true
    left_front_leg.receiveShadow = true
    left_front_leg.position.set(0.3125, 0.1875, -0.1875)
    const left_back_leg = new THREE.Mesh(leg_geometry, leg_material)
    left_back_leg.castShadow = true
    left_back_leg.receiveShadow = true
    left_back_leg.position.set(-0.4375, 0.1875, -0.1875)
    const right_front_leg = new THREE.Mesh(leg_geometry, leg_material)
    right_front_leg.castShadow = true
    right_front_leg.receiveShadow = true
    right_front_leg.position.set(0.3125, 0.1875, 0.1875)
    const right_back_leg = new THREE.Mesh(leg_geometry, leg_material)
    right_back_leg.castShadow = true
    right_back_leg.receiveShadow = true
    right_back_leg.position.set(-0.4375, 0.1875, 0.1875)
    pig.add(head, body, left_front_leg, left_back_leg, right_front_leg, right_back_leg)
    return pig
}

export const pigOffset: THREE.Vector3 = new THREE.Vector3(0, 0.45, 0)
export const pigSize: THREE.Vector3 = new THREE.Vector3(0.9, 0.9, 0.9)