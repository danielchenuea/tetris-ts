import * as tetrimino from "./tetriminos.js";
import * as wallkicks from "./rotation.js";
import { transitionTwoNumbers } from "./utils/twoNumberTransition.js";
import { getScoreStorage, setScoreStorage } from "./utils/localstorageHandler.js";
import { hideMenu, showMenu } from "./utils/showhideMenu.js";
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
const canvas = document.getElementById("tetrisgame");
const canvasNext = document.getElementById("tetrisnext");
const canvasBag = document.getElementById("tetrisbag");
const gameCanvas = canvas != null ? canvas.getContext("2d") : null;
const nextCanvas = canvasBag != null ? canvasNext.getContext("2d") : null;
const bagCanvas = canvasBag != null ? canvasBag.getContext("2d") : null;
const boxWidth = 400;
const boxHeight = 880;
const bagWidth = 200;
const bagHeight = 200;
const blockWidth = 40;
const blockHeight = 40;
const gameWidth = 10;
const gameHeight = 22;
const paddingY = 18;
const initialX = 4;
const initialY = 19;
const gameOverLine = 19;
const menuDelay = 200;
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
var timeoutTransitionPopUpMessage;
var timeoutDisplayPopUpMessage;
const rapidFireInterval = 50;
var intervalLeftArrow;
var intervalRightArrow;
var intervalLeft = false;
var intervalRight = false;
var colliding = false;
var infinitySpeed = [15, 30, 72];
var infinityCounter = 0;
var score = 0;
var highscore = 0;
var highscoreBeaten = false;
var combo_Number = -1;
var hardCombo = false;
var hardDropHeight = 0;
var softDropHeight = 0;
var activateSoftDrop = false;
const normal_score = [0, 100, 300, 500, 800];
const mini_tspin_score = [100, 200, 400, 800, 0];
const tspin_score = [400, 800, 1200, 1600, 0];
const perfect_clear_score = [0, 800, 1200, 1800, 2000, 3200];
const combo_score = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 4, 5, 5, 5];
var tspin = false;
var mini_tspin = false;
var RAF = null;
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
var gameover = true;
export function initGame() {
    board = [];
    for (let i = 0; i < gameHeight + paddingY; i++) {
        board.push([]);
        for (let j = 0; j < gameWidth; j++) {
            board[i].push(0);
        }
    }
    dropThreshold = normalDropSpeed[parseInt(fps)][parseInt(difficulty)];
    $("#newRecord").hide();
    setScoreStorage("tetrists-currentscore", 0);
    score = 0;
    highscore = getScoreStorage("tetrists-highscore");
    if (document.getElementById("scoreValue"))
        document.getElementById("scoreValue").innerText = score.toString();
    if (document.getElementById("highScoreValue"))
        document.getElementById("highScoreValue").innerText = highscore.toString();
    currentTetriminoBag = [];
    changeTetrimino();
    gameover = false;
    nextLoop();
}
function checkGameOver() {
    let threshold = board[gameOverLine];
    if (threshold.some(el => el !== 0)) {
        endGame();
    }
}
function endGame() {
    if (RAF != null)
        cancelAnimationFrame(RAF);
    gameover = true;
    showMenu("gameOverMenu", () => {
        if (highscoreBeaten) {
            $("#newRecord").show();
        }
        transitionTwoNumbers("scoreGameOver", 0, getScoreStorage("tetrists-currentscore"), { transitionDelay: 600 });
        transitionTwoNumbers("highScoreGameOver", 0, getScoreStorage("tetrists-highscore"), { transitionDelay: 600 });
    });
}
function nextLoop() {
    if (colliding) {
        if (++infinityCounter > infinitySpeed[parseInt(fps)]) {
            SetPiece();
            colliding = false;
        }
    }
    if (++framesDrop > dropThreshold) {
        if (haveCollision(board, currentTetrimino.matrix, currentTetrimino.x, currentTetrimino.y, 0, 1)) {
            colliding = true;
        }
        else {
            currentTetrimino.y += 1;
            if (activateSoftDrop)
                softDropHeight++;
        }
        framesDrop = 0;
    }
    renderBoard();
    if (!gameover) {
        RAF = requestAnimationFrame(() => nextLoop());
    }
}
function renderBoard(drawBoard = true) {
    if (gameCanvas)
        gameCanvas.clearRect(0, 0, boxWidth, boxHeight);
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
            if (haveCollision(board, tetris_piece.matrix, tetris_piece.x, tetris_piece.y, 0, 1))
                break;
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
        infinityCounter = 0;
        tetris_piece.matrix = M;
        tetris_piece.x += rotationOffset.x;
        tetris_piece.y += rotationOffset.y;
        tetris_piece.rotation = mod(tetris_piece.rotation + 1, 4);
        if (tetris_piece.name === "T")
            checkTSpin(board, tetris_piece, rotationOffset);
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
        infinityCounter = 0;
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
const TSpinDictionary = {
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
            else if (xPos >= gameWidth || yPos >= gameHeight + paddingY)
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
    }
    else if (frontPosition.some(el => el !== 0) && backPosition.every(el => el !== 0)) {
        mini_tspin = true;
    }
    let [xMov, yMov] = [Math.abs(movement.x), Math.abs(movement.y)];
    if ((xMov === 1 && yMov === 2) || (xMov === 2 && yMov === 1)) {
        tspin = true;
        mini_tspin = false;
    }
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
function drawTetriminoCanvasInfo(canvas, tetrimino) {
    canvas.clearRect(0, 0, 200, 200);
    let xOffset = (bagWidth - (tetrimino.matrix.length * blockWidth)) / 2;
    let yOffset = (bagHeight - (tetrimino.matrix.length * blockHeight)) / 2;
    tetrimino.matrix.forEach((row, indexColumn) => {
        row.forEach((el, indexRow) => {
            if (el == 1) {
                let yPos = indexColumn;
                let xPos = indexRow;
                canvas.fillStyle = tetrimino.colorMatrix;
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
    holdSwapped = true;
    if (temp_hold !== null) {
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
    clearInterval(intervalLeftArrow);
    clearInterval(intervalRightArrow);
    checkGameOver();
    if (gameover)
        return;
    currentTetrimino.matrix.forEach((row, indexColumn) => {
        row.forEach((el, indexRow) => {
            if (el == 1) {
                const middleMargin = Math.ceil(currentTetrimino.matrix.length / 2) - 1;
                let yPos = currentTetrimino.y - middleMargin + indexColumn;
                let xPos = currentTetrimino.x - middleMargin + indexRow;
                if (xPos < 0 || yPos < 0 || xPos >= gameWidth || yPos >= gameHeight + paddingY)
                    return;
                board[yPos][xPos] = tetrimino.tetriminoDictionary[currentTetrimino.name];
            }
        });
    });
    checkLineComplete();
    changeTetrimino();
    resetStateTSpin();
}
function resetStateTSpin() {
    tspin = false;
    mini_tspin = false;
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
        if (lineBoard.every(el => el !== 0 && el !== 8)) {
            return true;
        }
        return false;
    });
    currentPiece_YPosition.forEach((el, index) => {
        setTimeout(() => {
            shiftBoardDown(el, 1);
            renderBoard();
        }, 70 * (index));
    });
    setTimeout(() => {
        scoreHandler(currentPiece_YPosition.length, checkPerfectClear());
    }, 70 * currentPiece_YPosition.length);
}
function shiftBoardDown(yPos, numShift) {
    let aboveShift = JSON.parse(JSON.stringify(board)).slice(0, yPos);
    aboveShift.forEach((rowEl, columnIndex) => {
        rowEl.forEach((el, rowIndex) => {
            board[columnIndex + numShift][rowIndex] = el;
        });
    });
}
function checkPerfectClear() {
    let lastLine = board[board.length - 1];
    console.log(lastLine);
    if (lastLine.every(el => el === 0 || el === 8 || el === 9)) {
        return true;
    }
    return false;
}
function scoreHandler(clearLinesNumber = 0, isTherePerfectClear) {
    if (clearLinesNumber === 0) {
        if (combo_Number > 0) {
            let comboValue = combo_score.slice(0, combo_Number + 1);
            const sumCombo = comboValue.reduce((acc, current) => {
                return acc + current;
            }, 0);
            if (combo_Number > combo_score.length)
                increaseScoreHandler((sumCombo + ((combo_Number - combo_score.length) * 5)) * 50);
            else
                increaseScoreHandler(sumCombo * 50);
        }
        combo_Number = -1;
        hardCombo = false;
    }
    else {
        combo_Number += 1;
    }
    if (tspin === false && mini_tspin === false) {
        let temp_score = normal_score[clearLinesNumber];
        switch (clearLinesNumber) {
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
                popMessage(`Tetris! ${hardCombo ? "\nHard Combo!" : ""}`, 4);
                if (hardCombo)
                    temp_score = Math.ceil(temp_score * 1.5);
                hardCombo = true;
                break;
            default:
                hardCombo = false;
                break;
        }
        increaseScoreHandler(temp_score);
    }
    else {
        if (tspin) {
            let temp_score = tspin_score[clearLinesNumber];
            switch (clearLinesNumber) {
                case 0:
                    popMessage("T-Spin!", 3);
                    hardCombo = true;
                    break;
                case 1:
                    popMessage(`Single T-Spin! ${hardCombo ? "\nHard Combo!" : ""}`, 4);
                    if (hardCombo)
                        temp_score = Math.ceil(temp_score * 1.5);
                    hardCombo = true;
                    break;
                case 2:
                    popMessage(`Double T-Spin! ${hardCombo ? "\nHard Combo!" : ""}`, 4);
                    if (hardCombo)
                        temp_score = Math.ceil(temp_score * 1.5);
                    hardCombo = true;
                    break;
                case 3:
                    popMessage(`Triple T-Spin! ${hardCombo ? "\nHard Combo!" : ""}`, 4);
                    if (hardCombo)
                        temp_score = Math.ceil(temp_score * 1.5);
                    hardCombo = true;
                    break;
                default:
                    hardCombo = false;
                    break;
            }
            increaseScoreHandler(temp_score);
        }
        if (mini_tspin) {
            let temp_score = mini_tspin_score[clearLinesNumber];
            switch (clearLinesNumber) {
                case 0:
                    popMessage("Mini T-Spin!", 2);
                    hardCombo = false;
                    break;
                case 1:
                    popMessage(`Single Mini T-Spin! ${hardCombo ? "\nHard Combo!" : ""}`, 4);
                    if (hardCombo)
                        temp_score = Math.ceil(temp_score * 1.5);
                    hardCombo = true;
                    break;
                case 2:
                    popMessage(`Double Mini T-Spin! ${hardCombo ? "\nHard Combo!" : ""}`, 4);
                    if (hardCombo)
                        temp_score = Math.ceil(temp_score * 1.5);
                    hardCombo = true;
                    break;
                case 3:
                    popMessage(`Triple Mini T-Spin! ${hardCombo ? "\nHard Combo!" : ""}`, 4);
                    if (hardCombo)
                        temp_score = Math.ceil(temp_score * 1.5);
                    hardCombo = true;
                    break;
                default:
                    hardCombo = false;
                    break;
            }
            increaseScoreHandler(temp_score);
        }
    }
    if (isTherePerfectClear && clearLinesNumber > 0) {
        let message = `${hardCombo && clearLinesNumber === 4 ? "Hard " : ""}`;
        let messageDictionary = {
            1: "Single!",
            2: "Double!",
            3: "Triple!",
            4: "Tetris!"
        };
        message += messageDictionary[clearLinesNumber];
        popMessage(message + "\nPerfect Clear!", 4);
        increaseScoreHandler(perfect_clear_score[clearLinesNumber]);
    }
    if (hardDropHeight != 0) {
        increaseScoreHandler(2 * hardDropHeight);
        hardDropHeight = 0;
    }
    if (softDropHeight != 0) {
        increaseScoreHandler(softDropHeight);
        softDropHeight = 0;
    }
}
function increaseScoreHandler(pointIncrease) {
    const newScore = score + pointIncrease;
    transitionTwoNumbers("scoreValue", score, newScore);
    score = newScore;
    setScoreStorage("tetrists-currentscore", newScore);
    if (newScore > highscore) {
        transitionTwoNumbers("highScoreValue", highscore, newScore);
        highscore = newScore;
        highscoreBeaten = true;
        setScoreStorage("tetrists-highscore", newScore);
    }
}
function popMessage(message, levelMessage) {
    const popMessage = document.getElementById("popUpMessage");
    popMessage.innerText = message;
    popMessage.classList.add("popup");
    if (levelMessage > 3)
        popMessage.classList.add("rainbowText");
    clearTimeout(timeoutTransitionPopUpMessage);
    clearTimeout(timeoutDisplayPopUpMessage);
    timeoutTransitionPopUpMessage = setTimeout(() => {
        popMessage.classList.remove("popup");
    }, 150);
    timeoutDisplayPopUpMessage = setTimeout(() => {
        popMessage.innerText = "";
        if (levelMessage > 3)
            popMessage.classList.remove("rainbowText");
    }, 2000);
}
function SoftDropPiece(activate) {
    if (activate) {
        activateSoftDrop = true;
        dropThreshold = fastDropSpeed[parseInt(fps)][parseInt(difficulty)];
    }
    else {
        activateSoftDrop = false;
        softDropHeight = 0;
        dropThreshold = normalDropSpeed[parseInt(fps)][parseInt(difficulty)];
    }
}
function HardDropPiece() {
    hardDropHeight = shadowTetrimino.y - currentTetrimino.y;
    [currentTetrimino.x, currentTetrimino.y] = [shadowTetrimino.x, shadowTetrimino.y];
    renderBoard();
    SetPiece();
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
                if (yPos + moveY <= gameOverLine - 2 || yPos + moveY >= gameHeight + paddingY)
                    return true;
                if (xPos + moveX < 0 || xPos + moveX >= gameWidth)
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
document.addEventListener("keyup", (e) => {
    if (gameover)
        return;
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
});
document.addEventListener("keydown", (e) => {
    if (gameover)
        return;
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
            if (!intervalLeft) {
                intervalLeft = true;
                intervalLeftArrow = setInterval(() => {
                    movePiece(board, currentTetrimino, "left");
                }, rapidFireInterval);
            }
            break;
        case "ArrowRight":
            if (!intervalRight) {
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
$('div[id^="fpsButton"]').on("click", function (event) {
    $(this).parent().children().removeClass("active");
    $(this).addClass("active");
    fps = $(this).attr("value") ? $(this).attr("value") : "";
});
$('div[id^="difficultyButton"]').on("click", function (event) {
    $(this).parent().children().removeClass("active");
    $(this).addClass("active");
    difficulty = $(this).attr("value") ? $(this).attr("value") : "";
});
$("#initGame").on("click", function () {
    hideMenu("startMenu", menuDelay, () => {
        initGame();
    });
});
$("#resetGame").on("click", function () {
    hideMenu("gameOverMenu", menuDelay, () => {
        initGame();
    });
});
$("#backToMenu").on("click", function () {
    hideMenu("gameOverMenu", menuDelay, () => showMenu("startMenu"));
});
