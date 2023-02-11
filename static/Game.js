import { Board } from "./Board.js";

export class Game {

    playerX;
    playerO;
    board;

    constructor(playerX, playerO) {
        this.playerX = playerX;
        this.playerO = playerO;
        this.board = new Board();
    }

    async run() {
        const players = [this.playerX, this.playerO];
        const marks = [Board.Mark.X, Board.Mark.O];
        let counter = 0;
        let current_mark;
        while (!this.board.checkIfSomebodyWon()) {
            current_mark = marks[counter % 2];
            document.querySelector("#turn-board").innerHTML = current_mark;
            document.querySelector("#turn-board").className = `player${current_mark}`;
            players[counter % 2].mark = current_mark;
            await players[counter % 2].playTurn(this.board);

            counter++;
        }
        // If you reached here - somebody won
        return this.board.whoWin;
    }

}