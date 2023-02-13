import { Renderer } from "./Renderer.js"

export class Board {

    static SIZE;
    static WIN_STREAK;

    static Mark = {
        BLANK: "",
        X: "X",
        O: "O"
    }
    static Winner =  {
        X_WIN: "X WINS!",
        O_WIN: "O WINS",
        DRAW: "IT'S A DRAW"
    }


    board = new Array(Board.SIZE);
    emptySquares = Board.SIZE * Board.SIZE;
    didSomebodyWin = false;
    whoWin;

    //==================Public Methods==================

    /**
     * Constructor
     */
    constructor() {
        document.querySelector(".board-container").innerHTML = ''
        for (let row = 0; row < Board.SIZE; row++) {
            this.board[row] = new Array(Board.SIZE);
            for (let col = 0; col < Board.SIZE; col++) {
                this.board[row][col] = document.createElement('div');
                this.board[row][col].classList.add('tile');
                this.board[row][col].innerHTML = Board.Mark.BLANK;
                document.querySelector(".board-container").appendChild(this.board[row][col]);
            }
        }
        Renderer.renderBoard(this.board);
    }


    /**
     * This method allows users to put a mark in (row, col) coordinate on the board
     * @param mark the mark to put in (row, col)
     * @param row row coordinate
     * @param col col coordinate
     * @return true if update request has completed successfully, false otherwise
     */
    putMark(mark, row, col) {
        if (row < 0 || row >= Board.SIZE || col < 0 || col >= Board.SIZE)
            return false;
        this.board[row][col].innerHTML = mark;
        this.board[row][col].classList.add(`player${mark}`);
        if (mark === Board.Mark.BLANK) {
            this.emptySquares++;
            return true;
        }
        this.emptySquares--;
        if (this.checkWinner(mark, row, col)) {
            this.didSomebodyWin = true;
            this.whoWin = this.markToWinner(mark);
        }
        else if (this.emptySquares == 0) {
            this.didSomebodyWin = true;
            this.whoWin = Board.Winner.DRAW;
        }
        return true;
    }

    checkWinner(mark, row, col) {


        //==================== horizontal ====================

        // count left
        let countWins = this.countMarkInDirection(row, col, 0, 1, mark);

        // count right
        countWins += this.countMarkInDirection(row, col, 0, -1, mark);

        if (countWins > Board.WIN_STREAK)
            return true;


        //==================== orthogonal ====================

        // count up
        countWins = this.countMarkInDirection(row, col, -1, 0, mark);

        // count down
        countWins += this.countMarkInDirection(row, col, 1, 0, mark);

        if (countWins > Board.WIN_STREAK)
            return true;


        // ========== diagonal left to right (down) ==========

        // count left up
        countWins = this.countMarkInDirection(row, col, -1, -1, mark);

        // count right down
        countWins += this.countMarkInDirection(row, col, 1, 1, mark);

        if (countWins > Board.WIN_STREAK)
            return true;


        // =========== diagonal right to left (up) ===========


        // count right up
        countWins = this.countMarkInDirection(row, col, -1, 1, mark);

        // count left down
        countWins += this.countMarkInDirection(row, col, 1, -1, mark);

        return countWins > Board.WIN_STREAK;
    }

    checkIfSomebodyWon() {
        return this.didSomebodyWin;
    }

    get whoWin() {
        return this.whoWin;
    }

    /**
     * A method to read mark at a specific coordinate
     * @param row row coordinate
     * @param col col coordinate
     * @return enum Mark (X, O or BLANK)
     * or null in case coordinate is illegal
     */
    getMark(row, col) {
        if (row < 0 || row >= Board.SIZE || col < 0 || col >= Board.SIZE)
            return null;
        return this.board[row][col].innerHTML;
    }

    /**
     * 
     * @param {Board.Mark} mark 
     * @returns {Board.Winner}
     */
    markToWinner(mark) {
        return (mark === Board.Mark.X) ? Board.Winner.X_WIN : Board.Winner.O_WIN;
    }


    countMarkInDirection(row, col, rowDelta ,colDelta, mark) {
        let count = 0;
        while(row < Board.SIZE && row >= 0 && col < Board.SIZE && col >= 0 && this.board[row][col].innerHTML == mark) {
            count++;
            row += rowDelta;
            col += colDelta;
        }
        return count;
    }
}
