var casino = casino || {};

casino.renderer = function() {

    var stage, loader;
    var switchSprites = [];
    var characterSprites = [];
    var switchReady = false;

    var eventQueue = [];
    var currentRender;
    var currentSwitches;
    var currentCharacter = 0;

    var pressCallbacks = [];

    var switchMinX = 130, switchMaxX = 650;

    var initialize = function() {
        stage = new createjs.Stage("stageCanvas");

        var manifest = [
            {src: "../img/detonator/red_detonator_sprite.png", id: "red_detonator"},
            {src: "../img/detonator/yellow_detonator_sprite.png", id: "yellow_detonator"},
            {src: "../img/detonator/blue_detonator_sprite.png", id: "blue_detonator"},
            {src: "../img/detonator/green_detonator_sprite.png", id: "green_detonator"},
            {src: "../img/detonator/purple_detonator_sprite.png", id: "purple_detonator"},
            {src: "../img/characters/patrick.png", id: "patrick"},
            {src: "../img/characters/d1.png", id: "d1"},
            {src: "../img/characters/d2.png", id: "d2"},
            {src: "../img/characters/d3.png", id: "d3"}
        ];

        loader = new createjs.LoadQueue(false);
        loader.addEventListener("complete", handleComplete);
        loader.loadManifest(manifest, true, "../_assets/art/");
    };

    var handleComplete = function() {
        var spriteSheetRed = new createjs.SpriteSheet({
            framerate: 12,
            "images": [loader.getResult("red_detonator")],
            "frames": {"width": 100, "height": 150, "regX": 0, "regY": 0},
            "animations": {
                "detonation": [0, 5, "detonation"]
            }
        });
        var spriteSheetYellow = new createjs.SpriteSheet({
            framerate: 12,
            "images": [loader.getResult("yellow_detonator")],
            "frames": {"width": 100, "height": 150, "regX": 0, "regY": 0},
            "animations": {
                "detonation": [0, 5, "detonation"]
            }
        });
        var spriteSheetBlue = new createjs.SpriteSheet({
            framerate: 12,
            "images": [loader.getResult("blue_detonator")],
            "frames": {"width": 100, "height": 150, "regX": 0, "regY": 0},
            "animations": {
                "detonation": [0, 5, "detonation"]
            }
        });
        var spriteSheetGreen = new createjs.SpriteSheet({
            framerate: 12,
            "images": [loader.getResult("green_detonator")],
            "frames": {"width": 100, "height": 150, "regX": 0, "regY": 0},
            "animations": {
                "detonation": [0, 5, "detonation"]
            }
        });
        var spriteSheetPurple = new createjs.SpriteSheet({
            framerate: 12,
            "images": [loader.getResult("purple_detonator")],
            "frames": {"width": 100, "height": 150, "regX": 0, "regY": 0},
            "animations": {
                "detonation": [0, 5, "detonation"]
            }
        });
        characterSprites[0] = new createjs.Bitmap(loader.getResult("patrick"));
        characterSprites[1] = new createjs.Bitmap(loader.getResult("d1"));
        characterSprites[2] = new createjs.Bitmap(loader.getResult("d2"));
        characterSprites[3] = new createjs.Bitmap(loader.getResult("d3"));

        var redSwitch = new createjs.Sprite(spriteSheetRed);
        var yellowSwitch = new createjs.Sprite(spriteSheetYellow);
        var blueSwitch = new createjs.Sprite(spriteSheetBlue);
        var greenSwitch = new createjs.Sprite(spriteSheetGreen);
        var purpleSwitch = new createjs.Sprite(spriteSheetPurple);

        redSwitch.x = 130; redSwitch.y = 450;
        yellowSwitch.x = 260; yellowSwitch.y = 450;
        blueSwitch.x = 390; blueSwitch.y = 450;
        greenSwitch.x = 520; greenSwitch.y = 450;
        purpleSwitch.x = 650; purpleSwitch.y = 450;

        characterSprites[0].x = -150; characterSprites[0].y = 350;
        characterSprites[1].x = -150; characterSprites[1].y = 350;
        characterSprites[2].x = -150; characterSprites[2].y = 350;
        characterSprites[3].x = -150; characterSprites[3].y = 350;

        characterSprites[0].visible = false;
        characterSprites[1].visible = false;
        characterSprites[2].visible = false;
        characterSprites[3].visible = false;

        stage.addChild(characterSprites[0], characterSprites[1], characterSprites[2], characterSprites[3],
            redSwitch, yellowSwitch, blueSwitch, greenSwitch, purpleSwitch);

        switchSprites.push(redSwitch);
        switchSprites.push(yellowSwitch);
        switchSprites.push(blueSwitch);
        switchSprites.push(greenSwitch);
        switchSprites.push(purpleSwitch);

        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.addEventListener("tick", tick);
    };

    var tick = function(event) {
        if(switchReady) {
            if(!currentRender){
                if(eventQueue.length != 0) {
                    addEventToRender();
                }
            } else {
                updateAnimation(event);
            }
        } else {
            self.renderSwitches(currentSwitches);
        }
        stage.update(event);
    };

    var updateAnimation = function (event) {
        if(currentRender.isDone()){
            currentRender = null;
        }else {
            currentRender.update(event);
        }
    };

    var addEventToRender = function() {
        var event = eventQueue.shift();
        if(event.NAME === "NEW_SWITCHES") {
            self.renderSwitches(event.SWITCHES);
            currentRender = new casino.newSwitchesAnimation(switchSprites);
            currentRender.play();
        } else if(event.NAME === "PRESS"){
            currentCharacter = parseInt(event.PLAYER_ID) - 1;
            currentRender = new casino.switchPressAnimation(findSwitchSprite(event.SWITCH_ID), characterSprites[currentCharacter]);
            currentRender.play();
        }
    };

    this.setEventRenderQueue = function(eventArray) {
        eventArray.forEach(function(e) {
            eventQueue.push(e);
        });
    };

    this.setSwitchState = function(switches) {
        if(!switchReady) {
            currentSwitches = switches;
        }
    };

    this.renderSwitches = function(switchArray) {
        switchSprites.forEach(function(sprite, index) {
            sprite.visible = false;

        });
        var step = (switchMaxX - switchMinX) / (switchArray.length - 1);
        switchArray.forEach(function(s,  index) {
            switchSprites[index].visible = true;
            switchSprites[index].x = switchMinX + step * index;
            switchSprites[index]["SWITCH_ID"] = s.name;
            switchSprites[index].addEventListener("click", handleSwitchClick);
            if(s.activated) {
                switchSprites[index].gotoAndStop(5);
            }else {
                switchSprites[index].gotoAndStop(0);
            }
        });
        switchReady = true;
    };

    var findSwitchSprite = function(switchId) {
        var sprite;
        switchSprites.forEach(function(s) {
            if(s["SWITCH_ID"] == switchId) {
                sprite = s;
            }
        });
        return sprite;
    };

    var handleSwitchClick = function(event) {
        pressCallbacks.forEach(function(c) {
            c(event.currentTarget.SWITCH_ID);
        });
    };

    this.addSwitchPressListener = function(callback) {
        pressCallbacks.push(callback);
    };

    initialize();
    var self = this;
};
