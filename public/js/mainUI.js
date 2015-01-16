var casino = casino || {};

$( document ).ready(function() {
    var socket = io.connect();
    var renderer = new casino.renderer();

    renderer.addSwitchPressListener(function(switchId) {
        socket.emit("game press switch", switchId);
    });

    socket.on("game current state", function(state) {
        console.log(state);
        if(state["SWITCHES"]){
            renderer.setSwitchState(state["SWITCHES"]);
        } if(state["EVENTS"]) {
            renderer.setEventRenderQueue(state["EVENTS"]);
        }
    });

    var bindClicks = function() {
        $("#reset").unbind("click");
        $("#reset").click(function(){
            socket.emit("game reset");
        });
    };

    bindClicks();
});
