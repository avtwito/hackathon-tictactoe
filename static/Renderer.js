import { Board } from "./Board";

export class Renderer {
    static renderBoard() {
        const container = document.querySelector(".board-container");
        container.style.gridTemplateColumns = '1fr '.repeat(Board.SIZE);
        container.style.gridTemplateRows = '1fr '.repeat(Board.SIZE);
        container.style.maxWidth = `${Board.SIZE * 100}px`;
    }
}
