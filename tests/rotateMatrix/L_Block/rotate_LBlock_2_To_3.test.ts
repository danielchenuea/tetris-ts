import { rotateMatrixClock, rotateMatrixAntiClock, renderBoard } from '../../../src/tetris';
import { Tetromino } from "../../../types/tetromino.type";

import * as tetrominoDefinition from "../../../src/tetrominos";

let board : number[][];
let TetrominoPiece : Tetromino;
let Matrix_L_2 : number[][];

beforeEach(() => {
    board = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    Matrix_L_2 = [
      [0, 0, 0],
      [1, 1, 1],
      [1, 0, 0]
    ]
})

afterEach(() => {

})

function swapTestBoard(board_ : number[][], obstruction_board_ : number[][]) : void{
  board_.splice(30, obstruction_board_.length, ...obstruction_board_)
}

describe('L_Block(Rotation2 -> Rotation3)', () => {
  test('Unobstructed - Pass Test 1', () => {
    let obstruction_board = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 8, 8, 8, 0, 0, 0, 0],
      [0, 0, 0, 8, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    swapTestBoard(board, obstruction_board);
    TetrominoPiece = {
      name: "L",
      matrix: Matrix_L_2,
      colorMatrix: tetrominoDefinition["L_ShapeColor"],
      x: 4,
      y: 35,
      rotation: 2
    }
    rotateMatrixClock(board, TetrominoPiece);
    expect(TetrominoPiece.x).toBe(4);
    expect(TetrominoPiece.y).toBe(35);
    expect(TetrominoPiece.rotation).toBe(3);
  });

  test('Obstructed - Pass Test 2', () => {
    let obstruction_board = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 8, 8, 8, 0, 0, 0, 0],
      [0, 0, 0, 8, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    ];
    swapTestBoard(board, obstruction_board);
    TetrominoPiece = {
      name: "L",
      matrix: Matrix_L_2,
      colorMatrix: tetrominoDefinition["L_ShapeColor"],
      x: 4,
      y: 35,
      rotation: 2
    }
    rotateMatrixClock(board, TetrominoPiece);
    expect(TetrominoPiece.x).toBe(5);
    expect(TetrominoPiece.y).toBe(35);
    expect(TetrominoPiece.rotation).toBe(3);
  });

  test('Obstructed - Pass Test 3', () => {
    let obstruction_board = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 8, 8, 8, 0, 0, 0, 0],
      [0, 0, 0, 8, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    swapTestBoard(board, obstruction_board);
    TetrominoPiece = {
      name: "L",
      matrix: Matrix_L_2,
      colorMatrix: tetrominoDefinition["L_ShapeColor"],
      x: 4,
      y: 35,
      rotation: 2
    }
    rotateMatrixClock(board, TetrominoPiece);
    expect(TetrominoPiece.x).toBe(5);
    expect(TetrominoPiece.y).toBe(34);
    expect(TetrominoPiece.rotation).toBe(3);
  });

  test('Obstructed - Pass Test 4', () => {
    let obstruction_board = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 8, 8, 8, 0, 0, 0, 0],
      [0, 0, 0, 8, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    swapTestBoard(board, obstruction_board);
    TetrominoPiece = {
      name: "L",
      matrix: Matrix_L_2,
      colorMatrix: tetrominoDefinition["L_ShapeColor"],
      x: 4,
      y: 35,
      rotation: 2
    }
    rotateMatrixClock(board, TetrominoPiece);
    expect(TetrominoPiece.x).toBe(4);
    expect(TetrominoPiece.y).toBe(37);
    expect(TetrominoPiece.rotation).toBe(3);
  });

  test('Obstructed - Pass Test 5', () => {
    let obstruction_board = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 8, 8, 8, 1, 0, 0, 0],
      [0, 0, 0, 8, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    ];
    swapTestBoard(board, obstruction_board);
    TetrominoPiece = {
      name: "L",
      matrix: Matrix_L_2,
      colorMatrix: tetrominoDefinition["L_ShapeColor"],
      x: 4,
      y: 35,
      rotation: 2
    }
    rotateMatrixClock(board, TetrominoPiece);
    expect(TetrominoPiece.x).toBe(5);
    expect(TetrominoPiece.y).toBe(37);
    expect(TetrominoPiece.rotation).toBe(3);
  });

  test('Obstructed - Fail Test', () => {
    let obstruction_board = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 8, 8, 8, 1, 0, 0, 0],
      [0, 0, 0, 8, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    ];
    swapTestBoard(board, obstruction_board);
    TetrominoPiece = {
      name: "L",
      matrix: Matrix_L_2,
      colorMatrix: tetrominoDefinition["L_ShapeColor"],
      x: 4,
      y: 35,
      rotation: 2
    }
    rotateMatrixClock(board, TetrominoPiece);
    expect(TetrominoPiece.x).toBe(4);
    expect(TetrominoPiece.y).toBe(35);
    expect(TetrominoPiece.rotation).toBe(2);
  });
});