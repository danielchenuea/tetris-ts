import { rotateMatrixClock, rotateMatrixAntiClock, renderBoard } from '../../../src/tetris';
import { Tetrimino } from "../../../types/tetrimino.type";

import * as tetriminoDefinition from "../../../src/tetriminos";

let board : number[][];
let TetriminoPiece : Tetrimino;
let Matrix_L_0 : number[][];

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
    Matrix_L_0 = [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0]
    ]
})

afterEach(() => {

})

function swapTestBoard(board_ : number[][], obstruction_board_ : number[][]) : void{
  board_.splice(30, obstruction_board_.length, ...obstruction_board_)
}

describe('L_Block(Rotation0 -> Rotation3)', () => {
  test('Unobstructed - Pass Test 1', () => {
    let obstruction_board = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 8, 0, 0, 0, 0],
      [0, 0, 0, 8, 8, 8, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    swapTestBoard(board, obstruction_board);
    TetriminoPiece = {
      name: "L",
      matrix: Matrix_L_0,
      colorMatrix: tetriminoDefinition["L_ShapeColor"],
      x: 4,
      y: 35,
      rotation: 0
    }
    rotateMatrixAntiClock(board, TetriminoPiece);
    expect(TetriminoPiece.x).toBe(4);
    expect(TetriminoPiece.y).toBe(35);
    expect(TetriminoPiece.rotation).toBe(3);
  });

  test('Obstructed - Pass Test 2', () => {
    let obstruction_board = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 8, 0, 0, 0, 0],
      [0, 0, 0, 8, 8, 8, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    ];
    swapTestBoard(board, obstruction_board);
    TetriminoPiece = {
      name: "L",
      matrix: Matrix_L_0,
      colorMatrix: tetriminoDefinition["L_ShapeColor"],
      x: 4,
      y: 35,
      rotation: 0
    }
    rotateMatrixAntiClock(board, TetriminoPiece);
    expect(TetriminoPiece.x).toBe(5);
    expect(TetriminoPiece.y).toBe(35);
    expect(TetriminoPiece.rotation).toBe(3);
  });

  test('Obstructed - Pass Test 3', () => {
    let obstruction_board = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 8, 0, 0, 0, 0],
      [0, 0, 0, 8, 8, 8, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    ];
    swapTestBoard(board, obstruction_board);
    TetriminoPiece = {
      name: "L",
      matrix: Matrix_L_0,
      colorMatrix: tetriminoDefinition["L_ShapeColor"],
      x: 4,
      y: 35,
      rotation: 0
    }
    rotateMatrixAntiClock(board, TetriminoPiece);
    expect(TetriminoPiece.x).toBe(5);
    expect(TetriminoPiece.y).toBe(34);
    expect(TetriminoPiece.rotation).toBe(3);
  });

  test('Obstructed - Pass Test 4', () => {
    let obstruction_board = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 8, 0, 0, 0, 0],
      [0, 0, 1, 8, 8, 8, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    ];
    swapTestBoard(board, obstruction_board);
    TetriminoPiece = {
      name: "L",
      matrix: Matrix_L_0,
      colorMatrix: tetriminoDefinition["L_ShapeColor"],
      x: 4,
      y: 35,
      rotation: 0
    }
    rotateMatrixAntiClock(board, TetriminoPiece);
    expect(TetriminoPiece.x).toBe(4);
    expect(TetriminoPiece.y).toBe(37);
    expect(TetriminoPiece.rotation).toBe(3);
  });

  test('Obstructed - Pass Test 5', () => {
    let obstruction_board = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 1, 1, 8, 0, 0, 0, 0],
      [0, 0, 1, 8, 8, 8, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
    ];
    swapTestBoard(board, obstruction_board);
    TetriminoPiece = {
      name: "L",
      matrix: Matrix_L_0,
      colorMatrix: tetriminoDefinition["L_ShapeColor"],
      x: 4,
      y: 35,
      rotation: 0
    }
    rotateMatrixAntiClock(board, TetriminoPiece);
    expect(TetriminoPiece.x).toBe(5);
    expect(TetriminoPiece.y).toBe(37);
    expect(TetriminoPiece.rotation).toBe(3);
  });

  test('Obstructed - Fail Test', () => {
    let obstruction_board = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 8, 0, 0, 0, 0],
      [0, 0, 1, 8, 8, 8, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    ];
    swapTestBoard(board, obstruction_board);
    TetriminoPiece = {
      name: "L",
      matrix: Matrix_L_0,
      colorMatrix: tetriminoDefinition["L_ShapeColor"],
      x: 4,
      y: 35,
      rotation: 0
    }
    rotateMatrixAntiClock(board, TetriminoPiece);
    expect(TetriminoPiece.x).toBe(4);
    expect(TetriminoPiece.y).toBe(35);
    expect(TetriminoPiece.rotation).toBe(0);
  });

});