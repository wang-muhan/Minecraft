export enum BlockType {
    grass,
    sand,
    tree,
    leaf,
    dirt,
    stone,
    coal,
    wood,
    diamond,
    quartz,
    glass,
    bedrock,
    water,
    tnt,
    glowstone,
    redstone_ore,
    obsidian,
    magma,
    netherrack,
    nether_quartz_ore,
}

export enum WorldType {
    overworld,
    nether,
}

// export enum MaterialType {
//     BlockType = 'BlockType',
// }
export const MaterialType = Object.keys(BlockType)
    .filter(key => isNaN(Number(key)))  // filter out the numeric keys
    .reduce((acc, key) => {
        acc[key] = key;
        return acc;
    }, {} as { [key: string]: string });

// export const overworld_blocksFactor = [1, 0.2, 0.1, 0.7, 0.1, 0.2, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.7, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0]
// export const nether_blocksFactor = [1, 0.2, 0.1, 0.7, 0.1, 0.2, 0.1, 0.1, 0.5, 0.1, 0.2, 0.1, 0.7, 1.0, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0]
export const overworld_blocksFactor = Array(20).fill(1.0)
export const nether_blocksFactor = Array(20).fill(3.0)
