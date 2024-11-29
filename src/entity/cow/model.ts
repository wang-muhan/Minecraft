import * as THREE from 'three'

let loader = new THREE.TextureLoader()
import cow_head_front from '../../static/textures/entity/cow/cow_head_front.png'
import cow_head_back from '../../static/textures/entity/cow/cow_head_back.png'
import cow_head_left from '../../static/textures/entity/cow/cow_head_left.png'
import cow_head_right from '../../static/textures/entity/cow/cow_head_right.png'
import cow_head_top from '../../static/textures/entity/cow/cow_head_top.png'
import cow_head_bottom from '../../static/textures/entity/cow/cow_head_bottom.png'
import cow_leg_front from '../../static/textures/entity/cow/cow_leg_front.png'
import cow_leg_back from '../../static/textures/entity/cow/cow_leg_back.png'
import cow_leg_left from '../../static/textures/entity/cow/cow_leg_left.png'
import cow_leg_right from '../../static/textures/entity/cow/cow_leg_right.png'
import cow_leg_top from '../../static/textures/entity/cow/cow_leg_top.png'
import cow_leg_bottom from '../../static/textures/entity/cow/cow_leg_bottom.png'
import cow_ear_front from '../../static/textures/entity/cow/cow_ear_front.png'
import cow_ear_back from '../../static/textures/entity/cow/cow_ear_back.png'
import cow_ear_left from '../../static/textures/entity/cow/cow_ear_left.png'
import cow_ear_right from '../../static/textures/entity/cow/cow_ear_right.png'
import cow_ear_top from '../../static/textures/entity/cow/cow_ear_top.png'
import cow_ear_bottom from '../../static/textures/entity/cow/cow_ear_bottom.png'
import cow_body_front from '../../static/textures/entity/cow/cow_body_front.png'
import cow_body_back from '../../static/textures/entity/cow/cow_body_back.png'
import cow_body_left from '../../static/textures/entity/cow/cow_body_left.png'
import cow_body_right from '../../static/textures/entity/cow/cow_body_right.png'
import cow_body_top from '../../static/textures/entity/cow/cow_body_top.png'
import cow_body_bottom from '../../static/textures/entity/cow/cow_body_bottom.png'
import cow_abdomen_front from '../../static/textures/entity/cow/cow_abdomen_front.png'
import cow_abdomen_back from '../../static/textures/entity/cow/cow_abdomen_back.png'
import cow_abdomen_back_alpha from '../../static/textures/entity/cow/cow_abdomen_back_alpha.png'
import cow_abdomen_left from '../../static/textures/entity/cow/cow_abdomen_left.png'
import cow_abdomen_right from '../../static/textures/entity/cow/cow_abdomen_right.png'
import cow_abdomen_top from '../../static/textures/entity/cow/cow_abdomen_top.png'
import cow_abdomen_bottom from '../../static/textures/entity/cow/cow_abdomen_bottom.png'

const cowHeadFrontMaterial = loader.load(cow_head_front)
const cowHeadBackMaterial = loader.load(cow_head_back)
const cowHeadLeftMaterial = loader.load(cow_head_left)
const cowHeadRightMaterial = loader.load(cow_head_right)
const cowHeadTopMaterial = loader.load(cow_head_top)
const cowHeadBottomMaterial = loader.load(cow_head_bottom)
const cowLegFrontMaterial = loader.load(cow_leg_front)
const cowLegBackMaterial = loader.load(cow_leg_back)
const cowLegLeftMaterial = loader.load(cow_leg_left)
const cowLegRightMaterial = loader.load(cow_leg_right)
const cowLegTopMaterial = loader.load(cow_leg_top)
const cowLegBottomMaterial = loader.load(cow_leg_bottom)
const cowEarFrontMaterial = loader.load(cow_ear_front)
const cowEarBackMaterial = loader.load(cow_ear_back)
const cowEarLeftMaterial = loader.load(cow_ear_left)
const cowEarRightMaterial = loader.load(cow_ear_right)
const cowEarTopMaterial = loader.load(cow_ear_top)
const cowEarBottomMaterial = loader.load(cow_ear_bottom)
const cowBodyFrontMaterial = loader.load(cow_body_front)
const cowBodyBackMaterial = loader.load(cow_body_back)
const cowBodyLeftMaterial = loader.load(cow_body_left)
const cowBodyRightMaterial = loader.load(cow_body_right)
const cowBodyTopMaterial = loader.load(cow_body_top)
const cowBodyBottomMaterial = loader.load(cow_body_bottom)
const cowAbdomenFrontMaterial = loader.load(cow_abdomen_front)
const cowAbdomenBackMaterial = loader.load(cow_abdomen_back)
const cowAbdomenBackAlphaMaterial = loader.load(cow_abdomen_back_alpha)
const cowAbdomenLeftMaterial = loader.load(cow_abdomen_left)
const cowAbdomenRightMaterial = loader.load(cow_abdomen_right)
const cowAbdomenTopMaterial = loader.load(cow_abdomen_top)
const cowAbdomenBottomMaterial = loader.load(cow_abdomen_bottom)

cowHeadFrontMaterial.magFilter = THREE.NearestFilter
cowHeadBackMaterial.magFilter = THREE.NearestFilter
cowHeadLeftMaterial.magFilter = THREE.NearestFilter
cowHeadRightMaterial.magFilter = THREE.NearestFilter
cowHeadTopMaterial.magFilter = THREE.NearestFilter
cowHeadBottomMaterial.magFilter = THREE.NearestFilter
cowLegFrontMaterial.magFilter = THREE.NearestFilter
cowLegBackMaterial.magFilter = THREE.NearestFilter
cowLegLeftMaterial.magFilter = THREE.NearestFilter
cowLegRightMaterial.magFilter = THREE.NearestFilter
cowLegTopMaterial.magFilter = THREE.NearestFilter
cowLegBottomMaterial.magFilter = THREE.NearestFilter
cowEarFrontMaterial.magFilter = THREE.NearestFilter
cowEarBackMaterial.magFilter = THREE.NearestFilter
cowEarLeftMaterial.magFilter = THREE.NearestFilter
cowEarRightMaterial.magFilter = THREE.NearestFilter
cowEarTopMaterial.magFilter = THREE.NearestFilter
cowEarBottomMaterial.magFilter = THREE.NearestFilter
cowBodyFrontMaterial.magFilter = THREE.NearestFilter
cowBodyBackMaterial.magFilter = THREE.NearestFilter
cowBodyLeftMaterial.magFilter = THREE.NearestFilter
cowBodyRightMaterial.magFilter = THREE.NearestFilter
cowBodyTopMaterial.magFilter = THREE.NearestFilter
cowBodyBottomMaterial.magFilter = THREE.NearestFilter
cowAbdomenFrontMaterial.magFilter = THREE.NearestFilter
cowAbdomenBackMaterial.magFilter = THREE.NearestFilter
cowAbdomenBackAlphaMaterial.magFilter = THREE.NearestFilter
cowAbdomenLeftMaterial.magFilter = THREE.NearestFilter
cowAbdomenRightMaterial.magFilter = THREE.NearestFilter
cowAbdomenTopMaterial.magFilter = THREE.NearestFilter
cowAbdomenBottomMaterial.magFilter = THREE.NearestFilter

const head_geometry = new THREE.BoxGeometry(0.375, 0.5, 0.5)
const head_material = [
    new THREE.MeshStandardMaterial({ map: cowHeadFrontMaterial }),
    new THREE.MeshStandardMaterial({ map: cowHeadBackMaterial }),
    new THREE.MeshStandardMaterial({ map: cowHeadTopMaterial }),
    new THREE.MeshStandardMaterial({ map: cowHeadBottomMaterial }),
    new THREE.MeshStandardMaterial({ map: cowHeadLeftMaterial }),
    new THREE.MeshStandardMaterial({ map: cowHeadRightMaterial }),
]

const leg_geometry = new THREE.BoxGeometry(0.25, 0.75, 0.25)
const leg_material = [
    new THREE.MeshStandardMaterial({ map: cowLegFrontMaterial }),
    new THREE.MeshStandardMaterial({ map: cowLegBackMaterial }),
    new THREE.MeshStandardMaterial({ map: cowLegTopMaterial }),
    new THREE.MeshStandardMaterial({ map: cowLegBottomMaterial }),
    new THREE.MeshStandardMaterial({ map: cowLegLeftMaterial }),
    new THREE.MeshStandardMaterial({ map: cowLegRightMaterial }),
]

const ear_geometry = new THREE.BoxGeometry(0.0625, 0.1875, 0.0625)
const ear_material = [
    new THREE.MeshStandardMaterial({ map: cowEarFrontMaterial }),
    new THREE.MeshStandardMaterial({ map: cowEarBackMaterial }),
    new THREE.MeshStandardMaterial({ map: cowEarTopMaterial }),
    new THREE.MeshStandardMaterial({ map: cowEarBottomMaterial }),
    new THREE.MeshStandardMaterial({ map: cowEarLeftMaterial }),
    new THREE.MeshStandardMaterial({ map: cowEarRightMaterial }),
]

const body_geometry = new THREE.BoxGeometry(0.625, 1.125, 0.75)
const body_material = [
    new THREE.MeshStandardMaterial({ map: cowBodyFrontMaterial }),
    new THREE.MeshStandardMaterial({ map: cowBodyBackMaterial }),
    new THREE.MeshStandardMaterial({ map: cowBodyTopMaterial }),
    new THREE.MeshStandardMaterial({ map: cowBodyBottomMaterial }),
    new THREE.MeshStandardMaterial({ map: cowBodyLeftMaterial }),
    new THREE.MeshStandardMaterial({ map: cowBodyRightMaterial }),
]

const abdomen_geometry = new THREE.BoxGeometry(0.0625, 0.375, 0.25)
const abdomen_material = [
    new THREE.MeshStandardMaterial({ map: cowAbdomenFrontMaterial }),
    new THREE.MeshStandardMaterial({ 
        map: cowAbdomenBackMaterial,
        alphaMap: cowAbdomenBackAlphaMaterial,
        transparent: true,
        opacity: 1,
    }),
    new THREE.MeshStandardMaterial({ map: cowAbdomenTopMaterial }),
    new THREE.MeshStandardMaterial({ map: cowAbdomenBottomMaterial }),
    new THREE.MeshStandardMaterial({ map: cowAbdomenLeftMaterial }),
    new THREE.MeshStandardMaterial({ map: cowAbdomenRightMaterial }),
]

export const createCow = () => {
    const cow = new THREE.Group()
    const head = new THREE.Mesh(head_geometry, head_material)
    const left_ear = new THREE.Mesh(ear_geometry, ear_material)
    left_ear.position.set(0.03125, 0.21875, -0.28125)
    const right_ear = new THREE.Mesh(ear_geometry, ear_material)
    right_ear.position.set(0.03125, 0.21875, 0.28125)
    head.add(left_ear, right_ear)
    head.position.set(0.6875, 1.25, 0)
    const body = new THREE.Mesh(body_geometry, body_material)
    const abdomen = new THREE.Mesh(abdomen_geometry, abdomen_material)
    abdomen.position.set(0.34375, -0.375, 0)
    body.add(abdomen)
    body.position.set(-0.0625, 1.0625, 0)
    body.rotation.set(0, 0, -Math.PI / 2)
    const left_front_leg = new THREE.Mesh(leg_geometry, leg_material)
    left_front_leg.position.set(0.375, 0.375, -0.25)
    const left_back_leg = new THREE.Mesh(leg_geometry, leg_material)
    left_back_leg.position.set(-0.4375, 0.375, -0.25)
    const right_front_leg = new THREE.Mesh(leg_geometry, leg_material)
    right_front_leg.position.set(0.375, 0.375, 0.25)
    const right_back_leg = new THREE.Mesh(leg_geometry, leg_material)
    right_back_leg.position.set(-0.4375, 0.375, 0.25)
    cow.add(head, body, left_front_leg, left_back_leg, right_front_leg, right_back_leg)
    return cow
}

export const cowOffset: THREE.Vector3 = new THREE.Vector3(0, 0.7, 0)
export const cowSize: THREE.Vector3 = new THREE.Vector3(0.7, 1.4, 0.7)