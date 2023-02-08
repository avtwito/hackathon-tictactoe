import { Board } from "./Board.js";

export class Game {

    playerX;
    playerO;

    constructor(playerX, playerO) {
        this.playerX = playerX;
        this.playerO = playerO;
    }

    async run() {
        const board = new Board();
        const players = [this.playerX, this.playerO];
        const marks = [Board.Mark.X, Board.Mark.O];
        let counter = 0;
        while (!board.checkIfSomebodyWon()) {
            players[counter % 2].mark = marks[counter % 2]
            await players[counter % 2].playTurn(board);

            counter++;
        }
        // If you reached here - somebody won
        return board.whoWin;
    }

}