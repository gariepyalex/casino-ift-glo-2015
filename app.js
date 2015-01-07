var path = require('path');
var express = require('express');
var app = express();
var http = require('http');
var httpServer = http.Server(app);
var io = require('socket.io')(httpServer);

app.use(express.static(path.join(__dirname, 'public')));
app.use("/css",  express.static(__dirname + '/public/css'));
app.use("/js", express.static(__dirname + '/public/js'));

var PORT = process.env.PORT || 3000;

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

io.on("connection", function(socket){
  console.log("user connected");
});

httpServer.listen(PORT, function(){
  console.log("listening on port: " + PORT);
});
