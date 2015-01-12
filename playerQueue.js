module.exports = function(playerArray) {
    this.killCurrentPlayer = function() {
        playerArray.shift();
    }

    this.nextPlayer = function() {
        var p = playerArray.shift();
        playerArray.push(p);
    }
};
