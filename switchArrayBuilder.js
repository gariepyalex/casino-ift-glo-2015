var Switch = require("./bombSwitch.js");
var randomstring = require("randomstring");
var shuffle = require("knuth-shuffle");

var SwitchArrayBuilder = function() {
    var numberOfSwitches = 5;
    var bombCallback;
    var shuffleSwitches = true;

    this.withNumberOfSwitches = function(n) {
        if(n > 5 || n < 1) {
            throw new Error("Invalid number of switches");
        }
        numberOfSwitches = n;
        return this;
    };

    this.withShuffle = function(shuffle) {
        shuffleSwitches = shuffle;
        return this;
    };

    this.build = function() {
        var switches = [];

        var newSwitch = new Switch(randomstring.generate(), true);
        switches.push(newSwitch);
        for(var i = 1; i < numberOfSwitches; i++) {
            var newSwitch = new Switch(randomstring.generate(), false);
            switches.push(newSwitch);
        };

        if(shuffleSwitches) {
            shuffle.knuthShuffle(switches);
        }

        return switches;
    };

};

module.exports = SwitchArrayBuilder;
