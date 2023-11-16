import { rotateMatrixClock, rotateMatrixAntiClock } from '../../../src/tetris';
import { Tetrimino } from "../../../types/tetrimino.type";

import * as tetriminoDefinition from "../../../src/tetriminos";

let board : number[][];
let TetriminoPiece : Tetrimino;
let Matrix_T_3 : number[][];

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
    Matrix_T_3 = [
      [0, 1, 0],
      [1, 1, 0],
      [0, 1, 0]
    ]
})

afterEach(() => {

})

function swapTestBoard(board_ : number[][], obstruction_board_ : number[][]) : void{
  board_.splice(30, obstruction_board_.length, ...obstruction_board_)
}

describe('T_Block(Rotation3 -> Rotation0)', () => {
  test('Unobstructed - Pass Test 1', () => {
    let obstruction_board = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 8, 0, 0, 0, 0, 0],
      [0, 0, 0, 8, 8, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 8, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    swapTestBoard(board, obstruction_board);
    TetriminoPiece = {
      name: "T",
      matrix: Matrix_T_3,
      colorMatrix: tetriminoDefinition["T_ShapeColor"],
      x: 4,
      y: 35,
      rotation: 3
    }
    rotateMatrixClock(board, TetriminoPiece);
    expect(TetriminoPiece.x).toBe(4);
    expect(TetriminoPiece.y).toBe(35);
    expect(TetriminoPiece.rotation).toBe(0);
  });

  test('Obstructed - Pass Test 2', () => {
    let obstruction_board = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 8, 1, 0, 0, 0, 0],
      [0, 0, 0, 8, 8, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 8, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    ];
    swapTestBoard(board, obstruction_board);
    TetriminoPiece = {
      name: "T",
      matrix: Matrix_T_3,
      colorMatrix: tetriminoDefinition["T_ShapeColor"],
      x: 4,
      y: 35,
      rotation: 3
    }
    rotateMatrixClock(board, TetriminoPiece);
    expect(TetriminoPiece.x).toBe(3);
    expect(TetriminoPiece.y).toBe(35);
    expect(TetriminoPiece.rotation).toBe(0);
  });

  test('Obstructed - Pass Test 3', () => {
    let obstruction_board = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 8, 1, 0, 0, 0, 0],
      [0, 1, 1, 8, 8, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 8, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    ];
    swapTestBoard(board, obstruction_board);
    TetriminoPiece = {
      name: "T",
      matrix: Matrix_T_3,
      colorMatrix: tetriminoDefinition["T_ShapeColor"],
      x: 4,
      y: 35,
      rotation: 3
    }
    rotateMatrixClock(board, TetriminoPiece);
    expect(TetriminoPiece.x).toBe(3);
    expect(TetriminoPiece.y).toBe(36);
    expect(TetriminoPiece.rotation).toBe(0);
  });

  test('Obstructed - Pass Test 4', () => {
    let obstruction_board = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 8, 1, 0, 0, 0, 0],
      [0, 1, 1, 8, 8, 1, 0, 0, 0, 0],
      [0, 1, 1, 0, 8, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    ];
    swapTestBoard(board, obstruction_board);
    TetriminoPiece = {
      name: "T",
      matrix: Matrix_T_3,
      colorMatrix: tetriminoDefinition["T_ShapeColor"],
      x: 4,
      y: 35,
      rotation: 3
    }
    rotateMatrixClock(board, TetriminoPiece);
    expect(TetriminoPiece.x).toBe(4);
    expect(TetriminoPiece.y).toBe(33);
    expect(TetriminoPiece.rotation).toBe(0);
  });

  test('Obstructed - Pass Test 5', () => {
    let obstruction_board = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 1, 0, 8, 1, 0, 0, 0, 0],
      [0, 1, 1, 8, 8, 1, 0, 0, 0, 0],
      [0, 1, 1, 0, 8, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    ];
    swapTestBoard(board, obstruction_board);
    TetriminoPiece = {
      name: "T",
      matrix: Matrix_T_3,
      colorMatrix: tetriminoDefinition["T_ShapeColor"],
      x: 4,
      y: 35,
      rotation: 3
    }
    rotateMatrixClock(board, TetriminoPiece);
    expect(TetriminoPiece.x).toBe(3);
    expect(TetriminoPiece.y).toBe(33);
    expect(TetriminoPiece.rotation).toBe(0);
  });

  test('Obstructed - Fail Test', () => {
    let obstruction_board = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 1, 0, 8, 1, 0, 0, 0, 0],
      [0, 1, 1, 8, 8, 1, 0, 0, 0, 0],
      [0, 1, 1, 0, 8, 1, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    ];
    swapTestBoard(board, obstruction_board);
    TetriminoPiece = {
      name: "T",
      matrix: Matrix_T_3,
      colorMatrix: tetriminoDefinition["T_ShapeColor"],
      x: 4,
      y: 35,
      rotation: 3
    }
    rotateMatrixClock(board, TetriminoPiece);
    expect(TetriminoPiece.x).toBe(4);
    expect(TetriminoPiece.y).toBe(35);
    expect(TetriminoPiece.rotation).toBe(3);
  });
});