import Core from './core'
import Control from './control'
import Player from './player'
import Terrain from './terrain'
import UI from './ui'
import Audio from './audio'

import './style.css'

// import { SSREffect } from "screen-space-reflections"
// import * as POSTPROCESSING from "postprocessing"

import { EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer";
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass";
import {SSRPass} from "three/examples/jsm/postprocessing/SSRPass";
import {Reflector} from "three/examples/jsm/objects/Reflector";

const core = new Core()
const camera = core.camera
const scene = core.scene
const renderer = core.renderer

const player = new Player()
const audio = new Audio(camera)

const terrain = new Terrain(scene, camera)
const control = new Control(scene, camera, player, terrain, audio)

const ui = new UI(terrain, control)

// const composer = new POSTPROCESSING.EffectComposer(renderer)
//
// const ssrEffect = new SSREffect(scene, camera)
//
// const ssrPass = new POSTPROCESSING.EffectPass(camera, ssrEffect)

// composer.addPass(ssrPass)

const composer = new EffectComposer(renderer)
// const reflector = new Reflector(renderer, camera)
const ssrpass = new SSRPass({renderer: renderer, scene: scene, camera: camera, groundReflector:null, selects:null})
composer.addPass(ssrpass)

// animation
;(function animate() {
  // let p1 = performance.now()
  requestAnimationFrame(animate)

  control.update()
  terrain.update()
  ui.update()

  // renderer.render(scene, camera)
  // console.log(performance.now()-p1)
  composer.render()
})()
