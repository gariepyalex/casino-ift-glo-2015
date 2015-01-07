var BombSwitch = require("../bombSwitch.js");
var assert = require("assert");
var sinon = require("sinon");


describe("BombSwitch", function() {
    var bombSwitch;
    beforeEach(function() {
        bombSwitch = new BombSwitch("SWITCH_NAME");
    });

    it("the switch can return its name", function() {
        assert.equal(bombSwitch.getName(), "SWITCH_NAME");
    });

    it("the switch is initially not in activated state", function() {
        assert.equal(bombSwitch.isActivated(), false);
    });

    it("after being pressed, the switch is in activated state", function() {
        bombSwitch.press();
        assert.equal(bombSwitch.isActivated(), true);
    });

    it("when pressed, the switch signals a subscribed callback function", function() {
        var callbackFunction = sinon.spy();
        bombSwitch.addSubscriber(callbackFunction);
        
        bombSwitch.press();
        
        assert(callbackFunction.called);
    });

    it("when pressed, the switch signals all the subscribed callback functions", function() {
        var firstCallbackFunction = sinon.spy();
        var secondCallbackFunction = sinon.spy();
        bombSwitch.addSubscriber(firstCallbackFunction);
        bombSwitch.addSubscriber(secondCallbackFunction);
        
        bombSwitch.press();
        
        assert(firstCallbackFunction.called);
        assert(secondCallbackFunction.called);
    });
});


