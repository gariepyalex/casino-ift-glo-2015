var assert = require("assert");
var sinon = require("sinon");
var Game = require("../game.js");
var Switch = require("../bombSwitch.js");

var SwitchArrayBuilderStub = function() {
    this.withNumberOfSwitches = sinon.stub().returns(this);
    this.withBombCallback = sinon.stub().returns(this);
    this.withShuffle = sinon.stub().returns(this);
    this.build = sinon.stub().returns([new Switch("1"), new Switch("2"), new Switch("3")]);
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

    it("can get the state in JSON", function() {
        var state = game.getStateJSON();
        assert.equal(state.switches.length, 3);
        assert.equal(state.switches[0].name, "1");
        assert.equal(state.switches[0].activated, false);
        assert.equal(state.switches[1].name, "2");
        assert.equal(state.switches[1].activated, false);
        assert.equal(state.switches[2].name, "3");
        assert.equal(state.switches[2].activated, false);
    });
});

