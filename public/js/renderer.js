var casino = casino || {};

casino.renderer = function() {

    var stage, loader;
    var switchSprites = [];
    var characterSprites = [];
    var computer;
    var boomImage;

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
            {src: "../img/characters/d1-walk.png", id: "d1-walk"},
            {src: "../img/characters/d2-walk.png", id: "d2-walk"},
            {src: "../img/characters/d3-walk.png", id: "d3-walk"},
            {src: "../img/characters/d4-walk.png", id: "d4-walk"},
            {src: "../img/computerSprite.png", id: "computer"},
            {src: "../img/boom.png", id: "boom"}
        ];

        loader = new createjs.LoadQueue(false);
        loader.addEventListener("complete", handleComplete);
        loader.loadManifest(manifest, true, "../_assets/art/");
    };

    var handleComplete = function() {
        var spriteSheetComputer = new createjs.SpriteSheet({
            framerate: 8,
            "images": [loader.getResult("computer")],
            "frames": {"width": 384, "height": 332, "regX": 0, "regY": 0},
            "animations": {
                "wait": [0, 3, "wait"],
                "compute": [4, 7, "compute"]
            }
        });
        computer = new createjs.Sprite(spriteSheetComputer, "wait");
        computer.x = 200;
        computer.y = 50;

        boomImage = new createjs.Bitmap(loader.getResult("boom"));
        boomImage.scaleX = 0.6;
        boomImage.scaleY = 0.6;
        boomImage.x = 240;
        boomImage.y = 100;
        boomImage.visible = false;

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

        var spriteSheetChar1 = new createjs.SpriteSheet({
            framerate: 12,
            "images": [loader.getResult("d1-walk")],
            "frames": {"width": 173.8, "height": 250, "regX": 50, "regY": 0},
            "animations": {
                "walk": [0, 7, "walk"]
            }
        });

        var spriteSheetChar2 = new createjs.SpriteSheet({
            framerate: 12,
            "images": [loader.getResult("d2-walk")],
            "frames": {"width": 173.8, "height": 250, "regX": 50, "regY": 0},
            "animations": {
                "walk": [0, 7, "walk"]
            }
        });

        var spriteSheetChar3 = new createjs.SpriteSheet({
            framerate: 12,
            "images": [loader.getResult("d3-walk")],
            "frames": {"width": 199.7, "height": 250, "regX": 50, "regY": 0},
            "animations": {
                "walk": [0, 3, "walk"]
            }
        });

        var spriteSheetChar4 = new createjs.SpriteSheet({
            framerate: 12,
            "images": [loader.getResult("d4-walk")],
            "frames": {"width": 199.7, "height": 250, "regX": 50, "regY": 0},
            "animations": {
                "walk": [0, 3, "walk"]
            }
        });

        characterSprites[0] = new createjs.Sprite(spriteSheetChar1, "walk");
        characterSprites[1] = new createjs.Sprite(spriteSheetChar2, "walk");
        characterSprites[2] = new createjs.Sprite(spriteSheetChar3, "walk");
        characterSprites[3] = new createjs.Sprite(spriteSheetChar4, "walk");

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

        stage.addChild(computer, boomImage, characterSprites[0], characterSprites[1], characterSprites[2], characterSprites[3],
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
            var explosion = false;
            if(eventQueue[0] && eventQueue[0].NAME == "EXPLOSION") {
                explosion = true;
                eventQueue.shift();
            }
            currentCharacter = parseInt(event.PLAYER_ID) - 1;
            currentRender = new casino.switchPressAnimation(findSwitchSprite(event.SWITCH_ID),
                characterSprites[currentCharacter], computer, boomImage, explosion);
            currentRender.play();
        }
    };

    this.setEventRenderQueue = function(eventArray) {
        eventQueue = [];
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
