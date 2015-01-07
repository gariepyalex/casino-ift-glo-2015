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
        switchArray = builder.withNumberOfSwitches(3).build();
        assert.equal(switchArray.length, 3);
    });

});
