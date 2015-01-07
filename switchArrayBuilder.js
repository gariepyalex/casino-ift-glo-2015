var Switch = require("./bombSwitch.js");
var randomstring = require("randomstring");
var shuffle = require("knuth-shuffle");

var SwitchArrayBuilder = function() {
    var numberOfSwitches = 5;
    var bombCallback;
    var shuffleSwitches = true;

    this.withSwitches = function(n) {
        if(n > 5 || n < 1) {
            throw new Error("Invalid number of switches");
        }
        numberOfSwitches = n;
    };

    this.withBombCallback = function(callback) {
        bombCallback = callback;
    }

    this.withShuffle = function(shuffle) {
        shuffleSwitches = shuffle;
    };

    this.build = function() {
        var switches = [];

        for(var i = 0; i < numberOfSwitches; i++) {
            var newSwitch = new Switch(randomstring.generate());
            switches.push(newSwitch);
        };

        if(bombCallback) {
            switches[0].addSubscriber(bombCallback);
        }

        if(shuffleSwitches) {
            shuffle.knuthShuffle(switches);
        }

        return switches;
    };

};

module.exports = SwitchArrayBuilder;
