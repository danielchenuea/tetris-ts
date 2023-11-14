import { rotateMatrixClock, rotateMatrixAntiClock, renderBoard } from '../../src/tetris';
import { Tetrimino } from "../../types/tetrimino.type";

import * as tetrominoDefinition from "../../src/tetriminos";
import { movePiece } from '../../src/movement';

let board : number[][];
let TetrominoPiece : Tetrimino;
let Matrix_T_0 : number[][];

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
    Matrix_T_0 = [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ]
})

afterEach(() => {

})

function swapTestBoard(board_ : number[][], obstruction_board_ : number[][]) : void{
  board_.splice(30, obstruction_board_.length, ...obstruction_board_)
}

describe('Generic Block. Basic Movement.', () => {

    test('Unobstructed - Move Up', () => {
        let obstruction_board = [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 8, 0, 0, 0, 0, 0],
          [0, 0, 0, 8, 8, 8, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
        swapTestBoard(board, obstruction_board);
        TetrominoPiece = {
          name: "T",
          matrix: Matrix_T_0,
          colorMatrix: tetrominoDefinition["T_ShapeColor"],
          x: 4,
          y: 35,
          rotation: 0
        }
        movePiece(board, TetrominoPiece, "up");
        expect(TetrominoPiece.x).toBe(4);
        expect(TetrominoPiece.y).toBe(34);
      });
      
      test('Obstructed - Move Up', () => {
        let obstruction_board = [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
          [0, 0, 0, 0, 8, 0, 0, 0, 0, 0],
          [0, 0, 0, 8, 8, 8, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
        swapTestBoard(board, obstruction_board);
        TetrominoPiece = {
          name: "T",
          matrix: Matrix_T_0,
          colorMatrix: tetrominoDefinition["T_ShapeColor"],
          x: 4,
          y: 35,
          rotation: 0
        }
        movePiece(board, TetrominoPiece, "up");
        expect(TetrominoPiece.x).toBe(4);
        expect(TetrominoPiece.y).toBe(35);
      });

    test('Unobstructed - Move Right', () => {
      let obstruction_board = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 8, 0, 0, 0, 0, 0],
        [0, 0, 0, 8, 8, 8, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ];
      swapTestBoard(board, obstruction_board);
      TetrominoPiece = {
        name: "T",
        matrix: Matrix_T_0,
        colorMatrix: tetrominoDefinition["T_ShapeColor"],
        x: 4,
        y: 35,
        rotation: 0
      }
      movePiece(board, TetrominoPiece, "right");
      expect(TetrominoPiece.x).toBe(5);
      expect(TetrominoPiece.y).toBe(35);
    });
    
    test('Obstructed - Move Right', () => {
      let obstruction_board = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 8, 1, 1, 0, 0, 0],
        [0, 0, 0, 8, 8, 8, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ];
      swapTestBoard(board, obstruction_board);
      TetrominoPiece = {
        name: "T",
        matrix: Matrix_T_0,
        colorMatrix: tetrominoDefinition["T_ShapeColor"],
        x: 4,
        y: 35,
        rotation: 0
      }
      movePiece(board, TetrominoPiece, "right");
      expect(TetrominoPiece.x).toBe(4);
      expect(TetrominoPiece.y).toBe(35);
    });

    test('Unobstructed - Move Down', () => {
      let obstruction_board = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 8, 0, 0, 0, 0, 0],
        [0, 0, 0, 8, 8, 8, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ];
      swapTestBoard(board, obstruction_board);
      TetrominoPiece = {
        name: "T",
        matrix: Matrix_T_0,
        colorMatrix: tetrominoDefinition["T_ShapeColor"],
        x: 4,
        y: 35,
        rotation: 0
      }
      movePiece(board, TetrominoPiece, "down");
      expect(TetrominoPiece.x).toBe(4);
      expect(TetrominoPiece.y).toBe(36);
    });
    
    test('Obstructed - Move Down', () => {
      let obstruction_board = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 8, 0, 0, 0, 0, 0],
        [0, 0, 0, 8, 8, 8, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ];
      swapTestBoard(board, obstruction_board);
      TetrominoPiece = {
        name: "T",
        matrix: Matrix_T_0,
        colorMatrix: tetrominoDefinition["T_ShapeColor"],
        x: 4,
        y: 35,
        rotation: 0
      }
      movePiece(board, TetrominoPiece, "down");
      expect(TetrominoPiece.x).toBe(4);
      expect(TetrominoPiece.y).toBe(35);
    });

    test('Unobstructed - Move Left', () => {
      let obstruction_board = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 8, 0, 0, 0, 0, 0],
        [0, 0, 0, 8, 8, 8, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ];
      swapTestBoard(board, obstruction_board);
      TetrominoPiece = {
        name: "T",
        matrix: Matrix_T_0,
        colorMatrix: tetrominoDefinition["T_ShapeColor"],
        x: 4,
        y: 35,
        rotation: 0
      }
      movePiece(board, TetrominoPiece, "left");
      expect(TetrominoPiece.x).toBe(3);
      expect(TetrominoPiece.y).toBe(35);
    });
    
    test('Obstructed - Move Left', () => {
      let obstruction_board = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 8, 0, 0, 0, 0, 0],
        [0, 0, 1, 8, 8, 8, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ];
      swapTestBoard(board, obstruction_board);
      TetrominoPiece = {
        name: "T",
        matrix: Matrix_T_0,
        colorMatrix: tetrominoDefinition["T_ShapeColor"],
        x: 4,
        y: 35,
        rotation: 0
      }
      movePiece(board, TetrominoPiece, "left");
      expect(TetrominoPiece.x).toBe(4);
      expect(TetrominoPiece.y).toBe(35);
    });

});