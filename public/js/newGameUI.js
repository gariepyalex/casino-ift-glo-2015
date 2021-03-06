$(document).ready(function() {

    var socket = io.connect();

    $(".newGameButton").click(function(){
        var player1 = $("#player1 div input").val();
        var player2 = $("#player2 div input").val();
        var player3 = $("#player3 div input").val();
        var player4 = $("#player4 div input").val();

        socket.emit("game set players", [
            {"ID": 1, "NAME": player1},
            {"ID": 2, "NAME": player2},
            {"ID": 3, "NAME": player3},
            {"ID": 4, "NAME": player4}
        ]);

        socket.emit("game reset");

        document.location.href = "/game"
    });

});