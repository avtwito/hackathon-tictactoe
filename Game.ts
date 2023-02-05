class Game {

    private playerX : Player;
    private playerO : Player;
    private renderer : Renderer;

    public constructor(playerX : Player, playerO : Player, renderer : Renderer) {
        this.playerX = playerX;
        this.playerO = playerO;
        this.renderer = renderer;
    }

    public run() : Winner {
        const board : Board = new Board();
        const players : Player[] = [this.playerX, this.playerO];
        const marks : Mark[] = [Mark.X, Mark.O];
        let counter : number = 0;
        while (!board.checkIfSomebodyWon()) {
            this.renderer.renderBoard(board);
            players[counter % 2].playTurn(board, marks[counter % 2]);


            counter++;
        }
        // If you reached here - somebody won
        this.renderer.renderBoard(board);
        return board.getWhoWin();
    }

}