import * as tetrimino from "./tetriminos.js";
import * as wallkicks from "./rotation.js";
import { Position, Tetrimino } from "../types/tetrimino.type.js";
// import { haveCollision } from "./collision.js";
// import { createShadow } from "./shadow.js";

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
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
    [1, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [1, 1, 0, 1, 1, 1, 1, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
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
    name: "T",
    matrix: tetrimino["T_ShapeMatrix"],
    colorMatrix: tetrimino["T_ShapeColor"],
    x: initialX,
    y: initialY,
    rotation: 0
};
var shadowTetrimino: Tetrimino = {
    name: "T",
    matrix: tetrimino["T_ShapeMatrix"],
    colorMatrix: tetrimino["T_ShapeColor"],
    x: initialX,
    y: initialY,
    rotation: 0
};
var holdTetrimino: Tetrimino | null = null;
var holdSwapped = false;

var score = 0;
var highscore = 0;
var highscoreBeaten = false;

var timeoutTransitionPopUpMessage : NodeJS.Timeout;
var timeoutDisplayPopUpMessage : NodeJS.Timeout;

var combo_Number = -1;
var dropHeight = 0;

var tspin = false;
var mini_tspin = false;

var rAF = null;
var framesDrop = 0;

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
    if (document.getElementById("scoreValue")) document.getElementById("scoreValue")!.innerText = score.toString();
    if (document.getElementById("highScoreValue")) document.getElementById("highScoreValue")!.innerText = highscore.toString();
}
initGame();

function nextLoop(): void {
    renderBoard();

    if(++framesDrop > 35){
        if(haveCollision(board, currentTetrimino.matrix, currentTetrimino.x, currentTetrimino.y, 0, 1)){
            SetPiece();
            
        }else{
            currentTetrimino.y += 1;
            framesDrop = 0;
        }
    }

    rAF = requestAnimationFrame(() => nextLoop())
}

function renderBoard(drawBoard = true): void {
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

    let rotationOffset = checkIfCanRotate(board, tetris_piece, M, mod(tetris_piece.rotation + 1, 4));
    if (rotationOffset !== null) {
        tetris_piece.matrix = M;
        tetris_piece.x += rotationOffset.x;
        tetris_piece.y += rotationOffset.y;
        tetris_piece.rotation = mod(tetris_piece.rotation + 1, 4);

        if (tetris_piece.name === "T") checkTSpin(board, tetris_piece, rotationOffset);
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

    let rotationOffset = checkIfCanRotate(board, tetris_piece, M, mod(tetris_piece.rotation - 1, 4));
    if (rotationOffset !== null){
        tetris_piece.matrix = M;
        tetris_piece.x += rotationOffset.x;
        tetris_piece.y += rotationOffset.y;
        tetris_piece.rotation = mod(tetris_piece.rotation - 1, 4);
        
        if (tetris_piece.name === "T") checkTSpin(board, tetris_piece, rotationOffset);
    }
}

function mod(n: number, m: number) {
    return ((n % m) + m) % m;
}

function checkIfCanRotate(board: number[][], tetris_piece: Tetrimino, rotatedMatrix: Array<Array<number>>, newRotation: number) : Position | null {
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
            return {
                x: rule[0],
                y: rule[1] * -1
            }
        }
    }
    return null;
}

interface frontBackTBlock {
    front: Position[]
    back: Position[]
}

export const TSpinDictionary: { [rotation: number]: frontBackTBlock } = {
    0: {front: [{ x: 0, y: 0 }, { x: 0, y: 2 }], back: [{ x: 2, y: 0 }, { x: 2, y: 2 }]},
    1: {front: [{ x: 0, y: 2 }, { x: 2, y: 2 }], back: [{ x: 0, y: 0 }, { x: 2, y: 0 }]},
    2: {front: [{ x: 2, y: 0 }, { x: 2, y: 2 }], back: [{ x: 0, y: 0 }, { x: 0, y: 2 }]},
    3: {front: [{ x: 0, y: 0 }, { x: 2, y: 0 }], back: [{ x: 2, y: 0 }, { x: 2, y: 2 }]}
}

/**
 * Something is a TSpin if:
 *  - Had a successful rotation
 *  - Is using a T Block.
 * 
 * And TSpins have 2 variations.
 * Standard TSpin: In the 3x3 matrix. Two block-corners are filled at the front (Opposite to flatside), and at least one block-corner filled at the back.
 * Mini TSpin: In the 3x3 matrix. Two block-corners are filled at the back (flatside), and at least one block-corner filled at the front.
 * If the offset used as a movement for the rotation is the test 5 (variation of 1 and 2). It is a T-Spin, although it might had been a Mini TSpin setup.
 * @param board Board of the game
 * @param tetris_piece Current Tetrimino
 * @param movement Movement offset
 */

function checkTSpin(board: number[][], tetris_piece: Tetrimino, movement: Position){
    let frontBackPositions = TSpinDictionary[tetris_piece.rotation];
    let matrix: number[][] = [];
    tspin = false;
    mini_tspin = false;

    tetris_piece.matrix.forEach((row, indexColumn) => {
        matrix.push([]);
        row.forEach((el, indexRow) => {
            const middleMargin = Math.ceil(
                currentTetrimino.matrix.length / 2
            ) - 1;
            let yPos = currentTetrimino.y - middleMargin + indexColumn;
            let xPos = currentTetrimino.x - middleMargin + indexRow;
            
            if (xPos < 0 || yPos < 0) matrix[indexColumn].push(1);
            else if (xPos >= gameWidth || yPos >= gameHeight + paddingY) matrix[indexColumn].push(1);
            else matrix[indexColumn].push(board[yPos][xPos]);
        });
    });
    let front = frontBackPositions.front;
    let back = frontBackPositions.back;
    let frontPosition = [matrix[front[0].y][front[0].x], [front[1].y][front[1].x]]
    let backPosition = [matrix[back[0].y][back[0].x], matrix[back[1].y][back[1].x]]

    if(frontPosition.every(el => el !== 0) && backPosition.some(el => el !== 0)){
        tspin = true;
        console.log("tspin!")
    } else if(frontPosition.some(el => el !== 0) && backPosition.every(el => el !== 0)){
        mini_tspin = true;
        console.log("mini_tspin!")
    }
    
    let [xMov, yMov] = [Math.abs(movement.x), Math.abs(movement.y)];
    if ((xMov === 1 && yMov === 2) || (xMov === 2 && yMov === 1)){
        tspin = true;
        mini_tspin = false;
    }
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

    holdSwapped = true;
    if(temp_hold !== null) {

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

                if (xPos < 0 || yPos < 0 || xPos >= gameWidth || yPos >= gameHeight + paddingY) return;
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
        if(lineBoard.every( el => el !== 0 && el !== 8)){
            return true;
        }
        return false;
    })

    scoreHandler(currentPiece_YPosition.length);
    
    // There is completed lines
    currentPiece_YPosition.forEach((el, index) => {
        setTimeout(() => {
            shiftDown(el, 1);
            renderBoard();
        }, 70 * (index)) // Time delay
    })
}
function shiftDown(yPos: number, numShift: number){
    let aboveShift = (JSON.parse(JSON.stringify(board)) as number[][]).slice(0, yPos);
    aboveShift.forEach((rowEl, columnIndex) => {
        rowEl.forEach((el, rowIndex) => {
            board[columnIndex + numShift][rowIndex] = el;
        })
    })
}

function scoreHandler(clearLinesNumber: number = 0): void{
    if(clearLinesNumber === 0){ // Combo Break;
        if(combo_Number > 0){
            let comboValue = combo_score.slice(0, combo_Number + 1)
            const sumCombo = comboValue.reduce((acc, current) => {
                return acc + current
            }, 0)
            if(combo_Number > combo_score.length) increaseScoreHandler((sumCombo + ((combo_Number - combo_score.length) * 5)) * 50);
            else increaseScoreHandler(sumCombo * 50);
        }
        combo_Number = -1;
    } else {
        combo_Number += 1;
    }

    if( tspin === false && mini_tspin === false ){
        increaseScoreHandler(normal_score[clearLinesNumber])
        switch(clearLinesNumber){
            case 1:
                popMessage("Single", 1)
                break;
            case 2:
                popMessage("Double", 2)
                break;
            case 3:
                popMessage("Triple", 3)
                break;
            case 4:
                popMessage("Tetris!", 4) // Difficult Clear
                break;
            default:
                break;
        }
    }else{
        if( tspin ){
            increaseScoreHandler(tspin_score[clearLinesNumber])
            switch(clearLinesNumber){
                case 0:
                    popMessage("T-Spin!", 3)
                    break;
                case 1:
                    popMessage("Single T-Spin!", 4) // Difficult Clear
                    break;
                case 2:
                    popMessage("Double T-Spin!", 4) // Difficult Clear
                    break;
                case 3:
                    popMessage("Triple T-Spin!", 4) // Difficult Clear
                    break;
                default:
                    break;
            }
        }
        if ( mini_tspin ){
            increaseScoreHandler(mini_tspin_score[clearLinesNumber])
            switch(clearLinesNumber){
                case 0:
                    popMessage("Mini T-Spin!", 2)
                    break;
                case 1:
                    popMessage("Single Mini T-Spin!", 4) // Difficult Clear
                    break;
                case 2:
                    popMessage("Double Mini T-Spin!", 4) // Difficult Clear
                    break;
                case 3:
                    popMessage("Triple Mini T-Spin!", 4) // Difficult Clear also impossible
                    break;
                default:
                    break;
            }
        }
    }

    // HardDrop Score
    if(dropHeight != 0){
        increaseScoreHandler(2 * dropHeight);
    }    
    // console.log(clearLinesNumber + " number!")
    // console.log(tspin + " with tspin!")
    // console.log(mini_tspin + " with mini-tspin!")
}
const normal_score = [100, 300, 500, 800]
const mini_tspin_score = [100, 200, 400, 800]
const tspin_score = [400, 800, 1200, 1600]
const combo_score = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 4, 5, 5, 5] // * 50

function increaseScoreHandler(pointIncrease: number): void{
    const newScore = score + pointIncrease;

    addScoreCounter("scoreValue", score, newScore)
    score = newScore;

    if(newScore > highscore){
        addScoreCounter("highScoreValue", highscore, newScore);
        highscore = newScore;
        highscoreBeaten = true;
    }
}

// https://stackoverflow.com/questions/16994662/count-animation-from-number-a-to-b
function addScoreCounter(id: string, startPoint: number, endPoint: number) : void {

    var obj = document.getElementById(id)!;
    const range = endPoint - startPoint;
    // const end = startPoint + pointIncrease;
    // no timer shorter than 50ms (not really visible any way)
    var minTimer = 50;
    const duration = 300;
    // calc step time to show all interediate values
    var stepTime = Math.abs(Math.floor(duration / range));
    
    // never go below minTimer
    stepTime = Math.max(stepTime, minTimer);
    
    // get current time and calculate desired end time
    var startTime = new Date().getTime();
    var endTime = startTime + duration;
    var timer : NodeJS.Timeout;
  
    function run() {
        var now = new Date().getTime();
        var remaining = Math.max((endTime - now) / duration, 0);
        var value = Math.round(endPoint - (remaining * range));
        obj.innerText = value.toString();
        if (value == endPoint) {
            clearInterval(timer);
        }
    }
    timer = setInterval(run, stepTime);
    run();
}

function popMessage(message: string, levelMessage: number){
    const popMessage = document.getElementById("popUpMessage")!;
    popMessage.innerText = message;
    popMessage.classList.add("popup");
    if(levelMessage > 3) popMessage.classList.add("rainbowText");
    clearTimeout(timeoutTransitionPopUpMessage)
    clearTimeout(timeoutDisplayPopUpMessage)
    timeoutTransitionPopUpMessage = setTimeout(() => {
        popMessage.classList.remove("popup");
    }, 150)
    timeoutDisplayPopUpMessage = setTimeout(() => {
        popMessage.innerText = "";
        if(levelMessage > 3) popMessage.classList.remove("rainbowText");
    }, 2000)
}

function checkGameOver(): void{
    let threshold = board[gameOverLine];
    
    if (threshold.some(el => el !== 0)){
        console.log(true);    
    }
}

function DropPiece(): void {
    [currentTetrimino.x, currentTetrimino.y] = [ shadowTetrimino.x, shadowTetrimino.y];
    dropHeight = shadowTetrimino.y - currentTetrimino.y;
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
                if (yPos + moveY <= gameOverLine || yPos + moveY >= gameHeight + paddingY) return true;
                if (xPos + moveX < 0 || xPos + moveX >= gameWidth) return true;
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
            // console.log(board);
            increaseScoreHandler(100)
            break;
        case "d":
            changeTetrimino()
            break;
        case "v":
            // console.log(currentTetriminoBag);
            // combo_Number = 14
            popMessage("teste", 4);
            break;
        case "q":
            holdPiece();
            break;
        case " ":
            // shiftDown(35, 1);
            // checkLineComplete();
            // SetPiece();
            // checkGameOver();
            // nextLoop();
            checkTSpin(board, currentTetrimino, {x: 3, y: 2});
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
    renderBoard();
});
