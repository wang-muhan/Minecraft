import * as THREE from 'three'

let loader = new THREE.TextureLoader()
import creeper_head_front from '../../static/textures/entity/creeper/creeper_head_front.png'
import creeper_head_back from '../../static/textures/entity/creeper/creeper_head_back.png'
import creeper_head_left from '../../static/textures/entity/creeper/creeper_head_left.png'
import creeper_head_right from '../../static/textures/entity/creeper/creeper_head_right.png'
import creeper_head_top from '../../static/textures/entity/creeper/creeper_head_top.png'
import creeper_head_bottom from '../../static/textures/entity/creeper/creeper_head_bottom.png'
import creeper_body_front from '../../static/textures/entity/creeper/creeper_body_front.png'
import creeper_body_back from '../../static/textures/entity/creeper/creeper_body_back.png'
import creeper_body_left from '../../static/textures/entity/creeper/creeper_body_left.png'
import creeper_body_right from '../../static/textures/entity/creeper/creeper_body_right.png'
import creeper_body_top from '../../static/textures/entity/creeper/creeper_body_top.png'
import creeper_body_bottom from '../../static/textures/entity/creeper/creeper_body_bottom.png'
import creeper_leg_front from '../../static/textures/entity/creeper/creeper_leg_front.png'
import creeper_leg_back from '../../static/textures/entity/creeper/creeper_leg_back.png'
import creeper_leg_left from '../../static/textures/entity/creeper/creeper_leg_left.png'
import creeper_leg_right from '../../static/textures/entity/creeper/creeper_leg_right.png'
import creeper_leg_top from '../../static/textures/entity/creeper/creeper_leg_top.png'
import creeper_leg_bottom from '../../static/textures/entity/creeper/creeper_leg_bottom.png'

const creeperHeadFrontMaterial = loader.load(creeper_head_front)
const creeperHeadBackMaterial = loader.load(creeper_head_back)
const creeperHeadLeftMaterial = loader.load(creeper_head_left)
const creeperHeadRightMaterial = loader.load(creeper_head_right)
const creeperHeadTopMaterial = loader.load(creeper_head_top)
const creeperHeadBottomMaterial = loader.load(creeper_head_bottom)
const creeperBodyFrontMaterial = loader.load(creeper_body_front)
const creeperBodyBackMaterial = loader.load(creeper_body_back)
const creeperBodyLeftMaterial = loader.load(creeper_body_left)
const creeperBodyRightMaterial = loader.load(creeper_body_right)
const creeperBodyTopMaterial = loader.load(creeper_body_top)
const creeperBodyBottomMaterial = loader.load(creeper_body_bottom)
const creeperLegFrontMaterial = loader.load(creeper_leg_front)
const creeperLegBackMaterial = loader.load(creeper_leg_back)
const creeperLegLeftMaterial = loader.load(creeper_leg_left)
const creeperLegRightMaterial = loader.load(creeper_leg_right)
const creeperLegTopMaterial = loader.load(creeper_leg_top)
const creeperLegBottomMaterial = loader.load(creeper_leg_bottom)

creeperHeadFrontMaterial.magFilter = THREE.NearestFilter
creeperHeadBackMaterial.magFilter = THREE.NearestFilter
creeperHeadLeftMaterial.magFilter = THREE.NearestFilter
creeperHeadRightMaterial.magFilter = THREE.NearestFilter
creeperHeadTopMaterial.magFilter = THREE.NearestFilter
creeperHeadBottomMaterial.magFilter = THREE.NearestFilter
creeperBodyFrontMaterial.magFilter = THREE.NearestFilter
creeperBodyBackMaterial.magFilter = THREE.NearestFilter
creeperBodyLeftMaterial.magFilter = THREE.NearestFilter
creeperBodyRightMaterial.magFilter = THREE.NearestFilter
creeperBodyTopMaterial.magFilter = THREE.NearestFilter
creeperBodyBottomMaterial.magFilter = THREE.NearestFilter
creeperLegFrontMaterial.magFilter = THREE.NearestFilter
creeperLegBackMaterial.magFilter = THREE.NearestFilter
creeperLegLeftMaterial.magFilter = THREE.NearestFilter
creeperLegRightMaterial.magFilter = THREE.NearestFilter
creeperLegTopMaterial.magFilter = THREE.NearestFilter
creeperLegBottomMaterial.magFilter = THREE.NearestFilter

const head_geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
const head_materials = [
    new THREE.MeshStandardMaterial({ map: creeperHeadFrontMaterial }),
    new THREE.MeshStandardMaterial({ map: creeperHeadBackMaterial }),
    new THREE.MeshStandardMaterial({ map: creeperHeadTopMaterial }),
    new THREE.MeshStandardMaterial({ map: creeperHeadBottomMaterial }),
    new THREE.MeshStandardMaterial({ map: creeperHeadLeftMaterial }),
    new THREE.MeshStandardMaterial({ map: creeperHeadRightMaterial }),
]

const body_geometry = new THREE.BoxGeometry(0.25, 0.75, 0.5)
const body_materials = [
    new THREE.MeshStandardMaterial({ map: creeperBodyFrontMaterial }),
    new THREE.MeshStandardMaterial({ map: creeperBodyBackMaterial }),
    new THREE.MeshStandardMaterial({ map: creeperBodyTopMaterial }),
    new THREE.MeshStandardMaterial({ map: creeperBodyBottomMaterial }),
    new THREE.MeshStandardMaterial({ map: creeperBodyLeftMaterial }),
    new THREE.MeshStandardMaterial({ map: creeperBodyRightMaterial }),
]

const leg_geometry = new THREE.BoxGeometry(0.25, 0.375, 0.25)
const leg_materials = [
    new THREE.MeshStandardMaterial({ map: creeperLegFrontMaterial }),
    new THREE.MeshStandardMaterial({ map: creeperLegBackMaterial }),
    new THREE.MeshStandardMaterial({ map: creeperLegTopMaterial }),
    new THREE.MeshStandardMaterial({ map: creeperLegBottomMaterial }),
    new THREE.MeshStandardMaterial({ map: creeperLegLeftMaterial }),
    new THREE.MeshStandardMaterial({ map: creeperLegRightMaterial }),
]

export const createCreeper = () => {
    const creeper = new THREE.Group()
    const head = new THREE.Mesh(head_geometry, head_materials)
    head.position.set(0, 1.375, 0)
    const body = new THREE.Mesh(body_geometry, body_materials)
    body.position.set(0, 0.75, 0)
    const leg1 = new THREE.Mesh(leg_geometry, leg_materials)
    leg1.position.set(0.25, 0.1875, 0.125)
    const leg2 = new THREE.Mesh(leg_geometry, leg_materials)
    leg2.position.set(-0.25, 0.1875, 0.125)
    const leg3 = new THREE.Mesh(leg_geometry, leg_materials)
    leg3.position.set(0.25, 0.1875, -0.125)
    const leg4 = new THREE.Mesh(leg_geometry, leg_materials)
    leg4.position.set(-0.25, 0.1875, -0.125)
    creeper.add(head, body, leg1, leg2, leg3, leg4)
    return creeper
}

export const creeperOffset: THREE.Vector3 = new THREE.Vector3(0, 0.85, 0)
export const creeperSize: THREE.Vector3 = new THREE.Vector3(0.6, 1.7, 0.6)