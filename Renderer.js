class Renderer {
    static renderBoard(board) {
        const container = document.querySelector(".board-container");
        let div;
        for (let i = 0; i < Board.SIZE; i++) {
            for (let j = 0; j < Board.SIZE; j++) {
                div = document.createElement('div');
                div.classList.add('tile');
                container.appendChild(div);
                
            }
        }
    }
}
