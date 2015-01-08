var SwitchArrayBuilder = require("./switchArrayBuilder.js");

var Game = function(callback, builder) {

    this.bombExplosion = function() {
        callback();
    };

    this.reset = function() {
        switchArray = switchArrayBuilder.withBombCallback(this.bombExplosion).build();
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

        if(!found) {
            throw new Error("Invalid switch name");
        }
    };

    var switchArrayBuilder = builder || new SwitchArrayBuilder();
    var switchArray = switchArrayBuilder.withBombCallback(this.bombExplosion).build();

};

module.exports = Game;
