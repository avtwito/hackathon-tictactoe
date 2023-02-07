import { HumanPlayer } from "./static/HumanPlayer.js";
import { WhateverPlayer } from "./static/WhateverPlayer.js";
import { Game } from "./static/Game.js";
import { Board } from "./static/Board.js";
// app.use("/static", express.static('./static/'));


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
                case Board.Winner.X_WIN : winArray[i % 2]++;
                case Board.Winner.O_WIN : winArray[(i + 1) % 2]++;
                default : winArray[2]++;
            }
        }
        return winArray;
    }


    // I legt this here for later changes - use more kinds of players

    // /**
    //  * This method gets a string from the command line
    //  * with types of players to build,
    //  * and returns the players accordingly
    //  * @param playerRequest "clever"/"whatever"/"human"
    //  * @return Player CleverPlayer/WhateverPlayer/HumanPlayer
    //  */
    // static buildPlayer(playerRequest) {
    //     switch (playerRequest) {
    //         case "human" : return new HumanPlayer();
    //         case "whatever" : return new WhateverPlayer();
    //         // case "clever" : return new CleverPlayer();
    //     };
    //     return new HumanPlayer();
    // }


    static main() {
        const rounds = 1;

        const tournament = new Tournament(rounds, HumanPlayer, HumanPlayer);
        const score = tournament.playTournament();
        alert(`X wins: ${score[0]}. O wins: ${score[1]}. Draws: ${score[2]}`);
    }
}

Tournament.main();
