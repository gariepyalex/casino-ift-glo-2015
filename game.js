var SwitchArrayBuilder = require("./switchArrayBuilder.js");

var Game = function(callback, builder) {

    this.bombExplosion = function() {
        currentNumberOfSwitch--;
        self.reset()
        callback();
    };

    this.reset = function() {
        switchArray = switchArrayBuilder.withBombCallback(this.bombExplosion)
                                        .withNumberOfSwitches(currentNumberOfSwitch)
                                        .build();
    };

    this.getStateJSON = function() {
        var switches = [];
        for(var i = 0; i < switchArray.length; i++) {
            switches.push(switchArray[i].toJSON());
        }
        return {
            "switches": switches
        }
    }

    this.pressSwitch = function(name) {
        var found = false;
        switchArray.forEach(function(s) {
            if(s.getName() == name && !s.isActivated()) {
                found = true;
                s.press();
                console.log("press " + s.getName());
                return;
            }
        });
    };

    this.newGame = function() {
        currentNumberOfSwitch = 5;
        self.reset();
    }

    var switchArrayBuilder = builder || new SwitchArrayBuilder();
    var currentNumberOfSwitch = 5;
    var switchArray;
    var self = this;
    self.reset();

};

module.exports = Game;
