$( document ).ready(function() {
    var socket = io.connect();
    var template = _.template($("#switchTemplate").html());

    var lastState;
    var blocked = false;

    socket.on("game current state", function (state) {
        lastState = state;
    });

    socket.on("game ui block", function() {
        blocked = true;
    });

    socket.on("game ui unblock", function() {
        render(lastState["SWITCHES"]);
        updateCurrentPlayer(lastState);
        updateSwitches(lastState);
        var playerMessage = $("#playerMessage");
        playerMessage.text("");
        if (gameIsOver(lastState)){
            playerMessage.text("You've won!")
        }
        bindClicks();
        blocked = false;
    });

    var render = function (switches) {
        $("#switchContainer").html(template({switches: switches}));
        _.each(switches, function (s) {
            if (s.activated) {
                var current_switch = $('#' + s.name);
                current_switch.prop('disabled', true);
            }
        });
    };

    var bindClicks = function () {
        var any_switch = $("#switchContainer").children(".switch");
        any_switch.unbind("click");
        any_switch.click(function (event) {
            if(!blocked){
                if(lastState) {
                    lastState.SWITCHES.forEach(function(s) {
                        if(s.name == event.target.getAttribute("data-id") && !s.activated) {
                            socket.emit("game press switch", event.target.getAttribute("data-id"));
                        }
                    });
                }
            }
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

    var updateSwitches = function(state){
        var switches = state.SWITCHES;
        _.each(switches, function (s, i) {
            var current_switch_img = $(".switch[data-id=" + s.name + "]").children("img");
            current_switch_img.removeClass();

            switch (i % switches.length){
                case 0:
                    current_switch_img.addClass("redSwitch");
                    break;
                case 1:
                    current_switch_img.addClass("yellowSwitch");
                    break;
                case 2:
                    current_switch_img.addClass("blueSwitch");
                    break;
                case 3:
                    current_switch_img.addClass("greenSwitch");
                    break;
                case 4:
                    current_switch_img.addClass("purpleSwitch");
                    break;
                default:
                    current_switch_img.addClass("inactiveSwitch");
            }

            if (s.activated){
                current_switch_img.addClass("inactiveSwitch")
            }
        });
    };

    bindClicks();
});
