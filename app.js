var path = require('path');
var express = require('express');
var app = express();
var http = require('http');
var httpServer = http.Server(app);
var io = require('socket.io')(httpServer);
var Game = require("./game.js");
var game = new Game(explosionCallback);

app.use(express.static(path.join(__dirname, 'public')));
app.use("/css",  express.static(__dirname + '/public/css'));
app.use("/js", express.static(__dirname + '/public/js'));

var PORT = process.env.PORT || 3000;

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});


io.on("connection", function(socket) {
        console.log("user connected");
        socket.emit("game current state", game.getStateJSON());

        socket.on("game reset", function() {
            game.reset();
            io.emit("game current state", game.getStateJSON());
        });

        socket.on("game press switch", function(id) {
            game.pressSwitch(id);
            io.emit("game current state", game.getStateJSON());
        });
});

function explosionCallback() {
    console.log("boom");
    io.emit("game explosion boom");
};

httpServer.listen(PORT, function(){
  console.log("listening on port: " + PORT);
});
