class PlayerFactory {
    public constructor() {

    }

    /**
     * This method gets a string from the command line
     * with types of players to build,
     * and returns the players accordingly
     * @param playerRequest "clever"/"whatever"/"human"
     * @return Player CleverPlayer/WhateverPlayer/HumanPlayer
     */
    public buildPlayer(playerRequest : String) : Player {
        switch (playerRequest) {
            case "human" : return new HumanPlayer();
            case "whatever" : return new WhateverPlayer();
            // case "clever" : return new CleverPlayer();
        };
        return new HumanPlayer();
    }
}
