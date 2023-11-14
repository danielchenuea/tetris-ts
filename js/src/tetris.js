import * as tetrimino from "./tetriminos.js";
import * as wallkicks from "./rotation.js";
import { haveCollision } from "./collision.js";
var board = [
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
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
const canvas = document.getElementById("tetrisgame");
const canvasNext = document.getElementById("tetrisnext");
const canvasBag = document.getElementById("tetrisbag");
const gameCanvas = canvas != null ? canvas.getContext("2d") : null;
const nextCanvas = canvasBag != null ? canvasNext.getContext("2d") : null;
const bagCanvas = canvasBag != null ? canvasBag.getContext("2d") : null;
const boxHeight = 880;
const boxWidth = 400;
const bagHeight = 200;
const bagWidth = 200;
const gameHeight = 22;
const gameWidth = 10;
const paddingY = 18;
const initialX = 4;
const initialY = 19;
const gameOverLine = 19;
const blockHeight = 40;
const blockWidth = 40;
const defaultTetriminoBag = ["I", "J", "L", "O", "S", "Z", "T"];
var currentTetriminoBag = [];
var currentTetrimino = {
    name: "T",
    matrix: tetrimino["T_ShapeMatrix"],
    colorMatrix: tetrimino["T_ShapeColor"],
    x: initialX,
    y: initialY,
    rotation: 0
};
var shadowTetrimino = {
    name: "T",
    matrix: tetrimino["T_ShapeMatrix"],
    colorMatrix: tetrimino["T_ShapeColor"],
    x: initialX,
    y: initialY,
    rotation: 0
};
var holdTetrimino = null;
var holdSwapped = false;
var score = 0;
var highscore = 0;
var combo_Number = -1;
var tspin = false;
var mini_tspin = false;
function initGame() {
}
initGame();
function nextLoop() {
    console.log(board);
}
export function renderBoard(board, drawBoard = true) {
    for (let i = 0; i < gameHeight + paddingY; i++) {
        for (let j = 0; j < gameWidth; j++) {
            if (board[i][j] === 9 || board[i][j] === 8) {
                board[i][j] = 0;
            }
            if (i > 17 && drawBoard && gameCanvas) {
                gameCanvas.fillStyle = tetrimino.colorDictionary[board[i][j]];
                gameCanvas.fillRect(j * blockWidth, (i - paddingY) * blockHeight, blockWidth - 1, blockHeight - 1);
            }
        }
    }
    if (currentTetrimino && drawBoard && gameCanvas) {
        gameCanvas.fillStyle = "#FFFFFF";
        gameCanvas.fillRect(0, 2 * blockHeight, boxWidth, 4);
        let [x, y] = [currentTetrimino.x, currentTetrimino.y];
        let shadowPosition = createShadow(board, currentTetrimino);
        [shadowTetrimino.x, shadowTetrimino.y] = [shadowPosition.x, shadowPosition.y];
        currentTetrimino.matrix.forEach((row, indexColumn) => {
            row.forEach((el, indexRow) => {
                if (el == 1) {
                    const middleMargin = Math.ceil(currentTetrimino.matrix.length / 2) - 1;
                    let yPos = y - middleMargin + indexColumn;
                    let xPos = x - middleMargin + indexRow;
                    let yShadowPos = shadowPosition.y - middleMargin + indexColumn;
                    let xShadowPos = shadowPosition.x - middleMargin + indexRow;
                    if (xPos < 0 || yPos < 0)
                        return;
                    board[yPos][xPos] = 9;
                    board[yShadowPos][xShadowPos] = 8;
                    gameCanvas.fillStyle = tetrimino.colorDictionary[8];
                    gameCanvas.fillRect(xShadowPos * blockWidth, (yShadowPos - paddingY) * blockHeight, blockWidth - 1, blockHeight - 1);
                    gameCanvas.fillStyle = currentTetrimino.colorMatrix;
                    gameCanvas.fillRect(xPos * blockWidth, (yPos - paddingY) * blockHeight, blockWidth - 1, blockHeight - 1);
                }
            });
        });
    }
}
export function movePiece(board, tetris_piece, move) {
    switch (move) {
        case "up":
            if (haveCollision(board, tetris_piece.matrix, tetris_piece.x, tetris_piece.y, 0, -1))
                break;
            tetris_piece.y -= 1;
            break;
        case "right":
            if (haveCollision(board, tetris_piece.matrix, tetris_piece.x, tetris_piece.y, 1, 0))
                break;
            tetris_piece.x += 1;
            break;
        case "down":
            if (haveCollision(board, tetris_piece.matrix, tetris_piece.x, tetris_piece.y, 0, 1)) {
                break;
            }
            ;
            tetris_piece.y += 1;
            break;
        case "left":
            if (haveCollision(board, tetris_piece.matrix, tetris_piece.x, tetris_piece.y, -1, 0))
                break;
            tetris_piece.x -= 1;
            break;
    }
}
export function rotateMatrixClock(board, tetris_piece) {
    let M = JSON.parse(JSON.stringify(tetris_piece.matrix));
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
    }
    ;
}
export function rotateMatrixAntiClock(board, tetris_piece) {
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
    if (rotationOffset !== null) {
        tetris_piece.matrix = M;
        tetris_piece.x += rotationOffset.x;
        tetris_piece.y += rotationOffset.y;
        tetris_piece.rotation = mod(tetris_piece.rotation - 1, 4);
        if (tetris_piece.name === "T")
            checkTSpin(board, tetris_piece, rotationOffset);
    }
}
function mod(n, m) {
    return ((n % m) + m) % m;
}
function checkIfCanRotate(board, tetris_piece, rotatedMatrix, newRotation) {
    let rotationString = tetris_piece.rotation.toString() + newRotation.toString();
    let rulenumber = wallkicks.wallkickDictionary[rotationString];
    let ruleset;
    switch (tetris_piece.name) {
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
        const [currentX, currentY] = [tetris_piece.x, tetris_piece.y];
        let collision = haveCollision(board, rotatedMatrix, currentX, currentY, rule[0], rule[1] * -1);
        if (!collision) {
            return {
                x: rule[0],
                y: rule[1] * -1
            };
        }
    }
    return null;
}
export const TSpinDictionary = {
    0: { front: [{ x: 0, y: 0 }, { x: 0, y: 2 }], back: [{ x: 2, y: 0 }, { x: 2, y: 2 }] },
    1: { front: [{ x: 0, y: 2 }, { x: 2, y: 2 }], back: [{ x: 0, y: 0 }, { x: 2, y: 0 }] },
    2: { front: [{ x: 2, y: 0 }, { x: 2, y: 2 }], back: [{ x: 0, y: 0 }, { x: 0, y: 2 }] },
    3: { front: [{ x: 0, y: 0 }, { x: 2, y: 0 }], back: [{ x: 2, y: 0 }, { x: 2, y: 2 }] }
};
function checkTSpin(board, tetris_piece, movement) {
    let frontBackPositions = TSpinDictionary[tetris_piece.rotation];
    let matrix = [];
    tspin = false;
    mini_tspin = false;
    tetris_piece.matrix.forEach((row, indexColumn) => {
        matrix.push([]);
        row.forEach((el, indexRow) => {
            const middleMargin = Math.ceil(currentTetrimino.matrix.length / 2) - 1;
            let yPos = currentTetrimino.y - middleMargin + indexColumn;
            let xPos = currentTetrimino.x - middleMargin + indexRow;
            if (xPos < 0 || yPos < 0)
                matrix[indexColumn].push(1);
            else
                matrix[indexColumn].push(board[yPos][xPos]);
        });
    });
    let front = frontBackPositions.front;
    let back = frontBackPositions.back;
    let frontPosition = [matrix[front[0].y][front[0].x], [front[1].y][front[1].x]];
    let backPosition = [matrix[back[0].y][back[0].x], matrix[back[1].y][back[1].x]];
    if (frontPosition.every(el => el !== 0) && backPosition.some(el => el !== 0)) {
        tspin = true;
        console.log("tspin!");
    }
    if (frontPosition.some(el => el !== 0) && backPosition.every(el => el !== 0)) {
        mini_tspin = true;
        console.log("mini_tspin!");
    }
    console.log(matrix);
}
function changeTetrimino() {
    let newTetriminoName = getTetriminoFromBag();
    let newTetrimino = {
        name: newTetriminoName,
        matrix: tetrimino[`${newTetriminoName}_ShapeMatrix`],
        colorMatrix: tetrimino[`${newTetriminoName}_ShapeColor`],
        rotation: 0,
        x: initialX,
        y: initialY
    };
    currentTetrimino = newTetrimino;
    let nextTetriminoName = currentTetriminoBag[currentTetriminoBag.length - 1];
    let nextTetrimino = {
        name: nextTetriminoName,
        matrix: tetrimino[`${nextTetriminoName}_ShapeMatrix`],
        colorMatrix: tetrimino[`${nextTetriminoName}_ShapeColor`],
        rotation: 0,
        x: initialX,
        y: initialY
    };
    if (nextCanvas)
        drawTetriminoCanvasInfo(nextCanvas, nextTetrimino);
}
function getTetriminoFromBag() {
    if (currentTetriminoBag.length === 0) {
        currentTetriminoBag = defaultTetriminoBag
            .slice()
            .sort(() => Math.random() - 0.5);
    }
    let temp_tetrisPiece = currentTetriminoBag.pop();
    if (currentTetriminoBag.length === 0) {
        currentTetriminoBag = defaultTetriminoBag
            .slice()
            .sort(() => Math.random() - 0.5);
    }
    return temp_tetrisPiece;
}
function drawTetriminoCanvasInfo(canvas, nextTetrimino) {
    canvas.clearRect(0, 0, 200, 200);
    let xOffset = (bagWidth - (nextTetrimino.matrix.length * blockWidth)) / 2;
    let yOffset = (bagHeight - (nextTetrimino.matrix.length * blockHeight)) / 2;
    nextTetrimino.matrix.forEach((row, indexColumn) => {
        row.forEach((el, indexRow) => {
            if (el == 1) {
                let yPos = indexColumn;
                let xPos = indexRow;
                canvas.fillStyle = nextTetrimino.colorMatrix;
                canvas.fillRect(xOffset + (xPos * blockWidth), yOffset + (yPos * blockHeight), blockWidth - 1, blockHeight - 1);
            }
        });
    });
}
function holdPiece() {
    if (holdSwapped === true)
        return;
    let temp_hold = holdTetrimino !== null ? Object.assign({}, holdTetrimino) : null;
    holdTetrimino = Object.assign({}, currentTetrimino);
    if (bagCanvas)
        drawTetriminoCanvasInfo(bagCanvas, holdTetrimino);
    if (temp_hold !== null) {
        holdSwapped = true;
        currentTetrimino.name = temp_hold.name;
        currentTetrimino.matrix = temp_hold.matrix;
        currentTetrimino.colorMatrix = temp_hold.colorMatrix;
        currentTetrimino.rotation = 0;
        currentTetrimino.x = initialX;
        currentTetrimino.y = initialY;
    }
    else {
        changeTetrimino();
    }
}
function SetPiece() {
    holdSwapped = false;
    currentTetrimino.matrix.forEach((row, indexColumn) => {
        row.forEach((el, indexRow) => {
            if (el == 1) {
                const middleMargin = Math.ceil(currentTetrimino.matrix.length / 2) - 1;
                let yPos = currentTetrimino.y - middleMargin + indexColumn;
                let xPos = currentTetrimino.x - middleMargin + indexRow;
                if (xPos < 0 || yPos < 0)
                    return;
                board[yPos][xPos] = tetrimino.tetriminoDictionary[currentTetrimino.name];
            }
        });
    });
    checkLineComplete();
    changeTetrimino();
}
function checkLineComplete() {
    let currentPiece_YPosition = [];
    currentTetrimino.matrix.forEach((row, indexColumn) => {
        row.forEach((el, indexRow) => {
            if (el == 1) {
                const middleMargin = Math.ceil(currentTetrimino.matrix.length / 2) - 1;
                let yPos = currentTetrimino.y - middleMargin + indexColumn;
                if (!currentPiece_YPosition.includes(yPos)) {
                    currentPiece_YPosition.push(yPos);
                }
            }
        });
    });
    currentPiece_YPosition = currentPiece_YPosition.filter(ypos => {
        let lineBoard = board[ypos];
        if (lineBoard.every(el => el !== 0)) {
            return true;
        }
        return false;
    });
    console.log(currentPiece_YPosition);
    comboHandler(currentPiece_YPosition.length);
    if (currentPiece_YPosition.length !== 0) {
        combo_Number += 1;
        currentPiece_YPosition.forEach((el, index) => {
            setTimeout(() => {
                shiftDown(el, 1);
                renderBoard(board);
            }, 70 * (index));
        });
    }
    else {
        combo_Number = -1;
    }
}
function shiftDown(yPos, numShift) {
    let aboveShift = JSON.parse(JSON.stringify(board)).slice(0, yPos);
    aboveShift.forEach((rowEl, columnIndex) => {
        rowEl.forEach((el, rowIndex) => {
            board[columnIndex + numShift][rowIndex] = el;
        });
    });
}
function comboHandler(lineNumber = 0) {
    if (tspin === false && mini_tspin === false) {
        switch (lineNumber) {
            case 1:
                console.log("Single");
                break;
            case 2:
                console.log("Double");
                break;
            case 3:
                console.log("Triple");
                break;
            case 4:
                console.log("Tetris!");
                break;
        }
    }
    else {
        if (tspin) {
            switch (lineNumber) {
                case 1:
                    console.log("Single T-Spin!");
                    break;
                case 2:
                    console.log("Double ");
                    break;
                case 3:
                    console.log("Triple");
                    break;
            }
        }
        if (mini_tspin) {
        }
    }
    console.log(lineNumber + " number!");
    console.log(tspin + " with tspin!");
    console.log(mini_tspin + " with mini-tspin!");
}
var mini_tspin_score = [100, 200, 400];
var tspin_score = [400, 800, 1200];
var combo_score = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 4, 5, 5, 5];
function checkGameOver() {
    let threshold = board[gameOverLine];
    if (threshold.some(el => el !== 0)) {
        console.log(true);
    }
}
function DropPiece() {
    [currentTetrimino.x, currentTetrimino.y] = [shadowTetrimino.x, shadowTetrimino.y];
}
function createShadow(board, tetris_piece) {
    return recursiveFindBottom(board, tetris_piece, 0, 1);
}
function recursiveFindBottom(board, tetris_piece, x, y) {
    if (haveCollision(board, tetris_piece.matrix, tetris_piece.x, tetris_piece.y, x, y)) {
        return { x: tetris_piece.x + x, y: tetris_piece.y + y - 1 };
    }
    return recursiveFindBottom(board, tetris_piece, x, y + 1);
}
document.addEventListener("keydown", (e) => {
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
            changeTetrimino();
            break;
        case "v":
            console.log(currentTetriminoBag);
            break;
        case "q":
            holdPiece();
            break;
        case " ":
            checkTSpin(board, currentTetrimino, { x: 3, y: 2 });
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
