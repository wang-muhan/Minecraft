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

    glowstone: new THREE.MeshStandardMaterial({ map: textures['glowstone'] }),

    redstone_ore: new THREE.MeshStandardMaterial({ map: textures['redstone_block'] }),

    obsidian: new THREE.MeshStandardMaterial({ map: textures['obsidian'] }),

    magma: new THREE.MeshStandardMaterial({ map: textures['magma'] }),
  }

  get = (
      type: MaterialType
  ): THREE.MeshStandardMaterial | THREE.MeshStandardMaterial[] => {
    return this.materials[type]
  }
}
