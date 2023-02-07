export default class Board {

    static SIZE = 5;
    static WIN_STREAK = 3;

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
        for (let row = 0; row < Board.SIZE; row++) {
            this.board[row] = new Array(Board.SIZE);
            for (let col = 0; col < Board.SIZE; col++) {
                this.board[row][col] = document.createElement('div');
                this.board[row][col].classList.add('tile');
                this.board[row][col].innerHTML = Mark.BLANK;
                document.querySelector(".board-container").appendChild(this.board[row][col]);
            }
        }
        Renderer.renderBoard();

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
        board[row][col].innerHTML = mark;
        board[row][col].classList.add(`player${mark}`);
        if (mark === Mark.BLANK) {
            emptySquares++;
            return true;
        }
        emptySquares--;
        if (checkWinner(mark, row, col)) {
            this.didSomebodyWin = true;
            whoWin = getEnumWinner(mark);
        }
        else if (emptySquares == 0) {
            this.didSomebodyWin = true;
            whoWin = Winner.DRAW;
        }
        return true;
    }

    checkWinner(mark, row, col) {


        //==================== horizontal ====================

        // count left
        let countWins = countMarkInDirection(row, col, 0, 1, mark);

        // count right
        countWins += countMarkInDirection(row, col, 0, -1, mark);

        if (countWins > Board.WIN_STREAK)
            return true;


        //==================== orthogonal ====================

        // count up
        countWins = countMarkInDirection(row, col, -1, 0, mark);

        // count down
        countWins += countMarkInDirection(row, col, 1, 0, mark);

        if (countWins > Board.WIN_STREAK)
            return true;


        // ========== diagonal left to right (down) ==========

        // count left up
        countWins = countMarkInDirection(row, col, -1, -1, mark);

        // count right down
        countWins += countMarkInDirection(row, col, 1, 1, mark);

        if (countWins > Board.WIN_STREAK)
            return true;


        // =========== diagonal right to left (up) ===========


        // count right up
        countWins = countMarkInDirection(row, col, -1, 1, mark);

        // count left down
        countWins += countMarkInDirection(row, col, 1, -1, mark);

        return countWins > Board.WIN_STREAK;
    }

    checkIfSomebodyWon() {
        return this.didSomebodyWin;
    }

    get whoWin() {
        return whoWin;
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
        return board[row][col].innerHTML;
    }


    //==================Private Methods==================
    getEnumWinner(winner) {
        if (winner == Mark.X)
            return Winner.X_WIN;
        if (winner == Mark.O)
            return Winner.O_WIN;
        return Winner.DRAW;
    }

    countMarkInDirection(row, col, rowDelta ,colDelta, mark) {
        let count = 0;
        while(row < Board.SIZE && row >= 0 && col < Board.SIZE && col >= 0 && board[row][col].innerHTML == mark) {
            count++;
            row += rowDelta;
            col += colDelta;
        }
        return count;
    }
}
