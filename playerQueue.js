var shuffle = require("knuth-shuffle");

module.exports = function(playerArray) {
    var killedPlayers = [];

    this.killCurrentPlayer = function() {
        killedPlayers.push(playerArray.shift());
    };

    this.nextPlayer = function() {
        var p = playerArray.shift();
        playerArray.push(p);
    };

    this.getCurrentPlayer = function() {
        return playerArray[0];
    };

    this.getNumberOfAlivePlayers = function() {
        return playerArray.length;
    };

    this.getPlayerArray = function() {
        return playerArray;
    };
    
    this.reset = function() {
        shuffle.knuthShuffle(playerArray);
        playerArray = playerArray.concat(killedPlayers);
        killedPlayers = [];
    }
};
