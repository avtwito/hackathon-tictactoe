import { Board } from "./Board.js";

export class Player {
    mark;
    constructor(mark = Board.Mark.X) {
        this.mark = mark;
    }

    /**
     * @param {Board.Mark} mark
     */
    set mark(mark) {
        this.mark = mark;
    }

    static playTurn(board) {
        throw new Error("Abstract method")
    }
}