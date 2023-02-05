class WhateverPlayer implements Player {
    public playTurn(board : Board, mark : Mark) : void {
        let row : number = Math.random() * (Board.SIZE - 1) + 1;
        let col : number = Math.random() * (Board.SIZE - 1) + 1;
        while (board.getMark(row, col) != Mark.BLANK) {
            row = Math.random() * (Board.SIZE - 1) + 1;
            col = Math.random() * (Board.SIZE - 1) + 1;
        }
        board.putMark(mark, row, col);
    }
}
