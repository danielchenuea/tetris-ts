import * as tetromino from "./tetrominos.js";
var board = [
    [2, 3, 4, 0, 0, 0, 0, 0, 0, 9],
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
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
];
var bufferBoard = [
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
const canvas = document.getElementById("tetrisgame");
const gameCanvas = canvas.getContext("2d");
const boxHeight = 800;
const boxWidth = 400;
const gameHeight = 20;
const gameWidth = 10;
const blockHeight = 40;
const blockWidth = 40;
function initGame() {
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 10; j++) {
        }
    }
}
initGame();
function nextLoop() { }
function renderBoard() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            gameCanvas.fillStyle = tetromino.colorDictionary[board[i][j]];
            gameCanvas.fillRect(j * blockWidth, i * blockHeight, blockWidth - 1, blockHeight - 1);
            if (board[i][j] === 9) {
                currentTrenomino.x = j;
                currentTrenomino.y = i;
            }
        }
    }
}
var currentTrenomino = {
    name: "",
    matrix: [],
    x: 0,
    y: 0,
};
function movePiece(move) {
    board[currentTrenomino.y][currentTrenomino.x] = 0;
    console.log(currentTrenomino.x, currentTrenomino.y);
    switch (move) {
        case "up":
            if (currentTrenomino.y <= 0)
                break;
            if (board[currentTrenomino.y - 1][currentTrenomino.x] != 0)
                break;
            currentTrenomino.y -= 1;
            break;
        case "right":
            if (currentTrenomino.x >= 9)
                break;
            if (board[currentTrenomino.y][currentTrenomino.x + 1] != 0)
                break;
            currentTrenomino.x += 1;
            break;
        case "down":
            if (currentTrenomino.y >= 19)
                break;
            if (board[currentTrenomino.y + 1][currentTrenomino.x] != 0)
                break;
            currentTrenomino.y += 1;
            break;
        case "left":
            if (currentTrenomino.x <= 0)
                break;
            if (board[currentTrenomino.y][currentTrenomino.x - 1] != 0)
                break;
            currentTrenomino.x -= 1;
            break;
    }
    board[currentTrenomino.y][currentTrenomino.x] = 9;
    renderBoard();
}
document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "z":
            renderBoard();
            break;
        case " ":
            nextLoop();
            break;
        case "ArrowUp":
            movePiece("up");
            break;
        case "ArrowLeft":
            movePiece("left");
            break;
        case "ArrowRight":
            movePiece("right");
            break;
        case "ArrowDown":
            movePiece("down");
            break;
        default:
            break;
    }
});
