var assert = require("assert");
var sinon = require("sinon");
var Game = require("../game.js");
var Switch = require("../bombSwitch.js");

var SwitchArrayBuilderStub = function() {
    this.withNumberOfSwitches = sinon.stub().returns(this);
    this.withBombCallback = sinon.stub().returns(this);
    this.withShuffle = sinon.stub().returns(this);
    this.build = sinon.stub().returns(buildFakeSwitches(5));
};

var buildFakeSwitches = function(n) {
    var switches = []
    for(var i = 1; i <= n; i++) {
        switches.push(new Switch(i.toString()));
    }
    return switches;
};

describe("Game", function() {
    var game;
    var switchArrayBuilderStub;
    var bombExplosionCallback;
    beforeEach(function() {
        switchArrayBuilderStub = new SwitchArrayBuilderStub();
        bombExplosionCallback = sinon.spy();
        game = new Game(bombExplosionCallback, switchArrayBuilderStub);
    });

    it("at the beginning, the game uses the switch builder to create initial state", function() {
        assert(switchArrayBuilderStub.build.called);
    });

    it("when there is only one switch left, new switches are made", function() {
        game.pressSwitch("1");
        game.pressSwitch("2");
        game.pressSwitch("3");
        game.pressSwitch("4");
        assert(switchArrayBuilderStub.build.calledTwice);
    });

    it("can get the state in JSON", function() {
        var state = game.getStateJSON();
        assert.equal(state.switches.length, 5);
        assert.equal(state.switches[0].name, "1");
        assert.equal(state.switches[0].activated, false);
        assert.equal(state.switches[1].name, "2");
        assert.equal(state.switches[1].activated, false);
        assert.equal(state.switches[2].name, "3");
        assert.equal(state.switches[2].activated, false);
        assert.equal(state.switches[3].name, "4");
        assert.equal(state.switches[3].activated, false);
        assert.equal(state.switches[4].name, "5");
        assert.equal(state.switches[4].activated, false);
    });
});

