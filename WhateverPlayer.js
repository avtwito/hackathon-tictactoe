import { Board } from "./Board";

export class WhateverPlayer {
    playTurn(board, mark) {
        let row = Math.random() * (Board.SIZE - 1) + 1;
        let col = Math.random() * (Board.SIZE - 1) + 1;
        while (board.getMark(row, col) != Board.Mark.BLANK) {
            row = Math.random() * (Board.SIZE - 1) + 1;
            col = Math.random() * (Board.SIZE - 1) + 1;
        }
        board.putMark(mark, row, col);
    }
}
