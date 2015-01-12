$( document ).ready(function() {
    var socket = io.connect();
    var template = _.template($("#switchTemplate").html());

    socket.on("game current state", function(state) {
        render(state["SWITCHES"]);
        bindClicks();
        console.log(state.PLAYER_QUEUE);
    });

    socket.on("game explosion boom", function() {
        $("#bombText").text("BOOM!!!!!!");
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
            socket.emit("game reset");
        });
    };

    bindClicks();
});
