var casino = casino || {};

$( document ).ready(function() {
    var socket = io.connect();
    var template = _.template($("#switchTemplate").html());
    var renderer = new casino.renderer();

    socket.on("game current state", function(state) {
        console.log(state);
        if(state["SWITCHES"]){
            render(state["SWITCHES"]);
            renderer.setSwitchState(state["SWITCHES"]);
        } if(state["EVENTS"]) {
            renderer.addToRenderQueue(state["EVENTS"]);
        }
        bindClicks();
    });

    var render = function(switches) {
        $("#buttonList").html(template({switches: switches}));
        _.each(switches, function(s) {
            if(s.activated){
                $('#' + s.name).prop('disabled', true);
            }
        });
    };

    var bindClicks = function() {

        $("#buttonList button").unbind("click");
        $("#buttonList button").click(function(event){
            socket.emit("game press switch", event.target.id);
        });


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
