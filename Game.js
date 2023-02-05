class Game {

    playerX;
    playerO;

    constructor(playerX, playerO) {
        this.playerX = playerX;
        this.playerO = playerO;
    }

    run() {
        const board = new Board();
        const players = [this.playerX, this.playerO];
        const marks = [Mark.X, Mark.O];
        let counter = 0;
        while (!board.checkIfSomebodyWon()) {
            players[counter % 2].playTurn(board, marks[counter % 2]);


            counter++;
        }
        // If you reached here - somebody won
        return board.getWhoWin();
    }

}