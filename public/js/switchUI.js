$( document ).ready(function() {
    var socket = io.connect();
    var template = _.template($("#switchTemplate").html());

    socket.on("game current state", function (state) {
        render(state["SWITCHES"]);
        updateCurrentPlayer(state);
        if (gameIsOver(state)){
            $("#playerMessage").text("You've won!")
        }
        bindClicks();
    });

    var render = function (switches) {
        $("#switchContainer").html(template({switches: switches}));
        _.each(switches, function (s) {
            if (s.activated) {
                $('#' + s.name).prop('disabled', true);
            }
        });
    };


    var bindClicks = function () {
        var any_switch = $("#switchContainer").children(".switch");
        any_switch.unbind("click");
        any_switch.click(function (event) {
            socket.emit("game press switch", event.target.getAttribute("data-id"));
        });
    };

    var updateCurrentPlayer = function(state) {
        var currentPlayer = $("#currentPlayer");
        var playerName = state.CURRENT_PLAYER.NAME;
        currentPlayer.text(playerName)
    };

    var gameIsOver = function(state){
      return state.PLAYER_QUEUE.length == 1;
    };

    bindClicks();
});
