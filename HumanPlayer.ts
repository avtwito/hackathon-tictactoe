class HumanPlayer implements Player {

    public constructor() {

    }

    /**
     * This method asks for coordinates from the user
     * and calls the relevant methods to play this turn.
     * @param board given current board
     * @param mark current player's mark
     */
    public playTurn(board : Board, mark : Mark) : void {
        for (let row : number = 0; row < Board.SIZE; row++) {
            for (let col : number = 0; col < Board.SIZE; col++) {
                board[row][col].addEventListener("click", board.putMark(mark, row, col));
            }
        }
    }
}
