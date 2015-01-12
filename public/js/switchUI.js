$( document ).ready(function() {
    var socket = io.connect();
    var template = _.template($("#switchTemplate").html());

    socket.on("game current state", function (state) {
        render(state["SWITCHES"]);
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
        $("#switchContainer .switch").unbind("click");
        $("#switchContainer .switch").click(function (event) {
            socket.emit("game press switch", event.target.getAttribute("data-id"));
        });
    };

    bindClicks();
});
