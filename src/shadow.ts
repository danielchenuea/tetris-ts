import { Position, Tetrimino } from "../types/tetrimino.type";
import { haveCollision } from "./collision";

export function createShadow(board: number[][], tetris_piece: Tetrimino): Position {
    return recursiveFindBottom(board, tetris_piece, 0, 1);
}
function recursiveFindBottom(
    board: number[][],
    tetris_piece: Tetrimino,
    x: number,
    y: number
): Position {
    if (haveCollision(board, tetris_piece.matrix, tetris_piece.x, tetris_piece.y, x, y)) {
        return { x: tetris_piece.x + x, y: tetris_piece.y + y - 1 };
    }
    return recursiveFindBottom(board, tetris_piece, x, y + 1);
}