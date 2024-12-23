import FPS from './fps'
import Bag from './bag'
import Terrain, { WorldType } from '../terrain'
import Block from '../terrain/mesh/block'
import Control from '../control'
import Core from '../core'
import Entity from '../entity'
import { Mode } from '../player'
import Joystick from './joystick'
import { isMobile } from '../utils'

export default class UI {
  constructor(terrain: Terrain, control: Control, core: Core, entity: Entity) {
    this.fps = new FPS()
    this.bag = new Bag()
    this.joystick = new Joystick(control)
    this.terrain = terrain
    this.entity_class = entity

    this.crossHair.className = 'cross-hair'
    this.crossHair.innerHTML = '+'
    document.body.appendChild(this.crossHair)

    // play
    this.play?.addEventListener('click', () => {
      if (this.play?.innerHTML === 'Play') {
        this.onPlay()

        // reset game
        terrain.noise.seed = Math.random()
        terrain.noise.stoneSeed = Math.random()
        terrain.noise.treeSeed = Math.random()
        terrain.noise.coalSeed = Math.random()
        terrain.noise.leafSeed = Math.random()
        terrain.customBlocks = []
        terrain.initBlocks()
        terrain.generate()
        terrain.camera.position.y = 40
        control.player.setMode(Mode.walking)
      }
      !isMobile && control.control.lock()
    })

    this.fileInput?.addEventListener('change', (event) => {
      const file = this.fileInput.files?.[0];
      if (!file) return;
    
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const saveData = JSON.parse(e.target?.result as string);
    
          // 初始化游戏数据
          terrain.noise.seed = Number(saveData.seed) ?? Math.random();
    
          const customBlocks = (saveData.block as Block[]) ?? [];
          terrain.customBlocks = customBlocks;
          terrain.initBlocks();
          terrain.generate();
    
          const position = saveData.position ?? null;
          if (position) {
            terrain.camera.position.x = position.x;
            terrain.camera.position.y = position.y;
            terrain.camera.position.z = position.z;
          }
    
          // UI 更新
          this.onPlay();
          this.onLoad();
          !isMobile && control.control.lock();
        } catch (error) {
          console.error('加载文件失败:', error);
        }
      };
    
      reader.readAsText(file);
    });
    

    // save load
    this.save?.addEventListener('click', () => {
      if (this.save?.innerHTML === 'Save and Exit') {
        // save game
        const saveData = {
          block: terrain.customBlocks,
          seed: terrain.noise.seed,
          position: {
            x: terrain.camera.position.x,
            y: terrain.camera.position.y,
            z: terrain.camera.position.z
          }
        }
        window.localStorage.setItem('gameData', JSON.stringify(saveData));
        window.localStorage.setItem(
          'block',
          JSON.stringify(terrain.customBlocks)
        )
        window.localStorage.setItem('seed', JSON.stringify(terrain.noise.seed))

        window.localStorage.setItem(
          'position',
          JSON.stringify({
            x: terrain.camera.position.x,
            y: terrain.camera.position.y,
            z: terrain.camera.position.z
          })
        )

        const blob = new Blob([JSON.stringify(saveData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'gameData.json';
        link.click();

        // 清理 URL 对象
        URL.revokeObjectURL(url);

        // ui update
        this.onExit()
        this.onSave()
      } else {
        this.loads?.classList.remove('hidden')
        // load game
        // terrain.noise.seed =
        //   Number(window.localStorage.getItem('seed')) ?? Math.random()

        // const customBlocks =
        //   (JSON.parse(
        //     window.localStorage.getItem('block') || 'null'
        //   ) as Block[]) ?? []

        // terrain.customBlocks = customBlocks
        // terrain.initBlocks()
        // terrain.generate()

        // const position =
        //   (JSON.parse(window.localStorage.getItem('position') || 'null') as {
        //     x: number
        //     y: number
        //     z: number
        //   }) ?? null

        // position && (terrain.camera.position.x = position.x)
        // position && (terrain.camera.position.y = position.y)
        // position && (terrain.camera.position.z = position.z)
        // // this.fileInput?.click()
        // // ui update
        // this.onPlay()
        // this.onLoad()
        // !isMobile && control.control.lock()
      }
    })

    this.load1?.addEventListener('click', () => {
      this.loads?.classList.add('hidden')
      //  load game
      terrain.noise.seed =
        Number(window.localStorage.getItem('seed')) ?? Math.random()

      const customBlocks =
        (JSON.parse(
          window.localStorage.getItem('block') || 'null'
        ) as Block[]) ?? []

      terrain.customBlocks = customBlocks
      terrain.initBlocks()
      terrain.generate()

      const position =
        (JSON.parse(window.localStorage.getItem('position') || 'null') as {
          x: number
          y: number
          z: number
        }) ?? null

      position && (terrain.camera.position.x = position.x)
      position && (terrain.camera.position.y = position.y)
      position && (terrain.camera.position.z = position.z)
      // this.fileInput?.click()
      // ui update
      this.onPlay()
      this.onLoad()
      !isMobile && control.control.lock()
    })

    this.load2?.addEventListener('click', () => {
      this.loads?.classList.add('hidden')
      this.fileInput?.click()
    })

    this.loadBack?.addEventListener('click', () => {
      this.loads?.classList.add('hidden')
    })

    // guide
    this.feature?.addEventListener('click', () => {
      this.features?.classList.remove('hidden')
    })
    this.back?.addEventListener('click', () => {
      this.features?.classList.add('hidden')
    })

    // setting
    this.setting?.addEventListener('click', () => {
      this.settings?.classList.add('show')
    })
    this.settingBack?.addEventListener('click', () => {
      this.settings?.classList.remove('show')
    })

    // render distance
    this.distanceInput?.addEventListener('input', (e: Event) => {
      if (this.distance && e.target instanceof HTMLInputElement) {
        this.distance.innerHTML = `Render Distance: ${e.target.value}`
      }
    })

    // fov
    this.fovInput?.addEventListener('input', (e: Event) => {
      if (this.fov && e.target instanceof HTMLInputElement) {
        this.fov.innerHTML = `Field of View: ${e.target.value}`
        control.camera.fov = parseInt(e.target.value)
        control.camera.updateProjectionMatrix()
      }
    })

    // focus
    this.focusInput?.addEventListener('input', (e: Event) => {
      if (this.focus && e.target instanceof HTMLInputElement) {
        this.focus.innerHTML = `Focus: ${e.target.value}`
        core.bokehPass.uniforms['focus'].value = parseFloat(e.target.value)
      }
    })

    //aperature
    this.apertureInput?.addEventListener('input', (e: Event) => {
      if (this.aperture && e.target instanceof HTMLInputElement) {
        this.aperture.innerHTML = `Aperture: ${e.target.value}`
        core.bokehPass.uniforms['aperture'].value = parseFloat(e.target.value)
      }
    })  

    //maxblur
    this.maxblurInput?.addEventListener('input', (e: Event) => {
      if (this.maxblur && e.target instanceof HTMLInputElement) {
        this.maxblur.innerHTML = `Maxblur: ${e.target.value}`
        core.bokehPass.uniforms['maxblur'].value = parseFloat(e.target.value)
      }
    })

    // music
    this.musicInput?.addEventListener('input', (e: Event) => {
      if (this.music && e.target instanceof HTMLInputElement) {
        const disabled = e.target.value === '0'
        control.audio.disabled = disabled
        this.music!.innerHTML = `Music: ${disabled ? 'Off' : 'On'}`
      }
    })

    // apply settings
    this.settingBack?.addEventListener('click', () => {
      if (this.distanceInput instanceof HTMLInputElement) {
        terrain.distance = parseInt(this.distanceInput.value)
        terrain.maxCount =
          (terrain.distance * terrain.chunkSize * 2 + terrain.chunkSize) ** 2 +
          500

        terrain.initBlocks()
        terrain.generate()
        // terrain.scene.fog = new THREE.Fog(
        //   0x87ceeb,
        //   1,
        //   terrain.distance * 24 + 24
        // )
      }
    })

    // world  
    this.world?.addEventListener('click', () => {
      this.worlds?.classList.remove('hidden')
    })
    this.worldBack?.addEventListener('click', () => {
      this.worlds?.classList.add('hidden')
    })

    this.worldtype?.addEventListener('click', () => {
      if (this.save?.innerHTML === 'Save and Exit'){
        this.terrain?.changeWorld()
        this.worldtype!.innerHTML = `World Type: ${this.terrain?.worldtype === WorldType.overworld ? 'Overworld' : 'Nether'}`
      }
    })

    this.water?.addEventListener('click', () => {
      if (this.save?.innerHTML === 'Save and Exit'){
        this.terrain?.changeWater()
        this.water!.innerHTML = `Water: ${this.terrain?.waterState ? 'On' : 'Off'}`
      }
    })


    // entities
    this.entity?.addEventListener('click', () => {
      this.entities?.classList.add('show')
    })
    this.creeper?.addEventListener('click', () => {
      if (this.entity_class.maxNumEntity[0] > 0){
        this.entity_class.maxNumEntity[0] = 0
        this.creeper!.innerHTML = `Creeper: Off`
      } else {
        this.entity_class.maxNumEntity[0] = 1
        this.creeper!.innerHTML = `Creeper: On`
      }
    })
    this.skeleton?.addEventListener('click', () => {
      if (this.entity_class.maxNumEntity[1] > 0){
        this.entity_class.maxNumEntity[1] = 0
        this.skeleton!.innerHTML = `Skeleton: Off`
      } else {
        this.entity_class.maxNumEntity[1] = 1
        this.skeleton!.innerHTML = `Skeleton: On`
      }
    })
    this.zombie?.addEventListener('click', () => {
      if (this.entity_class.maxNumEntity[2] > 0){
        this.entity_class.maxNumEntity[2] = 0
        this.zombie!.innerHTML = `Zombie: Off`
      } else {
        this.entity_class.maxNumEntity[2] = 1
        this.zombie!.innerHTML = `Zombie: On`
      }
    })
    this.spider?.addEventListener('click', () => {
      if (this.entity_class.maxNumEntity[3] > 0){
        this.entity_class.maxNumEntity[3] = 0
        this.spider!.innerHTML = `Spider: Off`
      } else {
        this.entity_class.maxNumEntity[3] = 1
        this.spider!.innerHTML = `Spider: On`
      }
    })
    this.pig?.addEventListener('click', () => {
      if (this.entity_class.maxNumEntity[4] > 0){
        this.entity_class.maxNumEntity[4] = 0
        this.pig!.innerHTML = `Pig: Off`
      } else {
        this.entity_class.maxNumEntity[4] = 1
        this.pig!.innerHTML = `Pig: On`
      }
    })
    this.cow?.addEventListener('click', () => {
      if (this.entity_class.maxNumEntity[5] > 0){
        this.entity_class.maxNumEntity[5] = 0
        this.cow!.innerHTML = `Cow: Off`
      } else {
        this.entity_class.maxNumEntity[5] = 1
        this.cow!.innerHTML = `Cow: On`
      }
    })
    this.sheep?.addEventListener('click', () => {
      if (this.entity_class.maxNumEntity[6] > 0){
        this.entity_class.maxNumEntity[6] = 0
        this.sheep!.innerHTML = `Sheep: Off`
      } else {
        this.entity_class.maxNumEntity[6] = 1
        this.sheep!.innerHTML = `Sheep: On`
      }
    })
    this.chicken?.addEventListener('click', () => {
      if (this.entity_class.maxNumEntity[7] > 0){
        this.entity_class.maxNumEntity[7] = 0
        this.chicken!.innerHTML = `Chicken: Off`
      } else {
        this.entity_class.maxNumEntity[7] = 1
        this.chicken!.innerHTML = `Chicken: On`
      }
    })
    this.entityBack?.addEventListener('click', () => {
      this.entities?.classList.remove('show')
    })

    // menu and fullscreen
    document.body.addEventListener('keydown', (e: KeyboardEvent) => {
      // menu
      if (e.key === 'e' && document.pointerLockElement) {
        !isMobile && control.control.unlock()
      }

      // fullscreen
      if (e.key === 'f') {
        if (document.fullscreenElement) {
          document.exitFullscreen()
        } else {
          document.body.requestFullscreen()
        }
      }
    })

    // exit
    this.exit?.addEventListener('click', () => {
      this.onExit()
    })

    // play / pause handler
    document.addEventListener('pointerlockchange', () => {
      if (document.pointerLockElement) {
        this.onPlay()
      } else {
        this.onPause()
      }
    })

    // disable context menu
    document.addEventListener('contextmenu', e => {
      e.preventDefault()
    })

    // fallback lock handler
    document.querySelector('canvas')?.addEventListener('click', (e: Event) => {
      e.preventDefault()
      !isMobile && control.control.lock()
    })
  }

  fps: FPS
  bag: Bag
  joystick: Joystick
  terrain: Terrain
  entity_class: Entity

  menu = document.querySelector('.menu')
  crossHair = document.createElement('div')
  fileInput = document.getElementById('fileInput') as HTMLInputElement;

  // buttons
  play = document.querySelector('#play')
  control = document.querySelector('#control')
  setting = document.querySelector('#setting')
  world = document.querySelector('#world')
  entity = document.querySelector('#entity')
  feature = document.querySelector('#feature')
  back = document.querySelector('#back')
  exit = document.querySelector('#exit')
  save = document.querySelector('#save')

  // modals
  saveModal = document.querySelector('.save-modal')
  loadModal = document.querySelector('.load-modal')
  settings = document.querySelector('.settings')
  worlds = document.querySelector('.worlds')
  loads = document.querySelector('.loads')
  entities = document.querySelector('.entities')
  features = document.querySelector('.features')
  github = document.querySelector('.github')

  // settings
  distance = document.querySelector('#distance')
  distanceInput = document.querySelector('#distance-input')

  fov = document.querySelector('#fov')
  fovInput = document.querySelector('#fov-input')

  focus = document.querySelector('#focus')
  focusInput = document.querySelector('#focus-input')

  aperture = document.querySelector('#aperture')
  apertureInput = document.querySelector('#aperture-input')

  maxblur = document.querySelector('#maxblur')
  maxblurInput = document.querySelector('#maxblur-input')

  music = document.querySelector('#music')
  musicInput = document.querySelector('#music-input')

  settingBack = document.querySelector('#setting-back')

  // worlds
  worldtype = document.querySelector('#worldtype')
  water = document.querySelector('#water')
  worldBack = document.querySelector('#world-back')

  // loads
  load1 = document.querySelector('#load1')
  load2 = document.querySelector('#load2')
  loadBack = document.querySelector('#load-back')

  // entities
  chicken = document.querySelector('#chicken')
  cow = document.querySelector('#cow')
  pig = document.querySelector('#pig')
  sheep = document.querySelector('#sheep')
  creeper = document.querySelector('#creeper') 
  zombie = document.querySelector('#zombie')
  skeleton = document.querySelector('#skeleton')
  spider = document.querySelector('#spider')
  entityBack = document.querySelector('#entity-back')

  onPlay = () => {
    isMobile && this.joystick.init()
    this.menu?.classList.add('hidden')
    this.menu?.classList.remove('start')
    this.play && (this.play.innerHTML = 'Resume')
    this.crossHair.classList.remove('hidden')
    this.github && this.github.classList.add('hidden')
    this.feature?.classList.add('hidden')
  }

  onPause = () => {
    this.menu?.classList.remove('hidden')
    this.crossHair.classList.add('hidden')
    this.save && (this.save.innerHTML = 'Save and Exit')
    this.github && this.github.classList.remove('hidden')
  }

  onExit = () => {
    this.menu?.classList.add('start')
    this.play && (this.play.innerHTML = 'Play')
    this.save && (this.save.innerHTML = 'Load Game')
    this.feature?.classList.remove('hidden')
  }

  onSave = () => {
    this.saveModal?.classList.remove('hidden')
    setTimeout(() => {
      this.saveModal?.classList.add('show')
    })
    setTimeout(() => {
      this.saveModal?.classList.remove('show')
    }, 1000)

    setTimeout(() => {
      this.saveModal?.classList.add('hidden')
    }, 1350)
  }

  onLoad = () => {
    this.loadModal?.classList.remove('hidden')
    setTimeout(() => {
      this.loadModal?.classList.add('show')
    })
    setTimeout(() => {
      this.loadModal?.classList.remove('show')
    }, 1000)

    setTimeout(() => {
      this.loadModal?.classList.add('hidden')
    }, 1350)
  }

  update = () => {
    this.fps.update()
  }
}
