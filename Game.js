class Game {

    playerX;
    playerO;

    constructor(playerX, playerO, renderer) {
        this.playerX = playerX;
        this.playerO = playerO;
    }

    run() {
        const board = new Board();
        const players = [this.playerX, this.playerO];
        const marks = [Mark.X, Mark.O];
        let counter = 0;
        while (!board.checkIfSomebodyWon()) {
            Renderer.renderBoard(board);
            players[counter % 2].playTurn(board, marks[counter % 2]);


            counter++;
        }
        // If you reached here - somebody won
        Renderer.renderBoard(board);
        return board.getWhoWin();
    }

}