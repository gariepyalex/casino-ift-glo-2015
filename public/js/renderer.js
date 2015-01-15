var casino = casino || {};

casino.renderer = function() {

    var stage, loader;
    var switchSprites = [];
    var renderedReady = false;

    var initialize = function() {
        stage = new createjs.Stage("stageCanvas");

        var manifest = [
            {src: "../img/detonator/red_detonator_sprite.png", id: "red_detonator"},
            {src: "../img/detonator/yellow_detonator_sprite.png", id: "yellow_detonator"},
            {src: "../img/detonator/blue_detonator_sprite.png", id: "blue_detonator"},
            {src: "../img/detonator/green_detonator_sprite.png", id: "green_detonator"},
            {src: "../img/detonator/purple_detonator_sprite.png", id: "purple_detonator"}
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

        stage.addChild(redSwitch, yellowSwitch, blueSwitch, greenSwitch, purpleSwitch);

        switchSprites.push(redSwitch);
        switchSprites.push(yellowSwitch);
        switchSprites.push(blueSwitch);
        switchSprites.push(greenSwitch);
        switchSprites.push(purpleSwitch);

        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.addEventListener("tick", tick);

        renderedReady = true;
    };

    var tick = function(event) {
        stage.update(event);
    };

    this.renderSwitches = function(switchArray) {
        if(renderedReady) {
            switchSprites.forEach(function(sprite) {
                sprite.visible = false;
            });
            switchArray.forEach(function(s,  index) {
                switchSprites[index].visible = true;
                switchSprites[index]["SWITCH_ID"] = s.name;
                /*
                 if(s.activated) {
                 switchSprites[index].gotoAndStop(5);
                 }else {
                 switchSprites[index].gotoAndStop(0);
                 }*/
                switchSprites[index].addEventListener("click", handleSwitchClick);
            });
        }
    };

    this.playPressAnimation = function(switchId) {
        switchSprites.forEach(function(sprite) {
            if(sprite["SWITCH_ID"] == switchId) {
                sprite.play();
                sprite.on("animationend", function(){
                    sprite.gotoAndStop(5);
                });
            }
        });
    };

    var handleSwitchClick = function(event) {
        console.log(event);
    };

    initialize();

};
