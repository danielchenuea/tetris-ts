import * as tetromino from "./tetrominos.js";
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
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 0, 0, 0, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
    [1, 1, 1, 0, 0, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [0, 1, 1, 0, 0, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 0, 1, 1, 1],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
const canvas = document.getElementById("tetrisgame");
const gameCanvas = canvas != null ? canvas.getContext("2d") : null;
const boxHeight = 800;
const boxWidth = 400;
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
                gameCanvas.fillStyle = tetromino.colorDictionary[board[i][j]];
                gameCanvas.fillRect(j * blockWidth, (i - paddingY) * blockHeight, blockWidth - 1, blockHeight - 1);
            }
        }
    }
    if (currentTetromino && drawBoard && gameCanvas) {
        let [x, y] = [currentTetromino.x, currentTetromino.y];
        let shadowPosition = createShadow(board, currentTetromino);
        [shadowTetromino.x, shadowTetromino.y] = [
            shadowPosition.x,
            shadowPosition.y,
        ];
        currentTetromino.matrix.forEach((row, indexColumn) => {
            row.forEach((el, indexRow) => {
                if (el == 1) {
                    const middleMargin = Math.ceil(currentTetromino.matrix.length / 2) - 1;
                    let yPos = y - middleMargin + indexColumn;
                    let xPos = x - middleMargin + indexRow;
                    let yShadowPos = shadowPosition.y - middleMargin + indexColumn;
                    let xShadowPos = shadowPosition.x - middleMargin + indexRow;
                    if (xPos < 0 || yPos < 0)
                        return;
                    board[yPos][xPos] = 9;
                    board[yShadowPos][xShadowPos] = 8;
                    gameCanvas.fillStyle = tetromino.colorDictionary[8];
                    gameCanvas.fillRect(xShadowPos * blockWidth, (yShadowPos - paddingY) * blockHeight, blockWidth - 1, blockHeight - 1);
                    gameCanvas.fillStyle = tetromino.colorDictionary[9];
                    gameCanvas.fillRect(xPos * blockWidth, (yPos - paddingY) * blockHeight, blockWidth - 1, blockHeight - 1);
                }
            });
        });
    }
}
const tetrominoBag = ["I", "J", "L", "O", "S", "Z", "T"];
var currentTetrominoBag = [];
var currentTetromino = {
    name: "I",
    matrix: tetromino["I_ShapeMatrix"],
    colorMatrix: tetromino["I_ShapeColor"],
    x: 4,
    y: 24,
    rotation: 0
};
var shadowTetromino = {
    name: "I",
    matrix: tetromino["I_ShapeMatrix"],
    colorMatrix: tetromino["I_ShapeColor"],
    x: 4,
    y: 24,
    rotation: 0
};
function movePiece(board, move) {
    switch (move) {
        case "up":
            if (haveCollision(board, currentTetromino.matrix, currentTetromino.x, currentTetromino.y, 0, -1))
                break;
            currentTetromino.y -= 1;
            break;
        case "right":
            if (haveCollision(board, currentTetromino.matrix, currentTetromino.x, currentTetromino.y, 1, 0))
                break;
            currentTetromino.x += 1;
            break;
        case "down":
            if (haveCollision(board, currentTetromino.matrix, currentTetromino.x, currentTetromino.y, 0, 1))
                break;
            currentTetromino.y += 1;
            break;
        case "left":
            if (haveCollision(board, currentTetromino.matrix, currentTetromino.x, currentTetromino.y, -1, 0))
                break;
            currentTetromino.x -= 1;
            break;
    }
}
export function rotateMatrixClock(board, tetromino) {
    let M = JSON.parse(JSON.stringify(tetromino.matrix));
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
    let rotation = checkIfCanRotate(board, tetromino, M, mod(tetromino.rotation + 1, 4));
    if (rotation !== null) {
        tetromino.matrix = M;
        tetromino.x += rotation[0];
        tetromino.y += rotation[1];
        tetromino.rotation = mod(tetromino.rotation + 1, 4);
        console.log(board);
    }
    ;
}
export function rotateMatrixAntiClock(board, tetromino) {
    let M = JSON.parse(JSON.stringify(tetromino.matrix));
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
    let rotation = checkIfCanRotate(board, tetromino, M, mod(tetromino.rotation - 1, 4));
    if (rotation !== null) {
        tetromino.matrix = M;
        tetromino.x += rotation[0];
        tetromino.y += rotation[1];
        tetromino.rotation = mod(tetromino.rotation - 1, 4);
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
function changeTetromino() {
    if (currentTetrominoBag.length === 0) {
        currentTetrominoBag = tetrominoBag
            .slice()
            .sort(() => Math.random() - 0.5);
    }
    let newTetromino = currentTetrominoBag.pop();
    currentTetromino.name = newTetromino;
    currentTetromino.matrix = tetromino[`${newTetromino}_ShapeMatrix`];
    currentTetromino.colorMatrix = tetromino[`${newTetromino}_ShapeColor`];
}
function DropPiece() {
    [currentTetromino.x, currentTetromino.y] = [
        shadowTetromino.x,
        shadowTetromino.y,
    ];
}
function createShadow(board, currentTetromino) {
    return recursiveFindBottom(board, currentTetromino, 0, 1);
}
function recursiveFindBottom(board, currentTetromino, x, y) {
    if (haveCollision(board, currentTetromino.matrix, currentTetromino.x, currentTetromino.y, x, y)) {
        return { x: currentTetromino.x + x, y: currentTetromino.y + y - 1 };
    }
    return recursiveFindBottom(board, currentTetromino, x, y + 1);
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
            DropPiece();
            break;
        case "a":
            rotateMatrixAntiClock(board, currentTetromino);
            break;
        case "s":
            rotateMatrixClock(board, currentTetromino);
            break;
        case "d":
            changeTetromino();
            break;
        case "c":
            console.log(board);
            break;
        case "v":
            console.log(currentTetromino);
            break;
        case " ":
            nextLoop();
            break;
        case "ArrowUp":
            movePiece(board, "up");
            break;
        case "ArrowLeft":
            movePiece(board, "left");
            break;
        case "ArrowRight":
            movePiece(board, "right");
            break;
        case "ArrowDown":
            movePiece(board, "down");
            break;
        default:
            break;
    }
    renderBoard(board);
});
