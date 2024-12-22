import * as THREE from 'three'
import Block from '../mesh/block'
import Noise from '../noise'
import {BlockType, WorldType} from '../config'

const matrix = new THREE.Matrix4()
const noise = new Noise()
const blocks: THREE.InstancedMesh[] = []

const geometry = new THREE.BoxGeometry()

let isFirstRun = true

onmessage = (
    msg: MessageEvent<{
      distance: number
      chunk: THREE.Vector2
      noiseSeed: number
      treeSeed: number
      stoneSeed: number
      coalSeed: number
      idMap: Map<string, number>
      blocksFactor: number[]
      blocksCount: number[]
      customBlocks: Block[]
      chunkSize: number
      worldType: WorldType
    }>
) => {

  const {
    distance,
    chunk,
    noiseSeed,
    treeSeed,
    stoneSeed,
    coalSeed,
    idMap,
    blocksFactor,
    customBlocks,
    blocksCount,
    chunkSize,
    worldType,
  } = msg.data

  const maxCount = (distance * chunkSize * 2 + chunkSize) ** 2 + 500

  // initialize blocks on first run(fill with number of blockfactors)
  if (isFirstRun) {
    for (let i = 0; i < blocksCount.length; i++) {
      let block = new THREE.InstancedMesh(
          geometry,
          new THREE.MeshBasicMaterial(),
          maxCount * blocksFactor[i]
      )
      blocks.push(block)
    }
    isFirstRun = false
  }

  if (worldType === WorldType.overworld) {
    noise.seed = noiseSeed
    noise.treeSeed = treeSeed
    noise.stoneSeed = stoneSeed
    noise.coalSeed = coalSeed

    for (let i = 0; i < blocks.length; i++) {
      blocks[i].instanceMatrix = new THREE.InstancedBufferAttribute(
          new Float32Array(maxCount * blocksFactor[i] * 16),
          16
      )
    }

    for (
        let x = -chunkSize * distance + chunkSize * chunk.x;
        x < chunkSize * distance + chunkSize + chunkSize * chunk.x;
        x++
    ) {
      for (
          let z = -chunkSize * distance + chunkSize * chunk.y;
          z < chunkSize * distance + chunkSize + chunkSize * chunk.y;
          z++
      ) {

        // horizontal plane is at y = 30
        const y = 30

        // calculate block's y position offset based on noise
        const yOffset = Math.floor(
            noise.get(x / noise.gap, z / noise.gap, noise.seed) * noise.amp
        )
        matrix.setPosition(x, y + yOffset, z)

        const stoneOffset =
            noise.get(x / noise.stoneGap, z / noise.stoneGap, noise.stoneSeed) *
            noise.stoneAmp

        const coalOffset =
            noise.get(x / noise.coalGap, z / noise.coalGap, noise.coalSeed) *
            noise.coalAmp

        // set stones and coal
        if (stoneOffset > noise.stoneThreshold) {
          if (coalOffset > noise.coalThreshold) {
            // coal
            idMap.set(`${x}_${y + yOffset}_${z}`, blocksCount[BlockType.coal])
            blocks[BlockType.coal].setMatrixAt(
                blocksCount[BlockType.coal]++,
                matrix
            )
          } else {
            // stone
            idMap.set(`${x}_${y + yOffset}_${z}`, blocksCount[BlockType.stone])
            blocks[BlockType.stone].setMatrixAt(
                blocksCount[BlockType.stone]++,
                matrix
            )
          }
        }

        // set grass, sand and water
        else {
          if (yOffset < -3) {
            // sand
            idMap.set(`${x}_${y + yOffset}_${z}`, blocksCount[BlockType.sand])
            blocks[BlockType.sand].setMatrixAt(
                blocksCount[BlockType.sand]++,
                matrix
            )

            matrix.setPosition(x, y + yOffset + 1, z)
            // water
            idMap.set(`${x}_${y + yOffset + 1}_${z}`, blocksCount[BlockType.water])
            blocks[BlockType.water].setMatrixAt(
                blocksCount[BlockType.water]++,
                matrix
            )
          } else {
            // grass
            idMap.set(`${x}_${y + yOffset}_${z}`, blocksCount[BlockType.grass])
            blocks[BlockType.grass].setMatrixAt(
                blocksCount[BlockType.grass]++,
                matrix
            )
          }
        }

        // generate trees
        const treeOffset =
            noise.get(x / noise.treeGap, z / noise.treeGap, noise.treeSeed) *
            noise.treeAmp

        if (
            treeOffset > noise.treeThreshold &&
            yOffset >= -3 && // not in water or sand
            stoneOffset < noise.stoneThreshold // not on stones
        ) {
          for (let i = 1; i <= noise.treeHeight; i++) {
            idMap.set(`${x}_${y + yOffset + i}_${z}`, blocksCount[BlockType.tree])

            matrix.setPosition(x, y + yOffset + i, z)

            blocks[BlockType.tree].setMatrixAt(
                blocksCount[BlockType.tree]++,
                matrix
            )
          }

          // leaf
          for (let i = -3; i < 3; i++) {
            for (let j = -3; j < 3; j++) {
              for (let k = -3; k < 3; k++) {
                if (i === 0 && k === 0) {
                  continue
                }
                const leafOffset =
                    noise.get(
                        (x + i + j) / noise.leafGap,
                        (z + k) / noise.leafGap,
                        noise.leafSeed
                    ) * noise.leafAmp

                // add leaf if noise is greater than threshold
                if (leafOffset > noise.leafThreshold) {
                  idMap.set(
                      `${x + i}_${y + yOffset + noise.treeHeight + j}_${z + k}`,
                      blocksCount[BlockType.leaf]
                  )
                  matrix.setPosition(
                      x + i,
                      y + yOffset + noise.treeHeight + j,
                      z + k
                  )
                  blocks[BlockType.leaf].setMatrixAt(
                      blocksCount[BlockType.leaf]++,
                      matrix
                  )
                }
              }
            }
          }
        }
      }
    }
  }

  else {

    noise.seed = noiseSeed
    noise.treeSeed = treeSeed
    noise.stoneSeed = stoneSeed
    noise.coalSeed = coalSeed

    for (let i = 0; i < blocks.length; i++) {
      blocks[i].instanceMatrix = new THREE.InstancedBufferAttribute(
          new Float32Array(maxCount * blocksFactor[i] * 16),
          16
      )
    }

    for (
        let x = -chunkSize * distance + chunkSize * chunk.x;
        x < chunkSize * distance + chunkSize + chunkSize * chunk.x;
        x++
    ) {
      for (
          let z = -chunkSize * distance + chunkSize * chunk.y;
          z < chunkSize * distance + chunkSize + chunkSize * chunk.y;
          z++
      ) {

        // horizontal plane is at y = 30
        const y = 30

        // calculate block's y position offset based on noise
        const yOffsetmean = Math.floor(
            noise.get(x / noise.gap, z / noise.gap, noise.seed) * noise.amp
        )
        const yOffsetstd = 0

        for (let yOffset = yOffsetmean - yOffsetstd; yOffset <= yOffsetmean + yOffsetstd; yOffset++) {
          matrix.setPosition(x, y + yOffset, z)

          const stoneOffset =
              noise.get(x / noise.stoneGap, z / noise.stoneGap, noise.stoneSeed) *
              noise.stoneAmp

          const coalOffset =
              noise.get(x / noise.coalGap, z / noise.coalGap, noise.coalSeed) *
              noise.coalAmp

          // set stones and coal
          if (stoneOffset > noise.stoneThreshold) {
            if (coalOffset > noise.coalThreshold) {
              // coal
              idMap.set(`${x}_${y + yOffset}_${z}`, blocksCount[BlockType.coal])
              blocks[BlockType.obsidian].setMatrixAt(
                  blocksCount[BlockType.obsidian]++,
                  matrix
              )
            } else {
              // stone
              idMap.set(`${x}_${y + yOffset}_${z}`, blocksCount[BlockType.stone])
              blocks[BlockType.glowstone].setMatrixAt(
                  blocksCount[BlockType.glowstone]++,
                  matrix
              )
            }
          }

          // set grass, sand and water
          else {
            if (yOffset < 0) {
              // sand
              idMap.set(`${x}_${y + yOffset}_${z}`, blocksCount[BlockType.soul_sand])
              blocks[BlockType.soul_sand].setMatrixAt(
                  blocksCount[BlockType.soul_sand]++,
                  matrix
              )
            } else {
              // grass
              idMap.set(`${x}_${y + yOffset}_${z}`, blocksCount[BlockType.nether_quartz_ore])
              blocks[BlockType.nether_quartz_ore].setMatrixAt(
                  blocksCount[BlockType.nether_quartz_ore]++,
                  matrix
              )
            }
          }
        }

        // generate ceilings
        const ceilingmean = Math.floor(
            noise.get(x / noise.netherGap, z / noise.netherGap, noise.netherSeed) * noise.netherAmp + 10
        )
        const ceilingstd = 1
        for (let yOffset = ceilingmean - ceilingstd; yOffset <= ceilingmean + ceilingstd; yOffset++) {
          matrix.setPosition(x, y + yOffset, z)

          const stoneOffset =
              noise.get(x / noise.stoneGap, z / noise.stoneGap, noise.stoneSeed) *
              noise.stoneAmp

          const coalOffset =
              noise.get(x / noise.coalGap, z / noise.coalGap, noise.coalSeed) *
              noise.coalAmp

          // set stones and coal
          if (stoneOffset > noise.stoneThreshold) {
            if (coalOffset > noise.coalThreshold) {
              // coal
              idMap.set(`${x}_${y + yOffset}_${z}`, blocksCount[BlockType.obsidian])
              blocks[BlockType.obsidian].setMatrixAt(
                  blocksCount[BlockType.obsidian]++,
                  matrix
              )
            } else {
              // stone
              idMap.set(`${x}_${y + yOffset}_${z}`, blocksCount[BlockType.glowstone])
              blocks[BlockType.glowstone].setMatrixAt(
                  blocksCount[BlockType.glowstone]++,
                  matrix
              )
            }
          }

          // set grass, sand and water
          else {
            if (yOffset < -3) {
              // sand
              idMap.set(`${x}_${y + yOffset}_${z}`, blocksCount[BlockType.redstone_ore])
              blocks[BlockType.redstone_ore].setMatrixAt(
                  blocksCount[BlockType.redstone_ore]++,
                  matrix
              )
            } else {
              // nether_bricks
              idMap.set(`${x}_${y + yOffset}_${z}`, blocksCount[BlockType.nether_bricks])
              blocks[BlockType.nether_bricks].setMatrixAt(
                  blocksCount[BlockType.nether_bricks]++,
                  matrix
              )
            }
          }
        }

        // generate magma
        const yOffset = yOffsetmean
        const stoneOffset = noise.get(x / noise.stoneGap, z / noise.stoneGap, noise.stoneSeed) * noise.stoneAmp
        const treeOffset =
            noise.get(x / noise.treeGap, z / noise.treeGap, noise.treeSeed) *
            noise.treeAmp

        if (
            treeOffset > noise.magmaThreshold &&
            yOffset >= -3 && // not in water or sand
            stoneOffset < noise.stoneThreshold // not on stones
        ) {
          for (let i = 1; i <= noise.magmaHeight; i++) {
            idMap.set(`${x}_${y + yOffset + i}_${z}`, blocksCount[BlockType.magma])

            matrix.setPosition(x, y + yOffset + i, z)

            blocks[BlockType.magma].setMatrixAt(
                blocksCount[BlockType.magma]++,
                matrix
            )
          }

          // leaf
          for (let j = -3; j < 3; j++) {
            let l = (j + 5) / 2
            for (let i = -l; i < l; i++) {
              for (let k = -l; k < l; k++) {
                if (i === 0 && k === 0) {
                  continue
                }
                const leafOffset =
                    noise.get(
                        (x + i + j) / noise.leafGap,
                        (z + k) / noise.leafGap,
                        noise.leafSeed
                    ) * noise.leafAmp

                // add leaf if noise is greater than threshold
                if (leafOffset > noise.leafThreshold) {
                  idMap.set(
                      `${x + i}_${y + yOffset + noise.magmaHeight + j}_${z + k}`,
                      blocksCount[BlockType.magma]
                  )
                  matrix.setPosition(
                      x + i,
                      y + yOffset + noise.magmaHeight + j,
                      z + k
                  )
                  blocks[BlockType.magma].setMatrixAt(
                      blocksCount[BlockType.magma]++,
                      matrix
                  )
                }
              }
            }
          }
        }
      }
    }
  }


  // go through all the custom blocks, check visibility and update the matrix
  for (const block of customBlocks) {
    // if inside current view range
    if (
        block.x > -chunkSize * distance + chunkSize * chunk.x &&
        block.x < chunkSize * distance + chunkSize + chunkSize * chunk.x &&
        block.z > -chunkSize * distance + chunkSize * chunk.y &&
        block.z < chunkSize * distance + chunkSize + chunkSize * chunk.y
    ) {
      if (block.placed) {
        // placed blocks
        matrix.setPosition(block.x, block.y, block.z)
        blocks[block.type].setMatrixAt(blocksCount[block.type]++, matrix)
      } else {
        // not placed, removed blocks
        const id = idMap.get(`${block.x}_${block.y}_${block.z}`)

        blocks[block.type].setMatrixAt(
            id!,
            new THREE.Matrix4().set(
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            )
        )
      }
    }
  }

  const arrays = blocks.map(block => block.instanceMatrix.array)
  postMessage({ idMap, arrays, blocksCount })
}
