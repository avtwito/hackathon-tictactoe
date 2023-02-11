import { Board } from "./Board.js";

export class Renderer {
    static renderBoard(board) {
        const container = document.querySelector(".board-container");
        container.style.gridTemplateColumns = '1fr '.repeat(Board.SIZE);
        container.style.gridTemplateRows = '1fr '.repeat(Board.SIZE);
        container.style.maxWidth = `${Board.SIZE * 100}px`;

        for (let row = 0; row < Board.SIZE; row++) {
            for (let col = 0; col < Board.SIZE; col++) {
                if (row === 0) {
                    board[row][col].style.borderTop = "none";
                }
                if (col === 0) {
                    board[row][col].style.borderLeft = "none";
                }
                if (row === Board.SIZE - 1) {
                    board[row][col].style.borderBottom = "none";
                }
                if (col === Board.SIZE - 1) {
                    board[row][col].style.borderRight = "none";
                }
            }
        }
    }
}
