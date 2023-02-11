import { Board } from "./Board.js"
import { Player } from "./Player.js"
/** @todo: This class assumes X is the clever player, will be fixed later */

export class CleverPlayer extends Player {
    static winnerMap = new Map([
        [Board.Winner.X_WIN, 1],
        [Board.Winner.O_WIN, -1],
        [Board.Winner.DRAW, 0]
    ]);

    static playTurn(board) {
        // plays first move
        let bestScore = Number.MIN_VALUE;
        let bestMove = [0, 0];
        const boardCopy = new Board(board);
        for (let row = 0; row < Board.SIZE; row++) {
            for (let col = 0; col < Board.SIZE; col++) {
                // Is the spot available?
                /** @todo: there's a tiny bug here, it doesn't enter the IF even when mark is blank. */
                if (boardCopy.getMark(row, col) === (Board.Mark.BLANK)) {
                    boardCopy.putMark(this.mark, row, col);
                    score = CleverPlayer.minimax(boardCopy, 0, false);
                    boardCopy.putMark(Board.Mark.BLANK, row, col);
                    if (score > bestScore) {
                        bestScore = score;
                        bestMove[0] = row;
                        bestMove[1] = col;
                    }
                }
            }
        }
        board.putMark(this.mark, bestMove[0], bestMove[1]);
    }

    static minimax(board, depth, isMaximizing, mark) {
        let result = board.checkIfSomebodyWon();
        if (result) {
            const score = this.winnerMap.get(board.getWhoWin());
            return score;
        }
        // maximizing means opponent's POV
        let bestScore;
        if (isMaximizing) { // if it's maximizing, no need to reverse the this.mark
            bestScore = Number.MIN_VALUE;
            for (let row = 0; row < Board.SIZE; row++) {
                for (let col = 0; col < Board.SIZE; col++) {
                    // Is the spot available?
                    if (board.getMark(row, col) == Board.Mark.BLANK) {
                        board.putMark(mark, row, col);
                        let score = CleverPlayer.minimax(board, depth + 1, false, mark);
                        board.putMark(Board.Mark.BLANK, row, col);
                        bestScore = Math.max(score, bestScore);
                    }
                }
            }
        }
        // not maximizing means ai's turn
        else { // it is a maximizing state, need to reverse the this.mark
            bestScore = Number.MAX_VALUE;
            for (let row = 0; row < Board.SIZE; row++) {
                for (let col = 0; col < Board.SIZE; col++) {
                    // Is the spot available?
                    if (board.getMark(row, col) == Board.Mark.BLANK) {
                        board.putMark(CleverPlayer.oppositeMark(mark), row, col);
                        let score = CleverPlayer.minimax(board, depth + 1, true, CleverPlayer.oppositeMark(mark));
                        board.putMark(Board.Mark.BLANK, row, col);
                        bestScore = Math.min(score, bestScore);
                    }
                }
            }
        }
        return bestScore;

    }

    static oppositeMark (mark) {
        switch (mark) {
            case Board.Mark.O: {
                return Board.Mark.X;
            }
            case Board.Mark.X: {
                return Board.Mark.O;
            }
            default: return Board.Mark.BLANK;
        }
    }

}
