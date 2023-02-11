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

    async playTournament() {
        let match;
        let winArray = [0, 0, 0];
        let winner;
        console.log(this.rounds);
        for (let i = 0; i < this.rounds; i++) {
            match = new Game(this.players[i % 2], this.players[(i + 1) % 2]);
            winner = match.run();
            document.querySelector("#reset").addEventListener("click", () => {
                match = new Game(this.players[i % 2], this.players[(i + 1) % 2])
            });
            await winner;
            winner.then(function (value) {
                console.log(value);
                    if (value === Board.Winner.X_WIN)
                        winArray[0]++;
                    else if (value === Board.Winner.O_WIN)
                        winArray[1]++;
                    else
                        winArray[2]++;
            })
        }
        return winArray;
    }


    // I left this here for later changes - use more kinds of players

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


    static async starter(rounds) {
        const tournament = new Tournament(rounds, HumanPlayer, HumanPlayer);
        const score = tournament.playTournament();
        await score;
        score.then(function (value) { myDisplayer(value); })
    }
}

function main() {
    let rounds = 1;
    const roundsCount = document.querySelectorAll('#rounds input');
    for (const input of roundsCount) {
        input.addEventListener("change", function (e) {
            rounds = e.target.value;
        })
    }

    const boardSize = document.querySelectorAll('#size input');
    for (const input of boardSize) {
        input.addEventListener("change", (e) => {
            Board.SIZE = e.target.value;
        })
    }

    const winStreak = document.querySelectorAll('#win-streak input');
    for (const input of winStreak) {
        input.addEventListener("change", (e) => {
            Board.WIN_STREAK = e.target.value;
        })
    }

    document.querySelector("#start").addEventListener("click", () => {
        Tournament.starter(rounds);
    })

}

main();

function myDisplayer(value) {
    const resultDiv = document.querySelector("#result");
    resultDiv.textContent = (`X wins: ${value[0]}. O wins: ${value[1]}. Draws: ${value[2]}`);
    document.querySelector(".turn-board").style.display = "none";
    document.querySelector(".result").style.display = "flex";
}