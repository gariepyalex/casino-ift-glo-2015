var path = require('path');
var express = require('express');
var app = express();
var http = require('http');
var httpServer = http.Server(app);
var io = require('socket.io')(httpServer);
var PlayerQueue = require("./playerQueue.js");
var Game = require("./game.js");
var game = new Game();
game.setPlayerQueue(new PlayerQueue([
            {ID: "1", NAME: "TOTO"},
            {ID: "2", NAME: "FOO"},
            {ID: "3", NAME: "BAR"},
            {ID: "4", NAME: "REDDIT"},
        ]));

app.use(express.static(path.join(__dirname, 'public')));
app.use("/css",  express.static(__dirname + '/public/css'));
app.use("/js", express.static(__dirname + '/public/js'));
app.use("/img", express.static(__dirname + '/public/img'));

var PORT = process.env.PORT || 3000;

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/mainUI.html');
});

app.get('/switch', function(req, res) {
    res.sendFile(__dirname + '/public/switchUI.html');
});


io.on("connection", function(socket) {
    console.log("user connected");
    socket.emit("game current state", game.getStateJSON());

    socket.on("game reset", function() {
        game.newGame();
        io.emit("game current state", game.getStateJSON());
    });

    socket.on("game press switch", function(id) {
        game.pressSwitch(id);
        io.emit("game current state", game.getStateJSON());
    });

    socket.on("game set players", function(playerArray) {
        if(isValidPlayerArray(playerArray)) {
            game.setPlayerQueue(new PlayerQueue(playerArray));
            console.log("NEW PLAYERS ADDED");
        } else {
            console.error("INVALID PLAYER ARRAY FORMAT");
        }
    });
});

var isValidPlayerArray = function(playerArray) {
    var valid = true;
    if(playerArray.length !== 4) {
        valid = false;
    }
    playerArray.forEach(function(player) {
        if(!player["ID"] || !player["NAME"]){
            valid = false;
        }
    });
    return valid;
};


httpServer.listen(PORT, function(){
  console.log("listening on port: " + PORT);
});
