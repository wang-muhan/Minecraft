import * as THREE from 'three'

let loader = new THREE.TextureLoader()
import spider_head_front from '../../static/textures/entity/spider/spider_head_front.png'
import spider_head_back from '../../static/textures/entity/spider/spider_head_back.png'
import spider_head_left from '../../static/textures/entity/spider/spider_head_left.png'
import spider_head_right from '../../static/textures/entity/spider/spider_head_right.png'
import spider_head_top from '../../static/textures/entity/spider/spider_head_top.png'
import spider_head_bottom from '../../static/textures/entity/spider/spider_head_bottom.png'
import spider_leg_front from '../../static/textures/entity/spider/spider_leg_front.png'
import spider_leg_back from '../../static/textures/entity/spider/spider_leg_back.png'
import spider_leg_left from '../../static/textures/entity/spider/spider_leg_left.png'
import spider_leg_right from '../../static/textures/entity/spider/spider_leg_right.png'
import spider_leg_top from '../../static/textures/entity/spider/spider_leg_top.png'
import spider_leg_bottom from '../../static/textures/entity/spider/spider_leg_bottom.png'
import spider_chest_front from '../../static/textures/entity/spider/spider_chest_front.png'
import spider_chest_back from '../../static/textures/entity/spider/spider_chest_back.png'
import spider_chest_left from '../../static/textures/entity/spider/spider_chest_left.png'
import spider_chest_right from '../../static/textures/entity/spider/spider_chest_right.png'
import spider_chest_top from '../../static/textures/entity/spider/spider_chest_top.png'
import spider_chest_bottom from '../../static/textures/entity/spider/spider_chest_bottom.png'
import spider_abdomen_front from '../../static/textures/entity/spider/spider_abdomen_front.png'
import spider_abdomen_back from '../../static/textures/entity/spider/spider_abdomen_back.png'
import spider_abdomen_left from '../../static/textures/entity/spider/spider_abdomen_left.png'
import spider_abdomen_right from '../../static/textures/entity/spider/spider_abdomen_right.png'
import spider_abdomen_top from '../../static/textures/entity/spider/spider_abdomen_top.png'
import spider_abdomen_bottom from '../../static/textures/entity/spider/spider_abdomen_bottom.png'

const spiderHeadFrontMaterial = loader.load(spider_head_front)
const spiderHeadBackMaterial = loader.load(spider_head_back)
const spiderHeadLeftMaterial = loader.load(spider_head_left)
const spiderHeadRightMaterial = loader.load(spider_head_right)
const spiderHeadTopMaterial = loader.load(spider_head_top)
const spiderHeadBottomMaterial = loader.load(spider_head_bottom)
const spiderLegFrontMaterial = loader.load(spider_leg_front)
const spiderLegBackMaterial = loader.load(spider_leg_back)
const spiderLegLeftMaterial = loader.load(spider_leg_left)
const spiderLegRightMaterial = loader.load(spider_leg_right)
const spiderLegTopMaterial = loader.load(spider_leg_top)
const spiderLegBottomMaterial = loader.load(spider_leg_bottom)
const spiderChestFrontMaterial = loader.load(spider_chest_front)
const spiderChestBackMaterial = loader.load(spider_chest_back)
const spiderChestLeftMaterial = loader.load(spider_chest_left)
const spiderChestRightMaterial = loader.load(spider_chest_right)
const spiderChestTopMaterial = loader.load(spider_chest_top)
const spiderChestBottomMaterial = loader.load(spider_chest_bottom)
const spiderAbdomenFrontMaterial = loader.load(spider_abdomen_front)
const spiderAbdomenBackMaterial = loader.load(spider_abdomen_back)
const spiderAbdomenLeftMaterial = loader.load(spider_abdomen_left)
const spiderAbdomenRightMaterial = loader.load(spider_abdomen_right)
const spiderAbdomenTopMaterial = loader.load(spider_abdomen_top)
const spiderAbdomenBottomMaterial = loader.load(spider_abdomen_bottom)

spiderHeadFrontMaterial.magFilter = THREE.NearestFilter
spiderHeadBackMaterial.magFilter = THREE.NearestFilter
spiderHeadLeftMaterial.magFilter = THREE.NearestFilter
spiderHeadRightMaterial.magFilter = THREE.NearestFilter
spiderHeadTopMaterial.magFilter = THREE.NearestFilter
spiderHeadBottomMaterial.magFilter = THREE.NearestFilter
spiderLegFrontMaterial.magFilter = THREE.NearestFilter
spiderLegBackMaterial.magFilter = THREE.NearestFilter
spiderLegLeftMaterial.magFilter = THREE.NearestFilter
spiderLegRightMaterial.magFilter = THREE.NearestFilter
spiderLegTopMaterial.magFilter = THREE.NearestFilter
spiderLegBottomMaterial.magFilter = THREE.NearestFilter
spiderChestFrontMaterial.magFilter = THREE.NearestFilter
spiderChestBackMaterial.magFilter = THREE.NearestFilter
spiderChestLeftMaterial.magFilter = THREE.NearestFilter
spiderChestRightMaterial.magFilter = THREE.NearestFilter
spiderChestTopMaterial.magFilter = THREE.NearestFilter
spiderChestBottomMaterial.magFilter = THREE.NearestFilter
spiderAbdomenFrontMaterial.magFilter = THREE.NearestFilter
spiderAbdomenBackMaterial.magFilter = THREE.NearestFilter
spiderAbdomenLeftMaterial.magFilter = THREE.NearestFilter
spiderAbdomenRightMaterial.magFilter = THREE.NearestFilter
spiderAbdomenTopMaterial.magFilter = THREE.NearestFilter
spiderAbdomenBottomMaterial.magFilter = THREE.NearestFilter

const head_geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
const head_materials = [
    new THREE.MeshStandardMaterial({ map: spiderHeadFrontMaterial }),
    new THREE.MeshStandardMaterial({ map: spiderHeadBackMaterial }),
    new THREE.MeshStandardMaterial({ map: spiderHeadTopMaterial }),
    new THREE.MeshStandardMaterial({ map: spiderHeadBottomMaterial }),
    new THREE.MeshStandardMaterial({ map: spiderHeadLeftMaterial }),
    new THREE.MeshStandardMaterial({ map: spiderHeadRightMaterial }),
]

const leg_geometry = new THREE.BoxGeometry(0.125, 0.125, 1)
const leg_materials = [
    new THREE.MeshStandardMaterial({ map: spiderLegFrontMaterial }),
    new THREE.MeshStandardMaterial({ map: spiderLegBackMaterial }),
    new THREE.MeshStandardMaterial({ map: spiderLegTopMaterial }),
    new THREE.MeshStandardMaterial({ map: spiderLegBottomMaterial }),
    new THREE.MeshStandardMaterial({ map: spiderLegLeftMaterial }),
    new THREE.MeshStandardMaterial({ map: spiderLegRightMaterial }),
]

const chest_geometry = new THREE.BoxGeometry(0.375, 0.375, 0.375)   
const chest_materials = [
    new THREE.MeshStandardMaterial({ map: spiderChestFrontMaterial }),
    new THREE.MeshStandardMaterial({ map: spiderChestBackMaterial }),
    new THREE.MeshStandardMaterial({ map: spiderChestTopMaterial }),
    new THREE.MeshStandardMaterial({ map: spiderChestBottomMaterial }),
    new THREE.MeshStandardMaterial({ map: spiderChestLeftMaterial }),
    new THREE.MeshStandardMaterial({ map: spiderChestRightMaterial }),
]

const abdomen_geometry = new THREE.BoxGeometry(0.75, 0.5, 0.625)
const abdomen_materials = [
    new THREE.MeshStandardMaterial({ map: spiderAbdomenFrontMaterial }),
    new THREE.MeshStandardMaterial({ map: spiderAbdomenBackMaterial }),
    new THREE.MeshStandardMaterial({ map: spiderAbdomenTopMaterial }),
    new THREE.MeshStandardMaterial({ map: spiderAbdomenBottomMaterial }),
    new THREE.MeshStandardMaterial({ map: spiderAbdomenLeftMaterial }),
    new THREE.MeshStandardMaterial({ map: spiderAbdomenRightMaterial }),
]

export const createSpider = () => {
    const spider = new THREE.Group()
    const head = new THREE.Mesh(head_geometry, head_materials)
    head.castShadow = true
    head.receiveShadow = true
    head.position.set(0.4375, 0.5, 0)
    const chest = new THREE.Mesh(chest_geometry, chest_materials)
    chest.castShadow = true
    chest.receiveShadow = true
    chest.position.set(0, 0.5, 0)
    const abdomen = new THREE.Mesh(abdomen_geometry, abdomen_materials)
    abdomen.castShadow = true
    abdomen.receiveShadow = true
    abdomen.position.set(-0.5625, 0.5, 0)
    const left_leg_1 = new THREE.Mesh(leg_geometry, leg_materials)
    left_leg_1.castShadow = true
    left_leg_1.receiveShadow = true
    left_leg_1.position.set(0.3125, 0.375, -0.4040)
    left_leg_1.rotation.set(-Math.PI / 6, -Math.PI / 3, 0)
    left_leg_1.scale.set(1, 1, -1)
    const left_leg_2 = new THREE.Mesh(leg_geometry, leg_materials)
    left_leg_2.castShadow = true
    left_leg_2.receiveShadow = true
    left_leg_2.position.set(0.154, 0.375, -0.5625)
    left_leg_2.rotation.set(-Math.PI / 6, -Math.PI / 6, 0)
    left_leg_2.scale.set(1, 1, -1)
    const left_leg_3 = new THREE.Mesh(leg_geometry, leg_materials)
    left_leg_3.castShadow = true
    left_leg_3.receiveShadow = true
    left_leg_3.position.set(-0.279, 0.375, -0.5625)
    left_leg_3.rotation.set(-Math.PI / 6, Math.PI / 6, 0)
    left_leg_3.scale.set(1, 1, -1)
    const left_leg_4 = new THREE.Mesh(leg_geometry, leg_materials)
    left_leg_4.castShadow = true
    left_leg_4.receiveShadow = true
    left_leg_4.position.set(-0.4375, 0.375, -0.4040)
    left_leg_4.rotation.set(-Math.PI / 6, Math.PI / 3, 0)
    left_leg_4.scale.set(1, 1, -1)
    const right_leg_1 = new THREE.Mesh(leg_geometry, leg_materials)
    right_leg_1.castShadow = true
    right_leg_1.receiveShadow = true
    right_leg_1.position.set(0.3125, 0.375, 0.4040)
    right_leg_1.rotation.set(Math.PI / 6, Math.PI / 3, 0)
    const right_leg_2 = new THREE.Mesh(leg_geometry, leg_materials)
    right_leg_2.castShadow = true
    right_leg_2.receiveShadow = true
    right_leg_2.position.set(0.154, 0.375, 0.5625)
    right_leg_2.rotation.set(Math.PI / 6, Math.PI / 6, 0)
    const right_leg_3 = new THREE.Mesh(leg_geometry, leg_materials)
    right_leg_3.castShadow = true
    right_leg_3.receiveShadow = true
    right_leg_3.position.set(-0.279, 0.375, 0.5625)
    right_leg_3.rotation.set(Math.PI / 6, -Math.PI / 6, 0)
    const right_leg_4 = new THREE.Mesh(leg_geometry, leg_materials)
    right_leg_4.castShadow = true
    right_leg_4.receiveShadow = true
    right_leg_4.position.set(-0.4375, 0.375, 0.4040)
    right_leg_4.rotation.set(Math.PI / 6, -Math.PI / 3, 0)
    spider.add(head, chest, abdomen, left_leg_1, left_leg_2, left_leg_3, left_leg_4, right_leg_1, right_leg_2, right_leg_3, right_leg_4)
    return spider
}

export const spiderOffset: THREE.Vector3 = new THREE.Vector3(0, 0.45, 0)
export const spiderSize: THREE.Vector3 = new THREE.Vector3(1.4, 0.9, 1.4)