import Core from './core'
import Control from './control'
import Player from './player'
import Terrain from './terrain'
import Entity from './entity'
import Light from './light'
import UI from './ui'
import Audio from './audio'

import './style.css'

const core = new Core()
const camera = core.camera
const scene = core.scene
const renderer = core.renderer

const player = new Player()
const audio = new Audio(camera)

const terrain = new Terrain(scene, camera, renderer)
const entity = new Entity(scene, camera, terrain, audio)
const light = new Light(camera, scene, terrain)
const control = new Control(scene, camera, player, terrain, audio, entity)

const ui = new UI(terrain, control)

// animation
;(function animate() {
  requestAnimationFrame(animate)

  control.update()
  terrain.update()
  entity.update()
  light.update()
  ui.update()

  renderer.render(scene, camera)
  // composer.render()
})()
