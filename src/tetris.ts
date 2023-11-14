import * as tetrimino from "./tetriminos.js";
import * as wallkicks from "./rotation.js";
import { Position, Tetrimino } from "../types/tetrimino.type.js";

var board: Array<Array<number>> = [
    // 10x40
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
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
];
const canvas = document.getElementById("tetrisgame") as HTMLCanvasElement;
const canvasNext = document.getElementById("tetrisnext") as HTMLCanvasElement;
const canvasBag = document.getElementById("tetrisbag") as HTMLCanvasElement;
const gameCanvas = canvas != null ? canvas.getContext("2d")! : null;
const nextCanvas = canvasBag != null ? canvasNext.getContext("2d")! : null;
const bagCanvas = canvasBag != null ? canvasBag.getContext("2d")! : null;

const boxHeight = 880;
const boxWidth = 400;
const bagHeight = 200;
const bagWidth = 200;

const gameHeight = 22;
const gameWidth = 10;
const paddingY = 18;

const initialX = 4;
const initialY = 19;

const gameOverLine = 19

//Px
const blockHeight = 40;
const blockWidth = 40;

const defaultTetriminoBag: string[] = ["I", "J", "L", "O", "S", "Z", "T"];

var currentTetriminoBag: string[] = [];

var currentTetrimino: Tetrimino = {
    name: "I",
    matrix: tetrimino["I_ShapeMatrix"],
    colorMatrix: tetrimino["I_ShapeColor"],
    x: initialX,
    y: initialY,
    rotation: 0
};
var shadowTetrimino: Tetrimino = {
    name: "I",
    matrix: tetrimino["I_ShapeMatrix"],
    colorMatrix: tetrimino["I_ShapeColor"],
    x: initialX,
    y: initialY,
    rotation: 0
};
var holdTetrimino: Tetrimino | null = null;
var holdSwapped = false;

var comboNumber = -1;

function initGame(): void {
    // Board[row][column]
    // for (let i = 0; i < 40; i++) {
    //     board.push([]);
    //     for (let j = 0; j < 10; j++) {
    //         board[i].push(0);
    //     }
    // }
    // changeTetrimino();
    // renderBoard(board);
}
initGame();

function nextLoop(): void {
    console.log(board);
}

export function renderBoard(board: number[][], drawBoard = true): void {
    for (let i = 0; i < gameHeight + paddingY; i++) {
        for (let j = 0; j < gameWidth; j++) {
            if (board[i][j] === 9 || board[i][j] === 8) {
                board[i][j] = 0;
            }
            if (i > 17 && drawBoard && gameCanvas){
                gameCanvas.fillStyle = tetrimino.colorDictionary[board[i][j]];
                gameCanvas.fillRect(
                    j * blockWidth,
                    (i - paddingY) * blockHeight,
                    blockWidth - 1,
                    blockHeight - 1
                );
            }
        }
    }

    if (currentTetrimino && drawBoard && gameCanvas) {
        gameCanvas.fillStyle = "#FFFFFF";
        gameCanvas.fillRect(0, 2 * blockHeight, boxWidth, 4)

        let [x, y] = [currentTetrimino.x, currentTetrimino.y];

        let shadowPosition: Position = createShadow(board, currentTetrimino);
        [shadowTetrimino.x, shadowTetrimino.y] = [ shadowPosition.x, shadowPosition.y];

        // Draw Tetrimino and Its Shadoow
        currentTetrimino.matrix.forEach((row, indexColumn) => {
            row.forEach((el, indexRow) => {
                if (el == 1) {
                    const middleMargin = Math.ceil(
                        currentTetrimino.matrix.length / 2
                    ) - 1;

                    let yPos = y - middleMargin + indexColumn;
                    let xPos = x - middleMargin + indexRow;
                    let yShadowPos =
                        shadowPosition.y - middleMargin + indexColumn;
                    let xShadowPos = shadowPosition.x - middleMargin + indexRow;

                    if (xPos < 0 || yPos < 0) return;
                    board[yPos][xPos] = 9;
                    board[yShadowPos][xShadowPos] = 8;
                    gameCanvas.fillStyle = tetrimino.colorDictionary[8];
                    gameCanvas.fillRect(
                        xShadowPos * blockWidth,
                        (yShadowPos - paddingY) * blockHeight,
                        blockWidth - 1,
                        blockHeight - 1
                    );
                    gameCanvas.fillStyle = currentTetrimino.colorMatrix;
                    gameCanvas.fillRect(
                        xPos * blockWidth,
                        (yPos - paddingY) * blockHeight,
                        blockWidth - 1,
                        blockHeight - 1
                    );
                }
            });
        });
    }
}

export function movePiece(board: number[][], tetris_piece: Tetrimino, move: "up" | "right" | "down" | "left"): void {
    switch (move) {
        case "up":
            if (haveCollision(board, tetris_piece.matrix, tetris_piece.x, tetris_piece.y, 0, -1)) break;
            tetris_piece.y -= 1;
            break;
        case "right":
            if (haveCollision(board, tetris_piece.matrix, tetris_piece.x, tetris_piece.y, 1, 0)) break;
            tetris_piece.x += 1;
            break;
            case "down":
            if (haveCollision(board, tetris_piece.matrix, tetris_piece.x, tetris_piece.y, 0, 1)) {
                // SetPiece(board, currentTetrimino)
                // changeTetrimino()
                break;
            };
            tetris_piece.y += 1;
            break;
        case "left":
            if (haveCollision(board, tetris_piece.matrix, tetris_piece.x, tetris_piece.y, -1, 0)) break;
            tetris_piece.x -= 1;
            break;
    }
}

export function rotateMatrixClock(board: number[][], tetris_piece: Tetrimino): void {
    let M = JSON.parse(JSON.stringify(tetris_piece.matrix))
    let n = M.length;
    let depth = Math.floor(n / 2);
    for (let i = 0; i < depth; i++) {
        let len = n - 2 * i - 1;
        let opp = n - 1 - i;
        for (let j = 0; j < len; j++) {
            let temp = M[i][i + j];
            M[i][i + j] = M[opp - j][i];
            M[opp - j][i] = M[opp][opp - j];
            M[opp][opp - j] = M[i + j][opp];
            M[i + j][opp] = temp;
        }
    }

    let rotation = checkIfCanRotate(board, tetris_piece, M, mod(tetris_piece.rotation + 1, 4));

    if (rotation !== null) {
        tetris_piece.matrix = M;
        tetris_piece.x += rotation[0]
        tetris_piece.y += rotation[1]
        tetris_piece.rotation = mod(tetris_piece.rotation + 1, 4)
    };
}
// M[i][i + j] -> M[opp - j][i] -> M[opp][opp - j] -> M[i + j][opp] ->
export function rotateMatrixAntiClock(board: number[][], tetris_piece: Tetrimino): void {
    let M = JSON.parse(JSON.stringify(tetris_piece.matrix));
    let n = M.length;
    let depth = Math.floor(n / 2);
    for (let i = 0; i < depth; i++) {
        let len = n - 2 * i - 1;
        let opp = n - 1 - i;
        for (let j = 0; j < len; j++) {
            let temp = M[i][i + j];
            M[i][i + j] = M[i + j][opp];
            M[i + j][opp] = M[opp][opp - j];
            M[opp][opp - j] = M[opp - j][i];
            M[opp - j][i] = temp;
        }
    }

    let rotation = checkIfCanRotate(board, tetris_piece, M, mod(tetris_piece.rotation - 1, 4));

    if (rotation !== null){
        tetris_piece.matrix = M;
        tetris_piece.x += rotation[0]
        tetris_piece.y += rotation[1]
        tetris_piece.rotation = mod(tetris_piece.rotation - 1, 4)
    }
}

function mod(n: number, m: number) {
    return ((n % m) + m) % m;
}

function checkIfCanRotate(board: number[][], tetris_piece: Tetrimino, rotatedMatrix: Array<Array<number>>, newRotation: number) : number[] | null {
    let rotationString = tetris_piece.rotation.toString() + newRotation.toString();
    let rulenumber = wallkicks.wallkickDictionary[rotationString];
    let ruleset: number[][];
    switch(tetris_piece.name){
        case "J":
        case "L":
        case "S":
        case "Z":
        case "T":
            ruleset = wallkicks.wallkicks_JLSTZ[rulenumber];
            break;
        case "I":
            ruleset = wallkicks.wallkicks_I[rulenumber];
            break;
        default:
            return null;
    }

    for (let i = 0; i < ruleset.length; i++) {
        const rule = ruleset[i];
        const [currentX, currentY] = [tetris_piece.x, tetris_piece.y]
        let collision = haveCollision(board, rotatedMatrix, currentX, currentY, rule[0], rule[1] * -1)
        if (!collision){
            return [rule[0], rule[1] * -1]
        }
    }
    return null;
}

type TetriminoType = "I" | "J" | "L" | "O" | "S" | "Z" | "T";
function changeTetrimino(): void {
    // Set new Piece
    let newTetriminoName = getTetriminoFromBag();
    let newTetrimino : Tetrimino = {
        name: newTetriminoName,
        matrix: tetrimino[`${newTetriminoName}_ShapeMatrix`],
        colorMatrix: tetrimino[`${newTetriminoName}_ShapeColor`],
        rotation: 0,
        x: initialX,
        y: initialY
    }
    currentTetrimino = newTetrimino;

    let nextTetriminoName = currentTetriminoBag[currentTetriminoBag.length - 1] as TetriminoType;
    let nextTetrimino : Tetrimino = {
        name: nextTetriminoName,
        matrix: tetrimino[`${nextTetriminoName}_ShapeMatrix`],
        colorMatrix: tetrimino[`${nextTetriminoName}_ShapeColor`],
        rotation: 0,
        x: initialX,
        y: initialY
    }

    if (nextCanvas) drawTetriminoCanvasInfo(nextCanvas, nextTetrimino)
}

function getTetriminoFromBag() : TetriminoType{
    if (currentTetriminoBag.length === 0) {
        currentTetriminoBag = defaultTetriminoBag
            .slice() // Copia Array
            .sort(() => Math.random() - 0.5); // Shuffle Array
    }
    let temp_tetrisPiece = currentTetriminoBag.pop() as TetriminoType;
    if (currentTetriminoBag.length === 0) {
        currentTetriminoBag = defaultTetriminoBag
            .slice() // Copia Array
            .sort(() => Math.random() - 0.5); // Shuffle Array
    }
    return temp_tetrisPiece;
}

function drawTetriminoCanvasInfo(canvas: CanvasRenderingContext2D, nextTetrimino: Tetrimino) : void{
    canvas.clearRect(0, 0, 200, 200);

    let xOffset = (bagWidth - (nextTetrimino.matrix.length * blockWidth)) / 2;
    let yOffset = (bagHeight - (nextTetrimino.matrix.length * blockHeight)) / 2;

    nextTetrimino.matrix.forEach((row, indexColumn) => {
        row.forEach((el, indexRow) => {
            if (el == 1) {
                let yPos = indexColumn;
                let xPos = indexRow;
                canvas.fillStyle = nextTetrimino.colorMatrix;
                canvas.fillRect(
                    xOffset + ( xPos * blockWidth ),
                    yOffset + ( yPos * blockHeight ),
                    blockWidth - 1,
                    blockHeight - 1
                );
            }
        });
    });
}

function holdPiece(): void{
    // Block Hold if it has been swapped
    // Reset when Piece is setted
    if(holdSwapped === true) return;

    let temp_hold : Tetrimino | null = holdTetrimino !== null ? {...holdTetrimino} : null;
    holdTetrimino = {...currentTetrimino};

    if (bagCanvas) drawTetriminoCanvasInfo(bagCanvas, holdTetrimino)

    if(temp_hold !== null) {
        holdSwapped = true;

        currentTetrimino.name = temp_hold.name;
        currentTetrimino.matrix = temp_hold.matrix;
        currentTetrimino.colorMatrix = temp_hold.colorMatrix;
        currentTetrimino.rotation = 0;
        currentTetrimino.x = initialX;
        currentTetrimino.y = initialY;
    }else{
        changeTetrimino()
    }
}

function SetPiece(): void{
    holdSwapped = false; // reset Hold

    currentTetrimino.matrix.forEach((row, indexColumn) => {
        row.forEach((el, indexRow) => {
            if (el == 1) {
                const middleMargin = Math.ceil(
                    currentTetrimino.matrix.length / 2
                ) - 1;
                let yPos = currentTetrimino.y - middleMargin + indexColumn;
                let xPos = currentTetrimino.x - middleMargin + indexRow;

                if (xPos < 0 || yPos < 0) return;
                board[yPos][xPos] = tetrimino.tetriminoDictionary[currentTetrimino.name];
            }
        });
    });
    checkLineComplete();
    changeTetrimino();
}

function checkLineComplete(){
    let currentPiece_YPosition : number[] = [];
    currentTetrimino.matrix.forEach((row, indexColumn) => {
        row.forEach((el, indexRow) => {
            if (el == 1) {
                const middleMargin = Math.ceil(
                    currentTetrimino.matrix.length / 2
                ) - 1;
                let yPos = currentTetrimino.y - middleMargin + indexColumn;
                if(!currentPiece_YPosition.includes(yPos)){
                    currentPiece_YPosition.push(yPos);
                }
            }
        });
    });
    currentPiece_YPosition = currentPiece_YPosition.filter(ypos => {
        let lineBoard = board[ypos];
        if(lineBoard.every( el => el !== 0)){
            return true;
        }
        return false;
    })
    
    // There is completed lines
    if(currentPiece_YPosition.length !== 0){
        comboHandler(true);

        currentPiece_YPosition.forEach((el, index) => {
            setTimeout(() => {
                shiftDown(el, 1);
                renderBoard(board);
            }, 70 * (index))
        })
    } else {
        comboHandler(false);
    }
}
function shiftDown(yPos: number, numShift: number){
    let aboveShift = (JSON.parse(JSON.stringify(board)) as number[][]).slice(0, yPos);
    aboveShift.forEach((rowEl, columnIndex) => {
        rowEl.forEach((el, rowIndex) => {
            board[columnIndex + numShift][rowIndex] = el;
        })
    })
}

function comboHandler(didCombo: boolean): void{
    if(!didCombo) comboNumber = -1;
    else {
        comboNumber += 1;
    }
}

function checkGameOver(): void{
    let threshold = board[gameOverLine];
    
    if (threshold.some(el => el !== 0)){
        console.log(true);    
    }
}

function DropPiece(): void {
    [currentTetrimino.x, currentTetrimino.y] = [ shadowTetrimino.x, shadowTetrimino.y];
}

function createShadow(board: number[][], tetris_piece: Tetrimino): Position {
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

function haveCollision(
    board: number[][],
    matrix: number[][],
    currentX: number,
    currentY: number,
    moveX: number,
    moveY: number
): boolean {
    for ( let indexColumn = 0; indexColumn < matrix.length; indexColumn++ ) {
        for ( let indexRow = 0; indexRow < matrix[indexColumn].length; indexRow++ ) {

            const middleMargin = Math.ceil(matrix.length / 2) - 1;
            const el = matrix[indexColumn][indexRow];
            if (el === 1) {
                let yPos = currentY - middleMargin + indexColumn;
                let xPos = currentX - middleMargin + indexRow;
                // if (yPos + moveY < 16 || yPos + moveY > 39) return true;
                if (yPos + moveY < 18 || yPos + moveY > 39) return true;
                if (xPos + moveX < 0 || xPos + moveX > 9) return true;
                let newPosition = board[yPos + moveY][xPos + moveX];

                if (
                    newPosition !== 9 &&
                    newPosition !== 0 &&
                    newPosition !== 8
                ) {
                    return true;
                }
            }
        }
    }

    return false;
}

document.addEventListener("keydown", (e: KeyboardEvent) => {
    switch (e.key) {
        case "z":
            break;
        case "x":
            DropPiece();
            SetPiece();
            break;
        case "a":
            rotateMatrixAntiClock(board, currentTetrimino);
            break;
        case "s":
            rotateMatrixClock(board, currentTetrimino);
            break;
        case "c":
            console.log(board);
            break;
        case "d":
            changeTetrimino()
            break;
        case "v":
            console.log(currentTetriminoBag);
            break;
        case "q":
            holdPiece();
            break;
        case " ":
            // shiftDown(35, 1);
            // checkLineComplete();
            SetPiece();
            // checkGameOver();
            // nextLoop();
            break;
        case "ArrowUp":
            movePiece(board, currentTetrimino, "up");
            break;
        case "ArrowLeft":
            movePiece(board, currentTetrimino, "left");
            break;
        case "ArrowRight":
            movePiece(board, currentTetrimino, "right");
            break;
        case "ArrowDown":
            movePiece(board, currentTetrimino, "down");
            break;
        default:
            break;
    }
    renderBoard(board);
});
