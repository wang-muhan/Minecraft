import * as THREE from 'three'

let loader = new THREE.TextureLoader()
import sheep_head_front from '../../static/textures/entity/sheep/sheep_head_front.png'
import sheep_head_back from '../../static/textures/entity/sheep/sheep_head_back.png'
import sheep_head_left from '../../static/textures/entity/sheep/sheep_head_left.png'
import sheep_head_right from '../../static/textures/entity/sheep/sheep_head_right.png'
import sheep_head_top from '../../static/textures/entity/sheep/sheep_head_top.png'
import sheep_head_bottom from '../../static/textures/entity/sheep/sheep_head_bottom.png'
import sheep_leg_front from '../../static/textures/entity/sheep/sheep_leg_front.png'
import sheep_leg_back from '../../static/textures/entity/sheep/sheep_leg_back.png'
import sheep_leg_left from '../../static/textures/entity/sheep/sheep_leg_left.png'
import sheep_leg_right from '../../static/textures/entity/sheep/sheep_leg_right.png'
import sheep_leg_top from '../../static/textures/entity/sheep/sheep_leg_top.png'
import sheep_leg_bottom from '../../static/textures/entity/sheep/sheep_leg_bottom.png'
import sheep_body_front from '../../static/textures/entity/sheep/sheep_body_front.png'
import sheep_body_back from '../../static/textures/entity/sheep/sheep_body_back.png'
import sheep_body_left from '../../static/textures/entity/sheep/sheep_body_left.png'
import sheep_body_right from '../../static/textures/entity/sheep/sheep_body_right.png'
import sheep_body_top from '../../static/textures/entity/sheep/sheep_body_top.png'
import sheep_body_bottom from '../../static/textures/entity/sheep/sheep_body_bottom.png'
import sheep_fur_head_front from '../../static/textures/entity/sheep/sheep_fur_head_front.png'
import sheep_fur_head_back from '../../static/textures/entity/sheep/sheep_fur_head_back.png'
import sheep_fur_head_left from '../../static/textures/entity/sheep/sheep_fur_head_left.png'
import sheep_fur_head_right from '../../static/textures/entity/sheep/sheep_fur_head_right.png'
import sheep_fur_head_top from '../../static/textures/entity/sheep/sheep_fur_head_top.png'
import sheep_fur_head_bottom from '../../static/textures/entity/sheep/sheep_fur_head_bottom.png'
import sheep_fur_leg_front from '../../static/textures/entity/sheep/sheep_fur_leg_front.png'
import sheep_fur_leg_back from '../../static/textures/entity/sheep/sheep_fur_leg_back.png'
import sheep_fur_leg_left from '../../static/textures/entity/sheep/sheep_fur_leg_left.png'
import sheep_fur_leg_right from '../../static/textures/entity/sheep/sheep_fur_leg_right.png'
import sheep_fur_leg_top from '../../static/textures/entity/sheep/sheep_fur_leg_top.png'
import sheep_fur_leg_bottom from '../../static/textures/entity/sheep/sheep_fur_leg_bottom.png'
import sheep_fur_body_front from '../../static/textures/entity/sheep/sheep_fur_body_front.png'
import sheep_fur_body_back from '../../static/textures/entity/sheep/sheep_fur_body_back.png'
import sheep_fur_body_left from '../../static/textures/entity/sheep/sheep_fur_body_left.png'
import sheep_fur_body_right from '../../static/textures/entity/sheep/sheep_fur_body_right.png'
import sheep_fur_body_top from '../../static/textures/entity/sheep/sheep_fur_body_top.png'
import sheep_fur_body_bottom from '../../static/textures/entity/sheep/sheep_fur_body_bottom.png'

const sheepHeadFrontMaterial = loader.load(sheep_head_front)
const sheepHeadBackMaterial = loader.load(sheep_head_back)
const sheepHeadLeftMaterial = loader.load(sheep_head_left)
const sheepHeadRightMaterial = loader.load(sheep_head_right)
const sheepHeadTopMaterial = loader.load(sheep_head_top)
const sheepHeadBottomMaterial = loader.load(sheep_head_bottom)
const sheepLegFrontMaterial = loader.load(sheep_leg_front)
const sheepLegBackMaterial = loader.load(sheep_leg_back)
const sheepLegLeftMaterial = loader.load(sheep_leg_left)
const sheepLegRightMaterial = loader.load(sheep_leg_right)
const sheepLegTopMaterial = loader.load(sheep_leg_top)
const sheepLegBottomMaterial = loader.load(sheep_leg_bottom)
const sheepBodyFrontMaterial = loader.load(sheep_body_front)
const sheepBodyBackMaterial = loader.load(sheep_body_back)
const sheepBodyLeftMaterial = loader.load(sheep_body_left)
const sheepBodyRightMaterial = loader.load(sheep_body_right)
const sheepBodyTopMaterial = loader.load(sheep_body_top)
const sheepBodyBottomMaterial = loader.load(sheep_body_bottom)
const sheepFurHeadFrontMaterial = loader.load(sheep_fur_head_front)
const sheepFurHeadBackMaterial = loader.load(sheep_fur_head_back)
const sheepFurHeadLeftMaterial = loader.load(sheep_fur_head_left)
const sheepFurHeadRightMaterial = loader.load(sheep_fur_head_right)
const sheepFurHeadTopMaterial = loader.load(sheep_fur_head_top)
const sheepFurHeadBottomMaterial = loader.load(sheep_fur_head_bottom)
const sheepFurLegFrontMaterial = loader.load(sheep_fur_leg_front)
const sheepFurLegBackMaterial = loader.load(sheep_fur_leg_back)
const sheepFurLegLeftMaterial = loader.load(sheep_fur_leg_left)
const sheepFurLegRightMaterial = loader.load(sheep_fur_leg_right)
const sheepFurLegTopMaterial = loader.load(sheep_fur_leg_top)
const sheepFurLegBottomMaterial = loader.load(sheep_fur_leg_bottom)
const sheepFurBodyFrontMaterial = loader.load(sheep_fur_body_front)
const sheepFurBodyBackMaterial = loader.load(sheep_fur_body_back)
const sheepFurBodyLeftMaterial = loader.load(sheep_fur_body_left)
const sheepFurBodyRightMaterial = loader.load(sheep_fur_body_right)
const sheepFurBodyTopMaterial = loader.load(sheep_fur_body_top)
const sheepFurBodyBottomMaterial = loader.load(sheep_fur_body_bottom)

sheepHeadFrontMaterial.magFilter = THREE.NearestFilter
sheepHeadBackMaterial.magFilter = THREE.NearestFilter
sheepHeadLeftMaterial.magFilter = THREE.NearestFilter
sheepHeadRightMaterial.magFilter = THREE.NearestFilter
sheepHeadTopMaterial.magFilter = THREE.NearestFilter
sheepHeadBottomMaterial.magFilter = THREE.NearestFilter
sheepLegFrontMaterial.magFilter = THREE.NearestFilter
sheepLegBackMaterial.magFilter = THREE.NearestFilter
sheepLegLeftMaterial.magFilter = THREE.NearestFilter
sheepLegRightMaterial.magFilter = THREE.NearestFilter
sheepLegTopMaterial.magFilter = THREE.NearestFilter
sheepLegBottomMaterial.magFilter = THREE.NearestFilter
sheepBodyFrontMaterial.magFilter = THREE.NearestFilter
sheepBodyBackMaterial.magFilter = THREE.NearestFilter
sheepBodyLeftMaterial.magFilter = THREE.NearestFilter
sheepBodyRightMaterial.magFilter = THREE.NearestFilter
sheepBodyTopMaterial.magFilter = THREE.NearestFilter
sheepBodyBottomMaterial.magFilter = THREE.NearestFilter
sheepFurHeadFrontMaterial.magFilter = THREE.NearestFilter
sheepFurHeadBackMaterial.magFilter = THREE.NearestFilter
sheepFurHeadLeftMaterial.magFilter = THREE.NearestFilter
sheepFurHeadRightMaterial.magFilter = THREE.NearestFilter
sheepFurHeadTopMaterial.magFilter = THREE.NearestFilter
sheepFurHeadBottomMaterial.magFilter = THREE.NearestFilter
sheepFurLegFrontMaterial.magFilter = THREE.NearestFilter
sheepFurLegBackMaterial.magFilter = THREE.NearestFilter
sheepFurLegLeftMaterial.magFilter = THREE.NearestFilter
sheepFurLegRightMaterial.magFilter = THREE.NearestFilter
sheepFurLegTopMaterial.magFilter = THREE.NearestFilter
sheepFurLegBottomMaterial.magFilter = THREE.NearestFilter
sheepFurBodyFrontMaterial.magFilter = THREE.NearestFilter
sheepFurBodyBackMaterial.magFilter = THREE.NearestFilter
sheepFurBodyLeftMaterial.magFilter = THREE.NearestFilter
sheepFurBodyRightMaterial.magFilter = THREE.NearestFilter
sheepFurBodyTopMaterial.magFilter = THREE.NearestFilter
sheepFurBodyBottomMaterial.magFilter = THREE.NearestFilter

const head_geometry = new THREE.BoxGeometry(0.5, 0.375, 0.375)
const head_material = [
    new THREE.MeshStandardMaterial({ map: sheepHeadFrontMaterial }),
    new THREE.MeshStandardMaterial({ map: sheepHeadBackMaterial }),
    new THREE.MeshStandardMaterial({ map: sheepHeadTopMaterial }),
    new THREE.MeshStandardMaterial({ map: sheepHeadBottomMaterial }),
    new THREE.MeshStandardMaterial({ map: sheepHeadLeftMaterial }),
    new THREE.MeshStandardMaterial({ map: sheepHeadRightMaterial })
]

const body_geometry = new THREE.BoxGeometry(0.375, 1, 0.5)
const body_material = [
    new THREE.MeshStandardMaterial({ map: sheepBodyFrontMaterial }),
    new THREE.MeshStandardMaterial({ map: sheepBodyBackMaterial }),
    new THREE.MeshStandardMaterial({ map: sheepBodyTopMaterial }),
    new THREE.MeshStandardMaterial({ map: sheepBodyBottomMaterial }),
    new THREE.MeshStandardMaterial({ map: sheepBodyLeftMaterial }),
    new THREE.MeshStandardMaterial({ map: sheepBodyRightMaterial })
]

const leg_geometry = new THREE.BoxGeometry(0.25, 0.75, 0.25)
const leg_material = [
    new THREE.MeshStandardMaterial({ map: sheepLegFrontMaterial }),
    new THREE.MeshStandardMaterial({ map: sheepLegBackMaterial }),
    new THREE.MeshStandardMaterial({ map: sheepLegTopMaterial }),
    new THREE.MeshStandardMaterial({ map: sheepLegBottomMaterial }),
    new THREE.MeshStandardMaterial({ map: sheepLegLeftMaterial }),
    new THREE.MeshStandardMaterial({ map: sheepLegRightMaterial })
]

const fur_head_goemetry = new THREE.BoxGeometry(0.375, 0.375, 0.375)
const fur_head_material = [
    new THREE.MeshStandardMaterial({ map: sheepFurHeadFrontMaterial }),
    new THREE.MeshStandardMaterial({ map: sheepFurHeadBackMaterial }),
    new THREE.MeshStandardMaterial({ map: sheepFurHeadTopMaterial }),
    new THREE.MeshStandardMaterial({ map: sheepFurHeadBottomMaterial }),
    new THREE.MeshStandardMaterial({ map: sheepFurHeadLeftMaterial }),
    new THREE.MeshStandardMaterial({ map: sheepFurHeadRightMaterial })
]

const fur_body_geometry = new THREE.BoxGeometry(0.375, 1, 0.5)
const fur_body_material = [
    new THREE.MeshStandardMaterial({ map: sheepFurBodyFrontMaterial }),
    new THREE.MeshStandardMaterial({ map: sheepFurBodyBackMaterial }),
    new THREE.MeshStandardMaterial({ map: sheepFurBodyTopMaterial }),
    new THREE.MeshStandardMaterial({ map: sheepFurBodyBottomMaterial }),
    new THREE.MeshStandardMaterial({ map: sheepFurBodyLeftMaterial }),
    new THREE.MeshStandardMaterial({ map: sheepFurBodyRightMaterial })
]

const fur_leg_geometry = new THREE.BoxGeometry(0.25, 0.375, 0.25)
const fur_leg_material = [
    new THREE.MeshStandardMaterial({ map: sheepFurLegFrontMaterial }),
    new THREE.MeshStandardMaterial({ map: sheepFurLegBackMaterial }),
    new THREE.MeshStandardMaterial({ map: sheepFurLegTopMaterial }),
    new THREE.MeshStandardMaterial({ map: sheepFurLegBottomMaterial }),
    new THREE.MeshStandardMaterial({ map: sheepFurLegLeftMaterial }),
    new THREE.MeshStandardMaterial({ map: sheepFurLegRightMaterial })
]

export const createSheep = () => {
    const sheep = new THREE.Group()
    const head = new THREE.Mesh(head_geometry, head_material)
    const fur_head = new THREE.Mesh(fur_head_goemetry, fur_head_material)
    fur_head.position.set(-0.0625, 0, 0)
    fur_head.scale.set(1.2, 1.2, 1.2)
    head.add(fur_head)
    head.position.set(0.625, 1.1875, 0)
    const body = new THREE.Mesh(body_geometry, body_material)
    const fur_body = new THREE.Mesh(fur_body_geometry, fur_body_material)
    fur_body.scale.set(1.5, 1.2, 1.5)
    body.add(fur_body)
    body.position.set(0, 0.9375, 0)
    body.rotation.set(0, 0, -Math.PI / 2)
    const left_front_leg = new THREE.Mesh(leg_geometry, leg_material)
    const fur_left_front_leg = new THREE.Mesh(fur_leg_geometry, fur_leg_material)
    fur_left_front_leg.position.set(0, 0.1875, 0)
    fur_left_front_leg.scale.set(1.2, 1.2, 1.2)
    left_front_leg.add(fur_left_front_leg)
    left_front_leg.position.set(0.3125, 0.375, -0.1875)
    const left_back_leg = new THREE.Mesh(leg_geometry, leg_material)
    const fur_left_back_leg = new THREE.Mesh(fur_leg_geometry, fur_leg_material)
    fur_left_back_leg.position.set(0, 0.1875, 0)
    fur_left_back_leg.scale.set(1.2, 1.2, 1.2)
    left_back_leg.add(fur_left_back_leg)
    left_back_leg.position.set(-0.4375, 0.375, -0.1875)
    const right_front_leg = new THREE.Mesh(leg_geometry, leg_material)
    const fur_right_front_leg = new THREE.Mesh(fur_leg_geometry, fur_leg_material)
    fur_right_front_leg.position.set(0, 0.1875, 0)
    fur_right_front_leg.scale.set(1.2, 1.2, 1.2)
    right_front_leg.add(fur_right_front_leg)
    right_front_leg.position.set(0.3125, 0.375, 0.1875)
    const right_back_leg = new THREE.Mesh(leg_geometry, leg_material)
    const fur_right_back_leg = new THREE.Mesh(fur_leg_geometry, fur_leg_material)
    fur_right_back_leg.position.set(0, 0.1875, 0)
    fur_right_back_leg.scale.set(1.2, 1.2, 1.2)
    right_back_leg.add(fur_right_back_leg)
    right_back_leg.position.set(-0.4375, 0.375, 0.1875)
    sheep.add(head, body, left_front_leg, left_back_leg, right_front_leg, right_back_leg)
    return sheep
}

export const sheepOffset: THREE.Vector3 = new THREE.Vector3(0, 0.65, 0)
export const sheepSize: THREE.Vector3 = new THREE.Vector3(0.6, 1.3, 0.6)
