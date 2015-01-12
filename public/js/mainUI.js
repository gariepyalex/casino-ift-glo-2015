$( document ).ready(function() {
    var socket = io.connect();
    var template = _.template($("#switchTemplate").html());

    socket.on("game current state", function(state) {
        render(state["SWITCHES"]);
        bindClicks();
        console.log(state);
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
