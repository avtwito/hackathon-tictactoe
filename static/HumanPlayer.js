import { Board } from "./Board.js"
import { Player } from "./Player.js"

export class HumanPlayer extends Player {

    /**
     * This method asks for coordinates from the user
     * and calls the relevant methods to play this turn.
     * @param board given current board
     */
    static playTurn(board) {
        const that = this;
        return new Promise(acc => {
            function handleClick(row, col) {
                document.removeEventListener('click', () => {handleClick(row, col)});
                if (board.putMark(that.mark, row, col)) {
                    acc();
                }
            }
            for (let row = 0; row < Board.SIZE; row++) {
                for (let col = 0; col < Board.SIZE; col++) {
                    if (board.getMark(row, col) === Board.Mark.BLANK) {
                        board.board[row][col].addEventListener("click", () => {handleClick(row, col)});
                    }
                }
            }
        });
    }
}
