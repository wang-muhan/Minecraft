import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js'

export default class Core {
  constructor() {
    this.camera = new THREE.PerspectiveCamera()
    this.renderer = new THREE.WebGLRenderer()
    this.scene = new THREE.Scene()
    this.initScene()
    this.initRenderer()
    this.initCamera()
    this.composer = new EffectComposer(this.renderer)
    this.initComposer()
  }
  

  camera: THREE.PerspectiveCamera
  scene: THREE.Scene
  renderer: THREE.WebGLRenderer
  composer: EffectComposer
  bokehPass: BokehPass

  initCamera = () => {
    this.camera.fov = 50
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.near = 0.01
    this.camera.far = 500
    this.camera.updateProjectionMatrix()
    this.camera.position.set(8, 60, 8)

    this.camera.lookAt(100, 30, 100)
    
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
    })
  }

  initScene = () => {
    this.scene = new THREE.Scene()
  }

  initRenderer = () => {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.VSMShadowMap
    document.body.appendChild(this.renderer.domElement)

    window.addEventListener('resize', () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    })
  }

  initComposer = () => {
    const renderPass = new RenderPass(this.scene, this.camera)
    this.composer.addPass(renderPass)
    this.bokehPass = new BokehPass(this.scene, this.camera, {
      focus: 1.0,
      aperture: 0.005,
      maxblur: 0.00,
      width: window.innerWidth,
      height: window.innerHeight
    })
    this.composer.addPass(this.bokehPass)
    // this.bokehPass.uniforms['focus'].value = 50.0
    window.addEventListener('resize', () => {
      this.bokehPass.uniforms['width'].value = window.innerWidth
      this.bokehPass.uniforms['height'].value = window.innerHeight
    })
  }
}
