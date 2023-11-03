import * as tetromino from "./tetrominos.js";

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
    [2, 3, 4, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 9, 0],
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
const canvas = document.getElementById("tetrisgame") as HTMLCanvasElement;
const gameCanvas = canvas.getContext("2d")!;

const boxHeight = 800;
const boxWidth = 400;

const gameHeight = 20;
const gameWidth = 10;
const paddingY = 20;

//Px
const blockHeight = 40;
const blockWidth = 40;

function initGame(): void {
    // Board[row][column]
    for (let i = 0; i < 20; i++) {
        // board.push([]);
        // boardVisual.push([]);
        for (let j = 0; j < 10; j++) {
            // board[i].push(0);
            // boardVisual[i].push(canvas.getContext("2d")!);
        }
    }
}
initGame();

function nextLoop(): void {}

function renderBoard(): void {
    console.log(1);
    for (let i = 0; i < gameHeight + paddingY; i++) {
        for (let j = 0; j < gameWidth; j++) {
            if (board[i][j] === 9 || board[i][j] === 8) {
                board[i][j] = 0;
            }
            if (i > 19) {
                gameCanvas.fillStyle = tetromino.colorDictionary[board[i][j]];
                gameCanvas.fillRect(
                    j * blockWidth,
                    (i - paddingY) * blockHeight,
                    blockWidth - 1,
                    blockHeight - 1
                );
            }
        }
    }

    if (currentTetromino) {
        let [x, y] = [currentTetromino.x, currentTetromino.y];

        let shadowPosition: Position = createShadow(currentTetromino);
        [shadowTetromino.x, shadowTetromino.y] = [
            shadowPosition.x,
            shadowPosition.y,
        ];

        currentTetromino.matrix.forEach((row, indexColumn) => {
            row.forEach((el, indexRow) => {
                if (el == 1) {
                    const middleMargin = Math.floor(
                        currentTetromino.matrix.length / 2
                    );

                    let yPos = y - middleMargin + indexColumn;
                    let xPos = x - middleMargin + indexRow;
                    let yShadowPos =
                        shadowPosition.y - middleMargin + indexColumn;
                    let xShadowPos = shadowPosition.x - middleMargin + indexRow;

                    if (xPos < 0 || yPos < 0) return;
                    board[yPos][xPos] = 9;
                    board[yShadowPos][xShadowPos] = 8;
                    gameCanvas.fillStyle = tetromino.colorDictionary[8];
                    gameCanvas.fillRect(
                        xShadowPos * blockWidth,
                        (yShadowPos - paddingY) * blockHeight,
                        blockWidth - 1,
                        blockHeight - 1
                    );
                    gameCanvas.fillStyle = tetromino.colorDictionary[9];
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

interface Domino {
    name: string;
    matrix: Array<Array<number>>;
    colorMatrix: string;
}
interface Position {
    x: number;
    y: number;
}

type Tetromino = Domino & Position;

const tetrominoBag: string[] = ["I", "J", "L", "O", "S", "Z", "T"];
var currentTetrominoBag: string[] = [];

var currentTetromino: Tetromino = {
    name: "T",
    matrix: tetromino["I_ShapeMatrix"],
    colorMatrix: tetromino["I_ShapeColor"],
    x: 4,
    y: 20,
};
var shadowTetromino: Tetromino = {
    name: "T",
    matrix: tetromino["I_ShapeMatrix"],
    colorMatrix: tetromino["I_ShapeColor"],
    x: 4,
    y: 20,
};

function movePiece(move: "up" | "right" | "down" | "left"): void {
    switch (move) {
        case "up":
            if (haveCollision(currentTetromino, 0, -1)) break;
            currentTetromino.y -= 1;
            break;
        case "right":
            if (haveCollision(currentTetromino, 1, 0)) break;
            currentTetromino.x += 1;
            break;
        case "down":
            if (haveCollision(currentTetromino, 0, 1)) break;
            currentTetromino.y += 1;
            break;
        case "left":
            if (haveCollision(currentTetromino, -1, 0)) break;
            currentTetromino.x -= 1;
            break;
    }
    renderBoard();
}

function rotateMatrixClock(matrix: Array<Array<number>>): void {
    let M = matrix;
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
    currentTetromino.matrix = M;
    renderBoard();
}

// M[i][i + j] -> M[opp - j][i] -> M[opp][opp - j] -> M[i + j][opp] ->
function rotateMatrixAntiClock(matrix: Array<Array<number>>): void {
    let M = matrix;
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
    currentTetromino.matrix = M;
    renderBoard();
}

type TetrominoType = "I" | "J" | "L" | "O" | "S" | "Z" | "T";
function changeTetromino(): void {
    if (currentTetrominoBag.length === 0) {
        currentTetrominoBag = tetrominoBag
            .slice() // Copia Array
            .sort(() => Math.random() - 0.5); // Shuffle Array
    }

    let newTetromino = currentTetrominoBag.pop() as TetrominoType;
    currentTetromino.matrix = tetromino[`${newTetromino}_ShapeMatrix`];
    currentTetromino.colorMatrix = tetromino[`${newTetromino}_ShapeColor`];
    renderBoard();
}

function DropPiece(): void {
    [currentTetromino.x, currentTetromino.y] = [
        shadowTetromino.x,
        shadowTetromino.y,
    ];
    renderBoard();
}

function createShadow(currentTetromino: Tetromino): Position {
    return recursiveFindBottom(currentTetromino, 0, 1);
}
function recursiveFindBottom(
    currentTetromino: Tetromino,
    x: number,
    y: number
): Position {
    if (haveCollision(currentTetromino, x, y)) {
        return { x: currentTetromino.x + x, y: currentTetromino.y + y - 1 };
    }
    return recursiveFindBottom(currentTetromino, x, y + 1);
}

function haveCollision(
    tetromino: Tetromino,
    moveX: number,
    moveY: number
): boolean {
    for (
        let indexColumn = 0;
        indexColumn < tetromino.matrix.length;
        indexColumn++
    ) {
        for (
            let indexRow = 0;
            indexRow < tetromino.matrix[indexColumn].length;
            indexRow++
        ) {
            const middleMargin = Math.floor(tetromino.matrix.length / 2);
            const el = tetromino.matrix[indexColumn][indexRow];
            if (el === 1) {
                let yPos = tetromino.y - middleMargin + indexColumn;
                let xPos = tetromino.x - middleMargin + indexRow;
                if (yPos + moveY < 16 || yPos + moveY > 39) return true;
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
            renderBoard();
            break;
        case "x":
            DropPiece();
            break;
        case "a":
            rotateMatrixAntiClock(currentTetromino.matrix);
            break;
        case "s":
            rotateMatrixClock(currentTetromino.matrix);
            break;
        case "d":
            changeTetromino();
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
