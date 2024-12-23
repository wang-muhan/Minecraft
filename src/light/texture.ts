import * as THREE from 'three'

let loader = new THREE.TextureLoader()
import sun from '../static/textures/environment/sun.png'
import moon1 from '../static/textures/environment/moon_1.png'
import moon2 from '../static/textures/environment/moon_2.png'
import moon3 from '../static/textures/environment/moon_3.png'
import moon4 from '../static/textures/environment/moon_4.png'
import moon5 from '../static/textures/environment/moon_5.png'
import moon6 from '../static/textures/environment/moon_6.png'
import moon7 from '../static/textures/environment/moon_7.png'
import moon8 from '../static/textures/environment/moon_8.png'
import lightmap from '../static/textures/environment/lightmap.png'

const sunTexture = loader.load(sun)
const moon1Texture = loader.load(moon1)
const moon2Texture = loader.load(moon2)
const moon3Texture = loader.load(moon3)
const moon4Texture = loader.load(moon4)
const moon5Texture = loader.load(moon5)
const moon6Texture = loader.load(moon6)
const moon7Texture = loader.load(moon7)
const moon8Texture = loader.load(moon8)
const lightmapTexture = loader.load(lightmap)

sunTexture.magFilter = THREE.NearestFilter
moon1Texture.magFilter = THREE.NearestFilter
moon2Texture.magFilter = THREE.NearestFilter
moon3Texture.magFilter = THREE.NearestFilter
moon4Texture.magFilter = THREE.NearestFilter
moon5Texture.magFilter = THREE.NearestFilter
moon6Texture.magFilter = THREE.NearestFilter
moon7Texture.magFilter = THREE.NearestFilter
moon8Texture.magFilter = THREE.NearestFilter
lightmapTexture.magFilter = THREE.NearestFilter

const sunMaterial = new THREE.MeshStandardMaterial({ 
    map: sunTexture,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
})

const moon1Material = new THREE.MeshStandardMaterial({
    map: moon1Texture,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending
})

const moon2Material = new THREE.MeshStandardMaterial({
    map: moon2Texture,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending
})

const moon3Material = new THREE.MeshStandardMaterial({
    map: moon3Texture,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending
})

const moon4Material = new THREE.MeshStandardMaterial({
    map: moon4Texture,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending
})

const moon5Material = new THREE.MeshStandardMaterial({
    map: moon5Texture,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending
})

const moon6Material = new THREE.MeshStandardMaterial({
    map: moon6Texture,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending
})

const moon7Material = new THREE.MeshStandardMaterial({
    map: moon7Texture,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending
})

const moon8Material = new THREE.MeshStandardMaterial({
    map: moon8Texture,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending
})

const moonMaterials = [ moon1Material, moon2Material, moon3Material, moon4Material, moon5Material, moon6Material, moon7Material, moon8Material ]


const sunMoonGeometry = new THREE.PlaneGeometry(128, 128)
export { sunMaterial, moonMaterials, sunMoonGeometry }