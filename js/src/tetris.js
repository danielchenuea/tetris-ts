import * as tetrimino from "./tetriminos.js";
import * as wallkicks from "./rotation.js";
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
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 1, 1, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0, 0, 0, 1, 1, 0],
    [1, 1, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
];
const canvas = document.getElementById("tetrisgame");
const canvasNext = document.getElementById("tetrisnext");
const canvasBag = document.getElementById("tetrisbag");
const gameCanvas = canvas != null ? canvas.getContext("2d") : null;
const nextCanvas = canvasBag != null ? canvasNext.getContext("2d") : null;
const bagCanvas = canvasBag != null ? canvasBag.getContext("2d") : null;
const boxHeight = 800;
const boxWidth = 400;
const bagHeight = 200;
const bagWidth = 200;
const gameHeight = 20;
const gameWidth = 10;
const paddingY = 20;
const blockHeight = 40;
const blockWidth = 40;
function initGame() {
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 10; j++) {
        }
    }
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
            if (i > 19 && drawBoard && gameCanvas) {
                gameCanvas.fillStyle = tetrimino.colorDictionary[board[i][j]];
                gameCanvas.fillRect(j * blockWidth, (i - paddingY) * blockHeight, blockWidth - 1, blockHeight - 1);
            }
        }
    }
    if (currentTetrimino && drawBoard && gameCanvas) {
        let [x, y] = [currentTetrimino.x, currentTetrimino.y];
        let shadowPosition = createShadow(board, currentTetrimino);
        [shadowTetrimino.x, shadowTetrimino.y] = [
            shadowPosition.x,
            shadowPosition.y,
        ];
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
const defaultTetriminoBag = ["I", "J", "L", "O", "S", "Z", "T"];
var currentTetriminoBag = [];
var currentTetrimino = {
    name: "I",
    matrix: tetrimino["I_ShapeMatrix"],
    colorMatrix: tetrimino["I_ShapeColor"],
    x: 4,
    y: 24,
    rotation: 0
};
var shadowTetrimino = {
    name: "I",
    matrix: tetrimino["I_ShapeMatrix"],
    colorMatrix: tetrimino["I_ShapeColor"],
    x: 4,
    y: 24,
    rotation: 0
};
var holdTetrimino = null;
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
                SetPiece(board, currentTetrimino);
                changeTetrimino(currentTetrimino);
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
    let rotation = checkIfCanRotate(board, tetris_piece, M, mod(tetris_piece.rotation + 1, 4));
    if (rotation !== null) {
        tetris_piece.matrix = M;
        tetris_piece.x += rotation[0];
        tetris_piece.y += rotation[1];
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
    let rotation = checkIfCanRotate(board, tetris_piece, M, mod(tetris_piece.rotation - 1, 4));
    if (rotation !== null) {
        tetris_piece.matrix = M;
        tetris_piece.x += rotation[0];
        tetris_piece.y += rotation[1];
        tetris_piece.rotation = mod(tetris_piece.rotation - 1, 4);
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
            return [rule[0], rule[1] * -1];
        }
    }
    return null;
}
function changeTetrimino(tetris_piece) {
    if (currentTetriminoBag.length === 0) {
        currentTetriminoBag = defaultTetriminoBag
            .slice()
            .sort(() => Math.random() - 0.5);
    }
    let currentTetriminoName = currentTetriminoBag.pop();
    tetris_piece.name = currentTetriminoName;
    tetris_piece.matrix = tetrimino[`${currentTetriminoName}_ShapeMatrix`];
    tetris_piece.colorMatrix = tetrimino[`${currentTetriminoName}_ShapeColor`];
    tetris_piece.rotation = 0;
    tetris_piece.x = 4;
    tetris_piece.y = 22;
    if (currentTetriminoBag.length === 0) {
        currentTetriminoBag = defaultTetriminoBag
            .slice()
            .sort(() => Math.random() - 0.5);
    }
    let nextTetriminoName = currentTetriminoBag[currentTetriminoBag.length - 1];
    let nextTetrimino = {
        name: nextTetriminoName,
        matrix: tetrimino[`${nextTetriminoName}_ShapeMatrix`],
        colorMatrix: tetrimino[`${nextTetriminoName}_ShapeColor`],
        rotation: 0,
        x: 4,
        y: 22
    };
    if (nextCanvas)
        drawTetriminoCanvasInfo(nextCanvas, nextTetrimino);
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
function holdPiece(tetris_piece) {
    let temp_hold = holdTetrimino;
    holdTetrimino = tetris_piece;
    if (temp_hold) {
        tetris_piece.name = temp_hold.name;
        tetris_piece.matrix = temp_hold.matrix;
        tetris_piece.colorMatrix = temp_hold.colorMatrix;
        tetris_piece.rotation = 0;
        tetris_piece.x = 4;
        tetris_piece.y = 22;
    }
    if (bagCanvas)
        drawTetriminoCanvasInfo(bagCanvas, holdTetrimino);
}
function SetPiece(board, tetris_piece) {
    tetris_piece.matrix.forEach((row, indexColumn) => {
        row.forEach((el, indexRow) => {
            if (el == 1) {
                const middleMargin = Math.ceil(currentTetrimino.matrix.length / 2) - 1;
                let yPos = tetris_piece.y - middleMargin + indexColumn;
                let xPos = tetris_piece.x - middleMargin + indexRow;
                if (xPos < 0 || yPos < 0)
                    return;
                board[yPos][xPos] = tetrimino.tetriminoDictionary[tetris_piece.name];
            }
        });
    });
}
function DropPiece(tetris_piece, tetris_shadow) {
    [tetris_piece.x, tetris_piece.y] = [
        tetris_shadow.x,
        tetris_shadow.y,
    ];
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
function haveCollision(board, matrix, currentX, currentY, moveX, moveY) {
    for (let indexColumn = 0; indexColumn < matrix.length; indexColumn++) {
        for (let indexRow = 0; indexRow < matrix[indexColumn].length; indexRow++) {
            const middleMargin = Math.ceil(matrix.length / 2) - 1;
            const el = matrix[indexColumn][indexRow];
            if (el === 1) {
                let yPos = currentY - middleMargin + indexColumn;
                let xPos = currentX - middleMargin + indexRow;
                if (yPos + moveY < 0 || yPos + moveY > 39)
                    return true;
                if (xPos + moveX < 0 || xPos + moveX > 9)
                    return true;
                let newPosition = board[yPos + moveY][xPos + moveX];
                if (newPosition !== 9 &&
                    newPosition !== 0 &&
                    newPosition !== 8) {
                    return true;
                }
            }
        }
    }
    return false;
}
document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "z":
            break;
        case "x":
            DropPiece(currentTetrimino, shadowTetrimino);
            SetPiece(board, currentTetrimino);
            changeTetrimino(currentTetrimino);
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
            changeTetrimino(currentTetrimino);
            break;
        case "v":
            console.log(currentTetriminoBag);
            break;
        case "q":
            holdPiece(currentTetrimino);
            break;
        case " ":
            nextLoop();
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
