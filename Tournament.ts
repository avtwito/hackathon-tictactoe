/**
 * Class commits a series of TicTacToe matches between two given players
 * with a given renderer, as between the matches the players switch roles.
 * At the end of every match, the current score will be printed
 */
class Tournament {

    private rounds : number;
    private renderer : Renderer;
    private players : Player[];

    public constructor(rounds : number, renderer : Renderer,
                      player1 : Player, player2 : Player) {
        this.rounds = rounds;
        this.renderer = renderer;
        this.players = [player1, player2];
    }

    public playTournament() : number[]{
        let match : Game;
        let winArray : number[] = [0, 0, 0];
        let winner : Winner;
        for (let i = 0; i < this.rounds; i++) {
            match = new Game(this.players[i % 2], this.players[(i + 1) % 2], this.renderer);
            winner = match.run();
            switch (winner) {
                case Winner.X_WIN : winArray[i % 2]++;
                case Winner.O_WIN : winArray[(i + 1) % 2]++;
                default : winArray[2]++;
            }
        }
        return winArray;
    }


    public static main() : void{
        const rounds : number = 1;
        const player1Type : string = "human";
        const player2Type : string = "human";
        const playerFactory : PlayerFactory = new PlayerFactory();

        const renderer = new Renderer();
        const player1 : Player  = playerFactory.buildPlayer(player1Type);
        const player2 : Player = playerFactory.buildPlayer(player2Type);
        if (renderer == null || player1 == null || player2 == null) {
            alert("Not supported");
            return;
        }

        const tournament : Tournament = new Tournament(rounds, renderer, player1, player2);
        const score : number[] = tournament.playTournament();
        alert(`X wins: ${score[0]}. O wins: ${score[1]}. Draws: ${score[2]}`);
    }
}
