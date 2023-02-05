class HumanPlayer{

    /**
     * This method asks for coordinates from the user
     * and calls the relevant methods to play this turn.
     * @param board given current board
     * @param mark current player's mark
     */
    static playTurn(board, mark) {
        for (let row = 0; row < Board.SIZE; row++) {
            for (let col = 0; col < Board.SIZE; col++) {
                board[row][col].addEventListener("click", board.putMark(mark, row, col));
            }
        }
    }
}
