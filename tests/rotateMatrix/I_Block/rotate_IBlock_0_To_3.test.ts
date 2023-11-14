import { rotateMatrixClock, rotateMatrixAntiClock, renderBoard } from '../../../src/tetris';
import { Tetrimino } from "../../../types/tetrimino.type";

import * as tetriminoDefinition from "../../../src/tetriminos";

let board : number[][];
let TetriminoPiece : Tetrimino;
let Matrix_I_0 : number[][];

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
    Matrix_I_0 = [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]
})

afterEach(() => {

})

function swapTestBoard(board_ : number[][], obstruction_board_ : number[][]) : void{
  board_.splice(30, obstruction_board_.length, ...obstruction_board_)
}

describe('I_Block(Rotation0 -> Rotation3)', () => {
  test('Unobstructed - Pass Test 1', () => {
    let obstruction_board = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 8, 8, 8, 8, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    swapTestBoard(board, obstruction_board);
    TetriminoPiece = {
      name: "I",
      matrix: Matrix_I_0,
      colorMatrix: tetriminoDefinition["I_ShapeColor"],
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
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 8, 8, 8, 8, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    ];
    swapTestBoard(board, obstruction_board);
    TetriminoPiece = {
      name: "I",
      matrix: Matrix_I_0,
      colorMatrix: tetriminoDefinition["I_ShapeColor"],
      x: 4,
      y: 35,
      rotation: 0
    }
    rotateMatrixAntiClock(board, TetriminoPiece);
    expect(TetriminoPiece.x).toBe(6);
    expect(TetriminoPiece.y).toBe(35);
    expect(TetriminoPiece.rotation).toBe(3);
  });

  test('Obstructed - Pass Test 3', () => {
    let obstruction_board = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 8, 8, 8, 8, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    ];
    swapTestBoard(board, obstruction_board);
    TetriminoPiece = {
      name: "I",
      matrix: Matrix_I_0,
      colorMatrix: tetriminoDefinition["I_ShapeColor"],
      x: 4,
      y: 35,
      rotation: 0
    }
    rotateMatrixAntiClock(board, TetriminoPiece);
    expect(TetriminoPiece.x).toBe(3);
    expect(TetriminoPiece.y).toBe(35);
    expect(TetriminoPiece.rotation).toBe(3);
  });

  test('Obstructed - Pass Test 4', () => {
    let obstruction_board = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 8, 8, 8, 8, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
    ];
    swapTestBoard(board, obstruction_board);
    TetriminoPiece = {
      name: "I",
      matrix: Matrix_I_0,
      colorMatrix: tetriminoDefinition["I_ShapeColor"],
      x: 4,
      y: 35,
      rotation: 0
    }
    rotateMatrixAntiClock(board, TetriminoPiece);
    expect(TetriminoPiece.x).toBe(3);
    expect(TetriminoPiece.y).toBe(33);
    expect(TetriminoPiece.rotation).toBe(3);
  });

  test('Obstructed - Pass Test 3 v2', () => {
    let obstruction_board = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
      [0, 0, 0, 8, 8, 8, 8, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 1, 0, 0],
    ];
    swapTestBoard(board, obstruction_board);
    TetriminoPiece = {
      name: "I",
      matrix: Matrix_I_0,
      colorMatrix: tetriminoDefinition["I_ShapeColor"],
      x: 4,
      y: 35,
      rotation: 0
    }
    rotateMatrixAntiClock(board, TetriminoPiece);
    expect(TetriminoPiece.x).toBe(3);
    expect(TetriminoPiece.y).toBe(35);
    expect(TetriminoPiece.rotation).toBe(3);
  });

  test('Obstructed - Pass Test 4 v2', () => {
    let obstruction_board = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
      [0, 0, 0, 8, 8, 8, 8, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 1, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 1, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 1, 0, 0],
    ];
    swapTestBoard(board, obstruction_board);
    TetriminoPiece = {
      name: "I",
      matrix: Matrix_I_0,
      colorMatrix: tetriminoDefinition["I_ShapeColor"],
      x: 4,
      y: 35,
      rotation: 0
    }
    rotateMatrixAntiClock(board, TetriminoPiece);
    expect(TetriminoPiece.x).toBe(3);
    expect(TetriminoPiece.y).toBe(33);
    expect(TetriminoPiece.rotation).toBe(3);
  });

  test('Obstructed - Pass Test 5', () => {
    let obstruction_board = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 1, 0, 8, 8, 8, 8, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    swapTestBoard(board, obstruction_board);
    TetriminoPiece = {
      name: "I",
      matrix: Matrix_I_0,
      colorMatrix: tetriminoDefinition["I_ShapeColor"],
      x: 4,
      y: 35,
      rotation: 0
    }
    rotateMatrixAntiClock(board, TetriminoPiece);
    expect(TetriminoPiece.x).toBe(6);
    expect(TetriminoPiece.y).toBe(36);
    expect(TetriminoPiece.rotation).toBe(3);
  });

  
  test('Obstructed - Fail Test', () => {
    let obstruction_board = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 8, 8, 8, 8, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
    ];
    swapTestBoard(board, obstruction_board);
    TetriminoPiece = {
      name: "I",
      matrix: Matrix_I_0,
      colorMatrix: tetriminoDefinition["I_ShapeColor"],
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