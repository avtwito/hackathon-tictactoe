/**
 * Class commits a series of TicTacToe matches between two given players
 * with a given renderer, as between the matches the players switch roles.
 * At the end of every match, the current score will be printed
 */
class Tournament {

    rounds;
    players;

    constructor(rounds, player1, player2) {
        this.rounds = rounds;
        this.players = [player1, player2];
    }

    playTournament() {
        let match;
        let winArray = [0, 0, 0];
        let winner;
        for (let i = 0; i < this.rounds; i++) {
            match = new Game(this.players[i % 2], this.players[(i + 1) % 2]);
            winner = match.run();
            switch (winner) {
                case Winner.X_WIN : winArray[i % 2]++;
                case Winner.O_WIN : winArray[(i + 1) % 2]++;
                default : winArray[2]++;
            }
        }
        return winArray;
    }


    static main() {
        const rounds = 1;
        const player1Type = "human";
        const player2Type = "human";

        const player1  = PlayerFactory.buildPlayer(player1Type);
        const player2 = PlayerFactory.buildPlayer(player2Type);
        if (renderer == null || player1 == null || player2 == null) {
            alert("Not supported");
            return;
        }

        const tournament = new Tournament(rounds, player1, player2);
        const score = tournament.playTournament();
        alert(`X wins: ${score[0]}. O wins: ${score[1]}. Draws: ${score[2]}`);
    }
}

Tournament.main();
