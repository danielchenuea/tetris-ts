import * as tetrimino from "./tetriminos.js";
import * as wallkicks from "./rotation.js";
import { Position, Tetrimino } from "../types/tetrimino.type.js";
import { transitionTwoNumbers } from "./utils/twoNumberTransition.js";
import { getScoreStorage, setScoreStorage } from "./utils/localstorageHandler.js";
import { hideMenu, showMenu } from "./utils/showhideMenu.js";

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
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
];

// ===== Canvas Related =====

const canvas = document.getElementById("tetrisgame") as HTMLCanvasElement;  
const canvasNext = document.getElementById("tetrisnext") as HTMLCanvasElement;
const canvasBag = document.getElementById("tetrisbag") as HTMLCanvasElement;
const gameCanvas = canvas != null ? canvas.getContext("2d")! : null;
const nextCanvas = canvasBag != null ? canvasNext.getContext("2d")! : null;
const bagCanvas = canvasBag != null ? canvasBag.getContext("2d")! : null;

// ===== Game Related Constants =====

const boxWidth = 400;       // Board Pixels X
const boxHeight = 880;      // Board Pixels Y
const bagWidth = 200;       // Bag/Next Pixels X
const bagHeight = 200;      // Bag/Next Pixels Y
const blockWidth = 40;      // Block Pixels X
const blockHeight = 40;     // Block Pixels Y

const gameWidth = 10;       // Boardgame Spaces X
const gameHeight = 22;      // Boardgame Spaces Y
const paddingY = 18;        // Space above board Game

const initialX = 4;         // Initial Position for Tetrimino
const initialY = 19;

const gameOverLine = 19     // Which Line is checked for gameover

// ===== Menu Related =====

const menuDelay = 200;

// ===== Bag =====

const defaultTetriminoBag: string[] = ["I", "J", "L", "O", "S", "Z", "T"];

var currentTetriminoBag: string[] = [];

// ===== Tetrimino Related =====

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

// ===== PopUp Messages =====

var timeoutTransitionPopUpMessage : NodeJS.Timeout;
var timeoutDisplayPopUpMessage : NodeJS.Timeout;

// ===== Left/Right Drift =====

const rapidFireInterval = 50;
var intervalLeftArrow : NodeJS.Timeout;
var intervalRightArrow : NodeJS.Timeout;
var intervalLeft = false;
var intervalRight = false;

// ===== Infinity =====

var colliding = false;
var infinitySpeed = [15, 30, 72];
var infinityCounter = 0;

// ===== Score Related =====

var score = 0;
var highscore = 0;
var highscoreBeaten = false;

var combo_Number = -1;
var hardCombo = false;
var hardDropHeight = 0;
var softDropHeight = 0;
var activateSoftDrop = false;

const normal_score = [0, 100, 300, 500, 800]                // No Line, Single, Double, Triple, Tetris
const mini_tspin_score = [100, 200, 400, 800, 0]            // Mini Spin 0 Line, 1 Line, 2 Lines, 3 Lines.
const tspin_score = [400, 800, 1200, 1600, 0]               // Spin 0 Line, 1 Line, 2 Lines, 3 Lines
const perfect_clear_score = [0, 800, 1200, 1800, 2000, 3200]   // No Line, Single, Double, Triple, Tetris, Hard Combo
const combo_score = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 4, 5, 5, 5] // * 50

var tspin = false;
var mini_tspin = false;

// ===== Difficulty and speed related =====
var RAF : number | null = null;
var framesDrop = 0;
var dropThreshold = 35;
var normalDropSpeed = [
    [23, 18, 13],
    [45, 35, 25],
    [108, 84, 60],
];
var fastDropSpeed = [
    [18, 13, 8],
    [35, 25, 15],
    [84, 60, 36],
];
var fps = "1";
var difficulty = "1";

// ===== Start/End Routine =====

var gameover = true;


/**
 * Start Game Routine. Reset everything needed.
 * @returns {void}
 */
export function initGame(): void {
    // Board[row][column]
    board = [];
    for (let i = 0; i < gameHeight + paddingY; i++) {
        board.push([]);
        for (let j = 0; j < gameWidth; j++) {
            board[i].push(0);
        }
    }

    // Set FPS; Set Difficulty
    dropThreshold = normalDropSpeed[parseInt(fps)][parseInt(difficulty)]

    // Reset Score related stuff
    $("#newRecord").hide();
    setScoreStorage("tetrists-currentscore", 0)
    score = 0;
    highscore = getScoreStorage("tetrists-highscore");
    if (document.getElementById("scoreValue")) document.getElementById("scoreValue")!.innerText = score.toString();
    if (document.getElementById("highScoreValue")) document.getElementById("highScoreValue")!.innerText = highscore.toString();

    //reset bag
    currentTetriminoBag = [];
    changeTetrimino();

    // Reset Gameover
    gameover = false;

    // Start the loop.
    nextLoop();
}


/**
 * Check if the GameOver Condition is fulfilled. 
 * There are other ways to get a Game Over that could be implemented in the future.
 * @returns {void}
 */
function checkGameOver(): void{
    let threshold = board[gameOverLine];
    if (threshold.some(el => el !== 0)){ 
        endGame();
    }
}

/**
 * Main EndGame Routine. Stop everything, and show gameover Menu.
 * @returns {void}
 */
function endGame(): void{
    if (RAF != null) cancelAnimationFrame(RAF)
    gameover = true;

    showMenu("gameOverMenu", () => {

        if(highscoreBeaten){
            $("#newRecord").show();
        }

        transitionTwoNumbers("scoreGameOver", 0, getScoreStorage("tetrists-currentscore"), { transitionDelay: 600 })
        transitionTwoNumbers("highScoreGameOver", 0, getScoreStorage("tetrists-highscore"), { transitionDelay: 600 })
    })

}

/**
 * Main Loop. For every frame, render board and check for collision.
 * @returns {void}
 */
function nextLoop(): void {
    // Infinity System
    if(colliding){
        if(++infinityCounter > infinitySpeed[parseInt(fps)]){
            SetPiece();
            colliding = false;
        }
    }

    if(++framesDrop > dropThreshold){
        if(haveCollision(board, currentTetrimino.matrix, currentTetrimino.x, currentTetrimino.y, 0, 1)){

            colliding = true;
        }else{
            currentTetrimino.y += 1;
            if(activateSoftDrop) softDropHeight++;
        }
        framesDrop = 0;
    }
    renderBoard();
    if(!gameover){
        RAF = requestAnimationFrame(() => nextLoop())
    }
}

/**
 * Draw the canvas board, the controlled tetrimino and its shadow. 
 * @param {boolean} drawBoard Whether draw the board in the canvas or not. Originally used for tests, but not useful anymore.
 * @returns {void}
 */
function renderBoard(drawBoard = true): void {
    if(gameCanvas) gameCanvas.clearRect(0, 0, boxWidth, boxHeight)
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

/**
 * This function allows the player to move the current tetrimino on the board.
 * If the movement is blocked by collision, It does not move.
 * @param {number[][]} board Main board used for the game.
 * @param {Tetrimino} tetris_piece Current Tetrimino.
 * @param {string} move which direction you want to move.
 * @returns {void}
 */
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
            if (haveCollision(board, tetris_piece.matrix, tetris_piece.x, tetris_piece.y, 0, 1)) break;
            tetris_piece.y += 1;
            break;
        case "left":
            if (haveCollision(board, tetris_piece.matrix, tetris_piece.x, tetris_piece.y, -1, 0)) break;
            tetris_piece.x -= 1;
            break;
    }
}

/**
 * This function rotates the Tetrimino's Matrix Clock Wise.
 * Afterwards, it checks if it can be rotated on the board.
 * If it can rotates. The Tetrimino Rotates and resets the infinity counter.
 * Also checks a T-Spin Happen.
 * @param {number[][]} board Main board used for the game.
 * @param {Tetrimino} tetris_piece Current Tetrimino.
 * @returns {void}
 */
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
    // It does rotate
    if (rotationOffset !== null) {
        infinityCounter = 0;
        tetris_piece.matrix = M;
        tetris_piece.x += rotationOffset.x;
        tetris_piece.y += rotationOffset.y;
        tetris_piece.rotation = mod(tetris_piece.rotation + 1, 4);

        if (tetris_piece.name === "T") checkTSpin(board, tetris_piece, rotationOffset);
    };
}

/**
 * This function rotates the Tetrimino's Matrix Anti-Clock Wise.
 * Afterwards, it checks if it can be rotated on the board.
 * If it can rotates. The Tetrimino Rotates and resets the infinity counter.
 * Also checks a T-Spin Happen.
 * @param {number[][]} board Main board used for the game.
 * @param {Tetrimino} tetris_piece Current Tetrimino.
 * @returns {void}
 */
export function rotateMatrixAntiClock(board: number[][], tetris_piece: Tetrimino): void {
    // M[i][i + j] -> M[opp - j][i] -> M[opp][opp - j] -> M[i + j][opp] ->
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
    // It does rotate
    if (rotationOffset !== null){
        infinityCounter = 0;
        tetris_piece.matrix = M;
        tetris_piece.x += rotationOffset.x;
        tetris_piece.y += rotationOffset.y;
        tetris_piece.rotation = mod(tetris_piece.rotation - 1, 4);
        
        if (tetris_piece.name === "T") checkTSpin(board, tetris_piece, rotationOffset);
    }
}
/**
 * Module function. Return the mod of N % M. It does wrap negative numbers.
 * @param {number} n 
 * @param {number} m 
 * @returns {number}
 */
function mod(n: number, m: number): number {
    return ((n % m) + m) % m;
}

/**
 * This function is used to get different rulesets based on the Tetrimino.
 * Based on the ruleset, check if it can be rotated.
 * If a successfull rotation is found, return the position.
 * If not, return null.
 * @param {number[][]} board Main Board used for the game.
 * @param {Tetrimino} tetris_piece Current Tetrimino
 * @param {number[][]} rotatedMatrix The Current Tetrimino's Matrix, but rotated.
 * @param {number} newRotation The new rotation number, which represents the rotatedMatrix.
 * @returns {Position | null}
 */
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
const TSpinDictionary: { [rotation: number]: frontBackTBlock } = {
    0: {front: [{ x: 0, y: 0 }, { x: 0, y: 2 }], back: [{ x: 2, y: 0 }, { x: 2, y: 2 }]},
    1: {front: [{ x: 0, y: 2 }, { x: 2, y: 2 }], back: [{ x: 0, y: 0 }, { x: 2, y: 0 }]},
    2: {front: [{ x: 2, y: 0 }, { x: 2, y: 2 }], back: [{ x: 0, y: 0 }, { x: 0, y: 2 }]},
    3: {front: [{ x: 0, y: 0 }, { x: 2, y: 0 }], back: [{ x: 2, y: 0 }, { x: 2, y: 2 }]}
}

/**
 * Something is a TSpin if:
 *  - Had a successful rotation
 *  - Is using a T Block.
 *  - Fulfill the TSpin Variation.
 * 
 * And TSpins have 2 variations.
 * Standard TSpin: In the 3x3 matrix. Two block-corners are filled at the front (Opposite to flatside), and at least one block-corner filled at the back.
 * Mini TSpin: In the 3x3 matrix. Two block-corners are filled at the back (flatside), and at least one block-corner filled at the front.
 * If the offset used as a movement for the rotation is the test 5 (variation of 1 and 2). It is a T-Spin, although it might had been a Mini TSpin setup.
 * @param board Board of the game
 * @param tetris_piece Current Tetrimino
 * @param movement Movement offset
 * @returns {void}
 */
function checkTSpin(board: number[][], tetris_piece: Tetrimino, movement: Position) : void {
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
    } else if(frontPosition.some(el => el !== 0) && backPosition.every(el => el !== 0)){
        mini_tspin = true;
    }
    
    let [xMov, yMov] = [Math.abs(movement.x), Math.abs(movement.y)];
    if ((xMov === 1 && yMov === 2) || (xMov === 2 && yMov === 1)){
        tspin = true;
        mini_tspin = false;
    }
}

type TetriminoType = "I" | "J" | "L" | "O" | "S" | "Z" | "T";
/**
 * This function Swap the current Tetrimino for the next one.
 * It Happens: 
 * - When the current Tetrimino is setted on the board.
 * - When the game Starts. (Going from the default Tetrimino for a random one)
 * - When a Tetrimino is Holded, allowing for next one to come.
 * 
 * This function also sets the Next Tetrimino in line and draws it into the canvas.
 * @returns {void}
 */
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

/**
 * This function handle the bag. Popping the next tetrimino and refilling when necessary.
 * The bag is refilled randomly.
 * @returns {TetriminoType}
 */
function getTetriminoFromBag() : TetriminoType{
    if (currentTetriminoBag.length === 0) {
        currentTetriminoBag = defaultTetriminoBag
            .slice() // Copy Array
            .sort(() => Math.random() - 0.5); // Shuffle Array
    }
    let temp_tetrisPiece = currentTetriminoBag.pop() as TetriminoType;
    if (currentTetriminoBag.length === 0) {
        currentTetriminoBag = defaultTetriminoBag
            .slice() // Copy Array
            .sort(() => Math.random() - 0.5); // Shuffle Array
    }
    return temp_tetrisPiece;
}

/**
 * This a general function used for drawing tetriminos in the canvas.
 * Used for the the Holding Canvas and Next Canvas. 
 * @param {CanvasRenderingContext2D} canvas The Canvas which will be drawn upon.
 * @param {Tetrimino} nextTetrimino The Tetrimino which will be in the canvas.
 * @returns {void}
 */
function drawTetriminoCanvasInfo(canvas: CanvasRenderingContext2D, tetrimino: Tetrimino) : void{
    canvas.clearRect(0, 0, 200, 200);
    let xOffset = (bagWidth - (tetrimino.matrix.length * blockWidth)) / 2;
    let yOffset = (bagHeight - (tetrimino.matrix.length * blockHeight)) / 2;
    tetrimino.matrix.forEach((row, indexColumn) => {
        row.forEach((el, indexRow) => {
            if (el == 1) {
                let yPos = indexColumn;
                let xPos = indexRow;
                canvas.fillStyle = tetrimino.colorMatrix;
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

/**
 * This function allows the player to hold the Tetrimino Piece and skip to the next.
 * The 'Next' being a new Tetrimino or an already holded one.
 * @returns {void}
 */
function holdPiece(): void{
    // Block Hold if it has been swapped
    // Reset when Piece is setted
    if(holdSwapped === true) return;

    let temp_hold : Tetrimino | null = holdTetrimino !== null ? {...holdTetrimino} : null;
    holdTetrimino = {...currentTetrimino};

    if (bagCanvas) drawTetriminoCanvasInfo(bagCanvas, holdTetrimino)

    holdSwapped = true;
    if(temp_hold !== null) { // If it has Tetrimino
        currentTetrimino.name = temp_hold.name;
        currentTetrimino.matrix = temp_hold.matrix;
        currentTetrimino.colorMatrix = temp_hold.colorMatrix;
        currentTetrimino.rotation = 0;
        currentTetrimino.x = initialX;
        currentTetrimino.y = initialY;
    }else{                  // if it does not contain a Tetrimino (Only in the first hold)
        changeTetrimino()
    }
}

/**
 * This function allows the player to set a piece on the board.
 * This way, the game board can be filled and combos be made.
 * @returns {void}
 */
function SetPiece(): void{
    holdSwapped = false; // reset Hold
    clearInterval(intervalLeftArrow);
    clearInterval(intervalRightArrow);

    checkGameOver();
    if(gameover) return;

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
    resetStateTSpin();
}

/**
 * Reset the TSpin detection state.
 * @returns {void}
 */
function resetStateTSpin(): void{
    tspin = false;
    mini_tspin = false;
}


/**
 * This function checks if there are Completed Lines after a Piece is Setted.
 * If it does, an array is created containing the y position of all lines.
 * Afterwards, this lines are removed.
 * With the completed lines, the points are added to the score.
 * @returns {void}
 */
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
    
    // There is completed lines
    currentPiece_YPosition.forEach((el, index) => {
        setTimeout(() => {
            shiftBoardDown(el, 1);
            renderBoard();
        }, 70 * (index)) // Time delay
    })
    // Wait for the lines to dissapear. Important for Perfect Clear.
    setTimeout(() => {
        scoreHandler(currentPiece_YPosition.length, checkPerfectClear());
    }, 70 * currentPiece_YPosition.length)

}

/**
 * This function shifts an line and everything above it down.
 * This way, lines will be overlapped and erased. 
 * @param {number} yPos Which line and above should be moved.
 * @param {number} numShift How many lines should be overlapped.
 * @returns {void}
 */
function shiftBoardDown(yPos: number, numShift: number) : void {
    let aboveShift = (JSON.parse(JSON.stringify(board)) as number[][]).slice(0, yPos);
    aboveShift.forEach((rowEl, columnIndex) => {
        rowEl.forEach((el, rowIndex) => {
            board[columnIndex + numShift][rowIndex] = el;
        })
    })
}

function checkPerfectClear(){
    let lastLine = board[board.length - 1]
    console.log(lastLine)
    if(lastLine.every(el => el === 0 || el === 8 || el === 9)){
        return true;
    }
    return false;
}

/**
 * This function handle the score and how many points the player will win.
 * The Points gained are based on:
 * - The Number of Lines Cleared.
 * - If there is T-Spin/Mini T-Spin.
 * - The Combo Number
 * - The Back-to-Back Hard tricks/clears.
 * - The Drop Distance.
 * - How the player dropped the piece (Hard/Soft)
 * - If there is a Perfect Score (Which is scored apart from normal clears).
 * 
 * Afterwards, the Score is registered and an PopMessage is showed based on the difficulty of the technique.
 * @param {number} clearLinesNumber 
 * @param {boolean} isTherePerfectClear Boolean that indicates if the board was cleared.
 * @returns {void}
 */
function scoreHandler(clearLinesNumber: number = 0, isTherePerfectClear : boolean): void{
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
        hardCombo = false;
    } else {
        combo_Number += 1;
    }

    if( tspin === false && mini_tspin === false ){
        let temp_score = normal_score[clearLinesNumber];
        switch(clearLinesNumber){
            case 1:
                popMessage("Single", 1);
                hardCombo = false;
                break;
            case 2:
                popMessage("Double", 2);
                hardCombo = false;
                break;
            case 3:
                popMessage("Triple", 3);
                hardCombo = false;
                break;
            case 4:
                popMessage(`Tetris! ${hardCombo ? "\nHard Combo!" : ""}`, 4); // Difficult Clear
                if(hardCombo) temp_score = Math.ceil(temp_score * 1.5);
                hardCombo = true;
                break;
            default:
                hardCombo = false;
                break;
        }
        increaseScoreHandler(temp_score)
    }else{
        if( tspin ){
            let temp_score = tspin_score[clearLinesNumber]
            switch(clearLinesNumber){
                case 0: // T-spin no lines don't break combos
                    popMessage("T-Spin!", 3)
                    hardCombo = true;
                    break;
                case 1:
                    popMessage(`Single T-Spin! ${hardCombo ? "\nHard Combo!" : ""}`, 4) // Difficult Clear
                    if(hardCombo) temp_score = Math.ceil(temp_score * 1.5);
                    hardCombo = true;
                    break;
                case 2:
                    popMessage(`Double T-Spin! ${hardCombo ? "\nHard Combo!" : ""}`, 4) // Difficult Clear
                    if(hardCombo) temp_score = Math.ceil(temp_score * 1.5);
                    hardCombo = true;
                    break;
                case 3:
                    popMessage(`Triple T-Spin! ${hardCombo ? "\nHard Combo!" : ""}`, 4) // Difficult Clear
                    if(hardCombo) temp_score = Math.ceil(temp_score * 1.5);
                    hardCombo = true;
                    break;
                default:
                    hardCombo = false;
                    break;
            }
            increaseScoreHandler(temp_score)
        }
        if ( mini_tspin ){
            let temp_score = mini_tspin_score[clearLinesNumber]
            switch(clearLinesNumber){
                case 0:
                    popMessage("Mini T-Spin!", 2)
                    hardCombo = false;
                    break;
                case 1:
                    popMessage(`Single Mini T-Spin! ${hardCombo ? "\nHard Combo!" : ""}`, 4) // Difficult Clear
                    if(hardCombo) temp_score = Math.ceil(temp_score * 1.5);
                    hardCombo = true;
                    break;
                case 2:
                    popMessage(`Double Mini T-Spin! ${hardCombo ? "\nHard Combo!" : ""}`, 4) // Difficult Clear
                    if(hardCombo) temp_score = Math.ceil(temp_score * 1.5);
                    hardCombo = true;
                    break;
                case 3:
                    popMessage(`Triple Mini T-Spin! ${hardCombo ? "\nHard Combo!" : ""}`, 4) // Difficult Clear also impossible
                    if(hardCombo) temp_score = Math.ceil(temp_score * 1.5);
                    hardCombo = true;
                    break;
                default:
                    hardCombo = false;
                    break;
            }
            increaseScoreHandler(temp_score)
        }
    } 
    if(isTherePerfectClear && clearLinesNumber > 0){
        let message = `${hardCombo && clearLinesNumber === 4 ? "Hard " : ""}`;
        let messageDictionary : {[key : number] : string} = {
            1: "Single!",
            2: "Double!",
            3: "Triple!",
            4: "Tetris!"
        }
        message += messageDictionary[clearLinesNumber];
        popMessage(message + "\nPerfect Clear!", 4)
        increaseScoreHandler(perfect_clear_score[clearLinesNumber])
    }

    // HardDrop Score
    if(hardDropHeight != 0){
        increaseScoreHandler(2 * hardDropHeight);
        hardDropHeight = 0;
    }
    if(softDropHeight != 0){
        increaseScoreHandler(softDropHeight);
        softDropHeight = 0;
    }
}

/**
 * This function handle the Score System.
 * Normally, the number would be added to the current score.
 * But if the score gets higher than the highscore, then the highscore will
 * follow the normal score.
 * If the Highscore is beaten, a flag is fired.
 * @param {number} pointIncrease How many points will be added to the pool.
 * @returns {void}
 */
function increaseScoreHandler(pointIncrease: number): void{
    const newScore = score + pointIncrease;

    transitionTwoNumbers("scoreValue", score, newScore)
    score = newScore;

    setScoreStorage("tetrists-currentscore", newScore);
    if(newScore > highscore){
        transitionTwoNumbers("highScoreValue", highscore, newScore);
        highscore = newScore;
        highscoreBeaten = true;
        setScoreStorage("tetrists-highscore", newScore);
    }
}

/**
 * This function pops a message on the user screen. Showing what type of trick of combo the player just did.
 * 
 * Usually there would be more types of levels for the message. But styling would be overcomplicating.
 * Then, a simple approach as taken, a regular message and a special one (> 3).
 * @param {string} message The Text of the popup.
 * @param {number} levelMessage The Level of the message
 * @returns {void}
 */
function popMessage(message: string, levelMessage: number) : void {
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


/**
 * Function that activates the softdrop.
 * This is important for scoring the points for the drop.
 * @param {boolean} activate Toggle SoftDrop
 * @returns {void}
 */
function SoftDropPiece(activate: boolean): void{
    if (activate){
        activateSoftDrop = true;
        dropThreshold = fastDropSpeed[parseInt(fps)][parseInt(difficulty)]
    }else{
        activateSoftDrop = false;
        softDropHeight = 0;
        dropThreshold = normalDropSpeed[parseInt(fps)][parseInt(difficulty)]
    }
}

/**
 * Function that makes the Tetrimino do a HardDrop.
 * Based on the distance, add to the score.
 * @returns {void}
 */
function HardDropPiece(): void {
    hardDropHeight = shadowTetrimino.y - currentTetrimino.y;
    [currentTetrimino.x, currentTetrimino.y] = [ shadowTetrimino.x, shadowTetrimino.y];
    renderBoard();
    SetPiece();
}

/**
 * Based on the current tetrimino, returns the position of the shadow of the Current Tetrimino.
 * The shadow will be localted on the lowest position of the board.
 * @param {number[][]} board Main Board of the game.
 * @param {Tetrimino} tetris_piece Current Tetrimino.
 * @returns {Position} Position of the Shadow.
 */
function createShadow(board: number[][], tetris_piece: Tetrimino): Position {
    return recursiveFindBottom(board, tetris_piece, 0, 1);
}
/**
 * Recursive function to find the lowest position of the board.
 * @param {number[][]} board Main Board of the game.
 * @param {Tetrimino} tetris_piece Current Tetrimino.
 * @param {number} x X Offset of the shadow, this shouldnt change.
 * @param {number} y Y Offset of the shadow.
 * @returns {Position} Returns the position which the shadow is located. 
 */
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

/**
 * Main Function to the game.
 * This Function checks if there is a collision(a.k.a. An overlap of pieces) on the movement.
 * If it does contain collision, returns true
 * @param {number[][]} board Main Board of The game.
 * @param {number[][]} matrix The Current Tetrimino's Matrix.
 * @param {number} currentX The Current Tetrimino X Position.
 * @param {number} currentY The Current Tetrimino Y Position.
 * @param {number} moveX X Movement offset
 * @param {number} moveY Y Movement offset
 * @returns {boolean} True if there is a collision.
 */
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
                if (yPos + moveY <= gameOverLine - 2 || yPos + moveY >= gameHeight + paddingY) return true;
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

// ========== Button Releases ==========
document.addEventListener("keyup", (e: KeyboardEvent) => {
    if(gameover) return;
    switch (e.key) {
        case "ArrowDown":
            SoftDropPiece(false);
            break;
        case "ArrowLeft":
            clearInterval(intervalLeftArrow);
            intervalLeft = false;
            break;  
        case "ArrowRight":
            clearInterval(intervalRightArrow);
            intervalRight = false;
            break;
        default:
            break;
    }
})

// ========== Button Presses ==========
document.addEventListener("keydown", (e: KeyboardEvent) => {
    if(gameover) return;
    switch (e.key) {
        case " ":
            HardDropPiece();
            break;
        case "a":
            rotateMatrixAntiClock(board, currentTetrimino);
            break;
        case "s":
            rotateMatrixClock(board, currentTetrimino);
            break;
        case "ArrowUp":
            rotateMatrixClock(board, currentTetrimino);
            rotateMatrixClock(board, currentTetrimino);
            break;
        case "z":
            rotateMatrixAntiClock(board, currentTetrimino);
            rotateMatrixAntiClock(board, currentTetrimino);
            break;
        case "c":
            holdPiece();
            break;
        case "ArrowLeft":
            if(!intervalLeft){
                intervalLeft = true;
                intervalLeftArrow = setInterval(() => {
                    movePiece(board, currentTetrimino, "left");
                }, rapidFireInterval);
            }
        break;
        case "ArrowRight":
            if(!intervalRight){
                intervalRight = true;
                intervalRightArrow = setInterval(() => {
                    movePiece(board, currentTetrimino, "right");
                }, rapidFireInterval);
            }
            break;
        case "ArrowDown":
            SoftDropPiece(true);
            break;
        default:
            break;
    }
    renderBoard();
});

// ========== Jquery Listeners to the Menu ==========
$('div[id^="fpsButton"]').on("click", function (event: JQuery.Event) {
    $(this).parent().children().removeClass("active");
    $(this).addClass("active");
    fps = $(this).attr("value") ? $(this).attr("value")! : "";
})

$('div[id^="difficultyButton"]').on("click", function (event: JQuery.Event) {
    $(this).parent().children().removeClass("active");
    $(this).addClass("active");
    difficulty = $(this).attr("value") ? $(this).attr("value")! : "";
})

$("#initGame").on("click", function(){
    hideMenu("startMenu", menuDelay, () => {
        initGame();
    })
})

$("#resetGame").on("click", function(){
    hideMenu("gameOverMenu", menuDelay, () => {
        initGame();
    })
})

$("#backToMenu").on("click", function(){
    hideMenu("gameOverMenu", menuDelay, () => showMenu("startMenu"))
})