var SwitchArrayBuilder = require("../switchArrayBuilder.js");
var assert = require("assert");
var sinon = require("sinon");

describe("SwitchArrayBuilder", function() {
    var builder;
    beforeEach(function() {
        builder = new SwitchArrayBuilder();
    });
    
    it("by default, the builder returns 5 switches", function() {
        assert.equal(builder.build().length, 5);
    });

    it("you can specify the number of switches", function() {
        var switchArray = builder.withNumberOfSwitches(3).build();
        assert.equal(switchArray.length, 3);
    });

    it("the callback is called only when pressing a single switch", function() {
        var callback = sinon.spy();
        var switchArray = builder.withNumberOfSwitches(4).withBombCallback(callback).build();

        switchArray[0].press();
        switchArray[1].press();
        switchArray[2].press();
        switchArray[3].press();

        assert(callback.calledOnce);
    });

});


