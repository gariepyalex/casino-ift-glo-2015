var SwitchArrayBuilder = require("./switchArrayBuilder.js");
var EventLog = require("./eventLog.js");

module.exports = function(callback, builder) {

    this.bombExplosion = function() {
        eventLog.logExplosionEvent(turn, 0);
        currentNumberOfSwitch--;
        if(currentNumberOfSwitch === 1) {
            gameOver = true;
            eventLog.logWinEvent(turn, 0);
        } else {
            self.buildNewSwitches()
            callback();
        }
    };

    this.buildNewSwitches = function() {
        eventLog.logNewSwitchesEvent(turn);
        switchArray = switchArrayBuilder.withBombCallback(this.bombExplosion)
                                        .withNumberOfSwitches(currentNumberOfSwitch)
                                        .build();
        numberOfPressedSwitches = 0;
    };

    this.getStateJSON = function() {
        var switches = [];
        for(var i = 0; i < switchArray.length; i++) {
            switches.push(switchArray[i].toJSON());
        }
        return {
            "switches": switches
        }
    };

    this.pressSwitch = function(name) {
        if(!gameOver) {
            switchArray.forEach(function(s) {
                if(s.getName() == name && !s.isActivated()) {
                    numberOfPressedSwitches++;
                    turn++;
                    eventLog.logPressEvent(turn, 0, s.getName());
                    s.press();
                }
            });
            if(checkIfOnlyOneSwitchRemaining()) { //That switch will cause the bomb to explode
                this.buildNewSwitches();
            }
        }
    };

    var checkIfOnlyOneSwitchRemaining = function() {
        return numberOfPressedSwitches + 1 === currentNumberOfSwitch;
    };

    this.newGame = function() {
        eventLog.clear();
        currentNumberOfSwitch = 5;
        turn = 0;
        gameOver = false;
        self.buildNewSwitches();
    };

    var switchArrayBuilder = builder || new SwitchArrayBuilder();
    var currentNumberOfSwitch;
    var turn;
    var numberOfPressedSwitches;
    var gameOver;
    var eventLog = new EventLog();
    var switchArray;
    var self = this;
    self.newGame();

};
