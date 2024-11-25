import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise'
// import { SimplexNoise } from 'three/examples/jsm/math/SimplexNoise'

export default class Noise {
  noise = new ImprovedNoise()
  seed = Math.random()
  gap = 22
  amp = 8

  netherSeed = this.seed * 0.1
  netherGap = 6
  netherAmp = 8

  stoneSeed = this.seed * 0.4
  stoneGap = 12
  stoneAmp = 8
  stoneThreshold = 3.5

  coalSeed = this.seed * 0.5
  coalGap = 3
  coalAmp = 8
  coalThreshold = 3

  treeSeed = this.seed * 0.7
  treeGap = 2
  treeAmp = 6
  treeHeight = 10
  treeThreshold = 4

  leafSeed = this.seed * 0.8
  leafGap = 2
  leafAmp = 5
  leafThreshold = -0.03

  get = (x: number, y: number, z: number) => {
    return this.noise.noise(x, y, z)
  }

  get_adjacent = (x: number, y: number, z: number, delta: number) : {min: number, max: number} => {
    const y0 = this.get(x, y, z)
    const y1 = this.get(x - delta, y, z)
    const y2 = this.get(x + delta, y, z)
    const y3 = this.get(x, y - delta, z)
    const y4 = this.get(x, y + delta, z)
    const max = Math.max(y0, y1, y2, y3, y4)
    const min = Math.min(y0, y1, y2, y3, y4)
    return { min, max }
  }
}
