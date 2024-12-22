import * as THREE from 'three'

// Declare the Block Material Types here
import { MaterialType } from '../config'

let loader = new THREE.TextureLoader()
const textures: { [key: string]: THREE.Texture } = {};

async function loadAllTextures() {
  const texturePaths = import.meta.glob('../../static/textures/block/*.png');
  const loadPromises = Object.entries(texturePaths).map(async ([path, importFn]) => {
    const textureName = path.split('/').pop()?.replace('.png', '');
    const module = await importFn();
    if (textureName) {
      textures[textureName] = loader.load(module.default);
      textures[textureName].magFilter = THREE.NearestFilter
    }
  });
  await Promise.all(loadPromises);
}
// await for all textures being loaded
await loadAllTextures();

export default class Materials {
  constructor() {
    const texture = textures['magma']
    texture.repeat.set(1, 1/3)
    texture.offset.set(0, 0)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    this.materials[MaterialType.magma].map = texture
    this.materials[MaterialType.magma].emissiveMap = texture
  }

  materials = {
    grass: [
      new THREE.MeshStandardMaterial({ map: textures['grass_block_side'] }),
      new THREE.MeshStandardMaterial({ map: textures['grass_block_side'] }),
      new THREE.MeshStandardMaterial({ map: textures['grass_top_green'] }),
      new THREE.MeshStandardMaterial({ map: textures['dirt'] }),
      new THREE.MeshStandardMaterial({ map: textures['grass_block_side'] }),
      new THREE.MeshStandardMaterial({ map: textures['grass_block_side'] })
    ],

    dirt: new THREE.MeshStandardMaterial({ map: textures['dirt'] }),

    sand: new THREE.MeshStandardMaterial({ map: textures['sand'] }),

    tree: [
      new THREE.MeshStandardMaterial({ map: textures['oak_log'] }),
      new THREE.MeshStandardMaterial({ map: textures['oak_log'] }),
      new THREE.MeshStandardMaterial({ map: textures['oak_log_top'] }),
      new THREE.MeshStandardMaterial({ map: textures['oak_log_top'] }),
      new THREE.MeshStandardMaterial({ map: textures['oak_log'] }),
      new THREE.MeshStandardMaterial({ map: textures['oak_log'] })
    ],

    leaf: new THREE.MeshStandardMaterial({
      map: textures['oak_leaves'],
      color: new THREE.Color(0, 1, 0),
      transparent: true
    }),

    water: new THREE.MeshStandardMaterial({
      map: textures['water'],
      color: new THREE.Color(0, 0, 0.2),
      transparent: true,
      opacity: 1.0
    }),

    stone: new THREE.MeshStandardMaterial({ map: textures['stone'] }),

    coal: new THREE.MeshStandardMaterial({ map: textures['coal_ore'] }),

    wood: new THREE.MeshStandardMaterial({ map: textures['oak_planks'] }),

    diamond: new THREE.MeshStandardMaterial({ map: textures['diamond_block'] }),

    quartz: new THREE.MeshStandardMaterial({ map: textures['quartz_block_side'] }),

    glass: new THREE.MeshStandardMaterial({
      map: textures['glass'],
      transparent: true
    }),

    bedrock: new THREE.MeshStandardMaterial({ map: textures['bedrock'] }),

    tnt: [
        new THREE.MeshStandardMaterial({ map: textures['tnt_side'] }),
        new THREE.MeshStandardMaterial({ map: textures['tnt_side'] }),
        new THREE.MeshStandardMaterial({ map: textures['tnt_top'] }),
        new THREE.MeshStandardMaterial({ map: textures['tnt_bottom'] }),
        new THREE.MeshStandardMaterial({ map: textures['tnt_side'] }),
        new THREE.MeshStandardMaterial({ map: textures['tnt_side'] })
    ],

    glowstone: new THREE.MeshStandardMaterial({ map: textures['glowstone'],
      emissive: new THREE.Color(0xffff55), // 设置发光颜色
      emissiveMap: textures['glowstone'], // 使用同一个纹理作为发光纹理
      emissiveIntensity: 1.0, // 控制发光强度
    }),

    redstone_ore: new THREE.MeshStandardMaterial({ map: textures['redstone_block'] }),

    obsidian: new THREE.MeshStandardMaterial({ map: textures['obsidian'] ,
      emissive: new THREE.Color(0xffffff), // 设置发光颜色
      emissiveMap: textures['obsidian'], // 使用同一个纹理作为发光纹理
      emissiveIntensity: 1.0, // 控制发光强度
    }),

    magma: new THREE.MeshStandardMaterial({ map: textures['magma'],
      emissive: new THREE.Color(0xff5500), // 设置发光颜色
      emissiveMap: textures['magma'], // 使用同一个纹理作为发光纹理
      emissiveIntensity: 1.5, // 控制发光强度
      }),

    netherrack: new THREE.MeshStandardMaterial({ map: textures['netherrack'],
      map: textures['netherrack'],
      emissive: new THREE.Color(0xffffff), // 设置发光颜色
      emissiveMap: textures['netherrack'], // 使用同一个纹理作为发光纹理
      emissiveIntensity: 1.0, // 控制发光强度
      }),

    nether_quartz_ore: new THREE.MeshStandardMaterial({
      map: textures['nether_quartz_ore'],
      emissive: new THREE.Color(0xff5555), // 设置发光颜色
      emissiveMap: textures['nether_quartz_ore'], // 使用同一个纹理作为发光纹理
      emissiveIntensity: 0.5, // 控制发光强度
    }),

    soul_sand: new THREE.MeshStandardMaterial({
      map: textures['soul_sand'],
      emissive: new THREE.Color(0x555555), // 设置发光颜色
      emissiveMap: textures['soul_sand'], // 使用同一个纹理作为发光纹理
      emissiveIntensity: 0.5, // 控制发光强度
    }),

    nether_bricks: new THREE.MeshStandardMaterial({
      map: textures['nether_bricks'],
      emissive: new THREE.Color(0xffffff), // 设置发光颜色
      emissiveMap: textures['nether_bricks'], // 使用同一个纹理作为发光纹理
      emissiveIntensity: 1.0, // 控制发光强度
    }),

    nether_wart_block: new THREE.MeshStandardMaterial({
      map: textures['nether_wart_block'],
      emissive: new THREE.Color(0x555555), // 设置发光颜色
      emissiveMap: textures['nether_wart_block'], // 使用同一个纹理作为发光纹理
      emissiveIntensity: 1.0, // 控制发光强度
    }),
  }

  get = (
      type: MaterialType
  ): THREE.MeshStandardMaterial | THREE.MeshStandardMaterial[] => {
    return this.materials[type]
  }

  update = () => {
    this.materials[MaterialType.magma].map.offset.y += 0.005
  }


}
