import { Board } from "./Board.js";
import { Player } from "./Player.js";

export class WhateverPlayer extends Player {
    playTurn(board) {
        let row = Math.random() * (Board.SIZE - 1) + 1;
        let col = Math.random() * (Board.SIZE - 1) + 1;
        while (board.getMark(row, col) != Board.Mark.BLANK) {
            row = Math.random() * (Board.SIZE - 1) + 1;
            col = Math.random() * (Board.SIZE - 1) + 1;
        }
        board.putMark(this.mark, row, col);
    }
}
