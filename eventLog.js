module.exports = function() {
    this.logPressEvent = function(turn, playerId, switchId) {
        if(!events[turn]) {
            events[turn] = [];
        }
        events[turn].push({
            TURN: turn,
            NAME: "PRESS",
            PLAYER_ID: playerId,
            SWITCH_ID: switchId
        });
    };

    this.logExplosionEvent = function(turn, playerId) {
        if(!events[turn]) {
            events[turn] = [];
        }
        events[turn].push({
            TURN: turn,
            NAME: "EXPLOSION",
            PLAYER_ID: playerId
        });
    };

    this.logNewSwitchesEvent = function(turn, switches) {
        if(!events[turn]) {
            events[turn] = [];
        }
        events[turn].push({
            TURN: turn,
            NAME: "NEW_SWITCHES",
            SWITCHES: switches
        });
    };

    this.logWinEvent = function(turn, playerId) {
        if(!events[turn]) {
            events[turn] = [];
        }
        events[turn].push({
            TURN: turn,
            NAME: "WIN",
            PLAYER_ID: playerId
        });
        console.log(events[turn]);
    };

    this.getEventsOfTurn = function(turn) {
        return events[turn] || [];
    };

    this.clear = function() {
        events = [];
    };


    var events = [];

};
