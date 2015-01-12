var assert = require("assert");
var sinon = require("sinon");
var Game = require("../game.js");
var Switch = require("../bombSwitch.js");
var PlayerQueue = require("../playerQueue.js");

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

var buildDummyPlayerQueue = function() {
    return new PlayerQueue([
            {ID: "1", NAME: "TOTO"},
            {ID: "2", NAME: "FOO"},
            {ID: "3", NAME: "BAR"},
            {ID: "4", NAME: "REDDIT"},
        ]);
};

describe("Game", function() {
    var game;
    var switchArrayBuilderStub;
    beforeEach(function() {
        switchArrayBuilderStub = new SwitchArrayBuilderStub();
        game = new Game(switchArrayBuilderStub);
        game.setPlayerQueue(buildDummyPlayerQueue());
        game.newGame();
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
        assert.equal(state.SWITCHES.length, 5);
        assert.equal(state.SWITCHES[0].name, "1");
        assert.equal(state.SWITCHES[0].activated, false);
        assert.equal(state.SWITCHES[1].name, "2");
        assert.equal(state.SWITCHES[1].activated, false);
        assert.equal(state.SWITCHES[2].name, "3");
        assert.equal(state.SWITCHES[2].activated, false);
        assert.equal(state.SWITCHES[3].name, "4");
        assert.equal(state.SWITCHES[3].activated, false);
        assert.equal(state.SWITCHES[4].name, "5");
        assert.equal(state.SWITCHES[4].activated, false);
    });
});

