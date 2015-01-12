var SwitchArrayBuilder = require("./switchArrayBuilder.js");
var EventLog = require("./eventLog.js");

module.exports = function(builder) {

    this.newGame = function() {
        gameStarted = true;
        eventLog.clear();
        playerQueue.reset();
        currentNumberOfSwitch = 5;
        turn = 0;
        gameOver = false;
        self.buildNewSwitches();
    };

    this.setPlayerQueue = function(queue) {
        playerQueue = queue;
    }

    this.buildNewSwitches = function() {
        eventLog.logNewSwitchesEvent(turn);
        switchArray = switchArrayBuilder.withNumberOfSwitches(currentNumberOfSwitch)
                                        .build();
        numberOfPressedSwitches = 0;
    };

    this.pressSwitch = function(name) {
        if(!gameOver) {
            switchArray.forEach(function(s) {
                if(s.getName() == name && !s.isActivated()) {
                    numberOfPressedSwitches++;
                    turn++;
                    eventLog.logPressEvent(turn, playerQueue.getCurrentPlayer["ID"], s.getName());
                    s.press();
                    if(s.isBomb()) {
                        self.bombExplosion();
                    }else {
                        playerQueue.nextPlayer();
                    }
                }
            });
            if(checkIfOnlyOneSwitchRemaining()) { //That switch will cause the bomb to explode
                this.buildNewSwitches();
            }
        }
    };

    this.bombExplosion = function() {
        eventLog.logExplosionEvent(turn, playerQueue.getCurrentPlayer["ID"]);
        playerQueue.killCurrentPlayer();
        currentNumberOfSwitch--;
        if(playerQueue.getNumberOfAlivePlayers() == 1) {
            gameOver = true;
            eventLog.logWinEvent(turn, playerQueue.getCurrentPlayer["ID"]);
        } else {
            self.buildNewSwitches()
        }
    };

    this.getStateJSON = function() {
        if(gameStarted){
            var switches = [];
            for(var i = 0; i < switchArray.length; i++) {
                switches.push(switchArray[i].toJSON());
            }
            return {
                "SWITCHES": switches,
                "EVENTS": eventLog.getEventsOfTurn(turn),
                "CURRENT_PLAYER": playerQueue.getCurrentPlayer(),
                "PLAYER_QUEUE": playerQueue.getPlayerArray()
            };
        } else {
            return {};
        }
    };

    var checkIfOnlyOneSwitchRemaining = function() {
        return numberOfPressedSwitches + 1 === currentNumberOfSwitch;
    };

    var switchArrayBuilder = builder || new SwitchArrayBuilder();
    var currentNumberOfSwitch;
    var turn;
    var numberOfPressedSwitches;
    var gameStarted = false
    var gameOver;
    var eventLog = new EventLog();
    var switchArray;
    var playerQueue;
    var self = this;
};
