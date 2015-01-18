var casino = casino || {};

$( document ).ready(function() {
    var socket = io.connect();
    var renderer = new casino.renderer();
    var lastState;

    renderer.addSwitchPressListener(function(switchId) {
        socket.emit("game press switch", switchId);
    });

    socket.on("game current state", function(state) {
        lastState = state;
        if(state["SWITCHES"]){
            renderer.setSwitchState(state["SWITCHES"]);
        }
        if(state["EVENTS"]) {
            renderer.setEventRenderQueue(state["EVENTS"]);
        }
    });

    var renderFinished = function() {
        updatePlayerList(lastState);
    };

    var bindClicks = function() {
        var reset =  $("#reset");
       reset.unbind("click");
        reset.click(function(){
            socket.emit("game reset");
        });
    };

    var updatePlayerList = function(state){
        var i = 1;
        clearPlayerList();
        _.each(state.PLAYER_QUEUE, function(player){
            addPlayerToListAtPosition(player, i);
            i = i + 1
        });
    };

    var addPlayerToListAtPosition = function(player, position){
        var playerPosition = $("#playerPosition" + position);
        var playerName = playerPosition.children(".playerName");
        var playerImage = playerPosition.children("img");
        playerName.text(player.NAME);
        playerImage.removeClass();
        playerImage.addClass("playerImage");
        playerImage.addClass("D" + player.ID.toString())
    };

    var clearPlayerList = function(){
        for (var i = 1; i <= 4; i++){
            var playerPosition = $("#playerPosition" + i);
            var playerName = playerPosition.children(".playerName");
            var playerImage = playerPosition.children("img");
            playerName.text("");
            playerImage.removeClass();
        }
    };

    bindClicks();
    renderer.addAnimationFinishedListener(renderFinished);
});