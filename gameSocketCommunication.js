var Game = require("./game.js");

module.exports = function(http, io) {
    var socket;
    var explosionCallback = function() {
        console.log("boom");
        socket.emit("game explosion boom");
    };

    var game = new Game(explosionCallback);

    this.onConnection = function(s) {
        socket = s;
        console.log("user connected");
        socket.emit("game current state", game.getStateJSON());

        socket.on("game reset", function() {
            game.reset();
            socket.emit("game current state", game.getStateJSON());
        });

        socket.on("game press switch", function(id) {
            try{
                game.pressSwitch(id);
                socket.emit("game current state", game.getStateJSON());
            } catch(e){
                console.log("Invalid switch");
            }
        });
    };
};
