// 0 -> 0
// R -> 1
// 2 -> 2
// L -> 3
export interface Domino {
    name: string;
    matrix: Array<Array<number>>;
    colorMatrix: string;
    rotation: number;
}
export interface Position {
    x: number;
    y: number;
}

export type Tetrimino = Domino & Position;