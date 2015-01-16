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
            renderer.addToRenderQueue(state["EVENTS"]);
        }
    });

    var bindClicks = function() {
        $("#reset").unbind("click");
        $("#reset").click(function(event){
            socket.emit("game set players", [
                    {"ID": 1, "NAME": "Gari"},
                    {"ID": 2, "NAME": "JS"},
                    {"ID": 3, "NAME": "Dario"},
                    {"ID": 4, "NAME": "David"}
            ]);
            socket.emit("game reset");
        });
    };

    bindClicks();
});
