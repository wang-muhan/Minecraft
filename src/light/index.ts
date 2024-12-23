import * as THREE from 'three'

import { sunMaterial, moonMaterials, sunMoonGeometry } from './texture'
import Terrain, { WorldType } from '../terrain'

const dayColor = 0x87ceeb
const nightColor = 0x000000
const netherColor = 0x101010    

export default class Light {
    constructor(camera: THREE.PerspectiveCamera, scene: THREE.Scene, terrian:Terrain) {
        this.camera = camera
        this.scene = scene
        this.terrain = terrian
        this.init_time = performance.now()
        this.sun = new THREE.Mesh(sunMoonGeometry, sunMaterial)
        this.moon = new THREE.Mesh(sunMoonGeometry, moonMaterials[0])
        const reflectionLight = new THREE.AmbientLight(0x404040)
        this.scene.add(reflectionLight)
        this.scene.add(this.sun)
        this.scene.add(this.moon)
        this.sunlight = new THREE.DirectionalLight(0xffffff, 0.6)
        this.sunlight.castShadow = true
        this.sunlight.shadow.mapSize.width = 2048
        this.sunlight.shadow.mapSize.height = 2048
        this.sunlight.shadow.camera.near = 0.5
        this.sunlight.shadow.camera.far = 500
        this.sunlight.shadow.camera.left = -50
        this.sunlight.shadow.camera.right = 50
        this.sunlight.shadow.camera.top = 50
        this.sunlight.shadow.camera.bottom = -50
        this.sunlight.shadow.bias = -0.0001
        this.scene.add(this.sunlight)
        this.moonlight = new THREE.DirectionalLight(0xffffff, 0.2)
        this.moonlight.castShadow = true
        this.moonlight.shadow.mapSize.width = 2048
        this.moonlight.shadow.mapSize.height = 2048
        this.moonlight.shadow.camera.near = 0.5
        this.moonlight.shadow.camera.far = 500
        this.moonlight.shadow.camera.left = -50
        this.moonlight.shadow.camera.right = 50
        this.moonlight.shadow.camera.top = 50
        this.moonlight.shadow.camera.bottom = -50
        this.moonlight.shadow.bias = -0.0001
        this.scene.add(this.moonlight)
        this.moonlight.visible = false
    }
    camera: THREE.PerspectiveCamera
    scene: THREE.Scene
    terrain: Terrain
    sun: THREE.Mesh
    moon: THREE.Mesh    
    sunlight: THREE.DirectionalLight
    moonlight: THREE.DirectionalLight
    init_time: number
    day_time: number = 24 * 10
    background_color = new THREE.Color()
    moon_phase: number = 0
    world_type: WorldType = WorldType.overworld

    update = () => {
        let time = (performance.now() - this.init_time) / 1000 / this.day_time + 0.25
        const moon_phase = Math.floor((time + 7.75) % 8)
        
        if (moon_phase !== this.moon_phase) {
            this.moon.material = moonMaterials[moon_phase]
            this.moon.material.needsUpdate = true
            this.moon_phase = moon_phase
        }
        time = time % 1
        const angle = time * Math.PI * 2 //+ Math.PI/2
        this.sun.position.set(256 * Math.cos(angle), 256 * Math.sin(angle), 0).add(this.camera.position)
        this.sun.lookAt(this.camera.position)
        this.moon.position.set(256 * Math.cos(angle + Math.PI), 256 * Math.sin(angle + Math.PI), 0).add(this.camera.position)
        this.moon.lookAt(this.camera.position)
        // if (this.sunlight.position.distanceTo(this.sun.position) > 1) {
        this.sunlight.position.copy(this.sun.position)
        this.sunlight.target = this.camera
        if (time < 1 / 12) {
            this.background_color.lerpColors(new THREE.Color(nightColor), new THREE.Color(dayColor), time * 6 + 0.5)
        } else if (time < 5 / 12) {
            this.moonlight.visible = false
            this.background_color.set(dayColor)
        } else if (time < 7 / 12) {
            this.moonlight.visible = true
            this.background_color.lerpColors(new THREE.Color(dayColor), new THREE.Color(nightColor), time * 6 - 2.5)
        } else if (time < 11 / 12) {
            this.sunlight.visible = false
            this.background_color.set(nightColor)
        } else {
            this.sunlight.visible = true
            this.background_color.lerpColors(new THREE.Color(nightColor), new THREE.Color(dayColor), time * 6 - 5.5)
        }


        // update world type
        if (this.terrain.worldtype !== this.world_type) {
            this.world_type = this.terrain.worldtype
            if (this.world_type === WorldType.overworld) {
                this.scene.add(this.sunlight)
                this.scene.add(this.moonlight)
                this.scene.add(this.sun)
                this.scene.add(this.moon)
            } else {
                this.scene.remove(this.sunlight)
                this.scene.remove(this.moonlight)
                this.scene.remove(this.sun)
                this.scene.remove(this.moon)
                this.scene.background = new THREE.Color(netherColor)
            }
        }
        if (this.world_type === WorldType.overworld) {
            this.scene.background = this.background_color
        }
    }
}