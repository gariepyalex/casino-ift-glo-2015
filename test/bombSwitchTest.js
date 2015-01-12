var BombSwitch = require("../bombSwitch.js");
var assert = require("assert");
var sinon = require("sinon");

describe("BombSwitch", function() {
    var bombSwitch;
    var SWITCH_NAME = "A_SWITCH_NAME";

    beforeEach(function() {
        bombSwitch = new BombSwitch(SWITCH_NAME);
    });

    it("the switch can return its name", function() {
        assert.equal(bombSwitch.getName(), SWITCH_NAME);
    });

    it("the switch is initially not in activated state", function() {
        assert.equal(bombSwitch.isActivated(), false);
    });

    it("after being pressed, the switch is in activated state", function() {
        bombSwitch.press();
        assert.equal(bombSwitch.isActivated(), true);
    });

    it("can be converted to JSON", function() {
        var json = bombSwitch.toJSON();

        assert.equal(json["name"], SWITCH_NAME);
        assert.equal(json["activated"], false);
    });
});


