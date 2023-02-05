
enum Mark {
    BLANK = "BLANK",
    X ="X",
    O = "O"
}

enum Winner {
    X_WIN = "X WINS!",
    O_WIN = "O WINS",
    DRAW = "IT'S A DRAW"
}

class Board {

    public static readonly SIZE : number = 5;
    public static readonly WIN_STREAK : number = 3;


    private board : HTMLDivElement[][];
    private emptySquares : number = Board.SIZE * Board.SIZE;
    private didSomebodyWin : boolean = false;
    private whoWin : Winner;

    //==================Public Methods==================

    /**
     * Constructor
     */
    public constructor() {
        this.board = new HTMLDivElement[Board.SIZE][Board.SIZE];
        for (let row : number = 0; row < Board.SIZE; row++) {
            for (let col : number = 0; col < Board.SIZE; col++) {
                this.board[row][col] = document.createElement('div');
                this.board[row][col].classList.add('tile');
                this.board[row][col].innerHTML = Mark.BLANK;

                document.querySelector("board-container")?.appendChild(this.board[row][col]);
            }
        }
    }

    /**
     * Copy constructor
     * @param boardCopy the board we want to copy from
     */
    public copyConstructor(boardCopy : Board) {
        this.board = new HTMLDivElement[Board.SIZE][Board.SIZE];
        for (let row : number = 0; row < Board.SIZE; row++) {
            for (let col = 0; col < Board.SIZE; col++) {
                this.board[row][col].innerHTML = boardCopy.getMark(row, col);
            }
        }
        this.emptySquares = boardCopy.emptySquares;
    }


    /**
     * This method allows users to put a mark in (row, col) coordinate on the board
     * @param mark the mark to put in (row, col)
     * @param row row coordinate
     * @param col col coordinate
     * @return true if update request has completed successfully, false otherwise
     */
    public putMark(mark : Mark, row : number, col : number) : boolean{
        if (row < 0 || row >= Board.SIZE || col < 0 || col >= Board.SIZE)
            return false;
        this.board[row][col].innerHTML = mark;
        if (mark === Mark.BLANK) {
            this.emptySquares++;
            return true;
        }
        this.emptySquares--;
        if (this.checkWinner(mark, row, col)) {
            this.didSomebodyWin = true;
            this.whoWin = this.getEnumWinner(mark);
        }
        else if (this.emptySquares == 0) {
            this.didSomebodyWin = true;
            this.whoWin = Winner.DRAW;
        }
        return true;
    }

    public checkWinner(mark : Mark, row : number, col : number) : boolean{


        //==================== horizontal ====================

        // count left
        let countWins : number = this.countMarkInDirection(row, col, 0, 1, mark);

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

    public checkIfSomebodyWon() : boolean {
        return this.didSomebodyWin;
    }

    public getWhoWin() : Winner {
        return this.whoWin;
    }

    /**
     * A method to read mark at a specific coordinate
     * @param row row coordinate
     * @param col col coordinate
     * @return enum Mark (X, O or BLANK)
     * or null in case coordinate is illegal
     */
    public getMark(row : number, col : number) : string {
        if (row < 0 || row >= Board.SIZE || col < 0 || col >= Board.SIZE)
            return "";
        return this.board[row][col].innerHTML;
    }


    //==================Private Methods==================
    private getEnumWinner(winner : Mark) : Winner {
        if (winner == Mark.X)
            return Winner.X_WIN;
        if (winner == Mark.O)
            return Winner.O_WIN;
        return Winner.DRAW;
    }

    private countMarkInDirection(row : number, col : number, rowDelta : number,colDelta : number, mark : Mark) : number{
        let count : number = 0;
        while(row < Board.SIZE && row >= 0 && col < Board.SIZE && col >= 0 && this.board[row][col].innerHTML == mark) {
            count++;
            row += rowDelta;
            col += colDelta;
        }
        return count;
    }
}
