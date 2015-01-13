var stage, loader;

$(document).ready(function() {
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
});

function handleComplete() {
    var spriteSheetRed = new createjs.SpriteSheet({
        framerate: 5,
        "images": [loader.getResult("red_detonator")],
        "frames": {"width": 40, "height": 70, "regX": 0, "regY": 0},
        "animations": {
            "detonation": [0, 5, "detonation"]
        }
    });
    var spriteSheetYellow = new createjs.SpriteSheet({
        framerate: 5,
        "images": [loader.getResult("yellow_detonator")],
        "frames": {"width": 40, "height": 70, "regX": 0, "regY": 0},
        "animations": {
            "detonation": [0, 5, "detonation"]
        }
    });
    var spriteSheetBlue = new createjs.SpriteSheet({
        framerate: 5,
        "images": [loader.getResult("blue_detonator")],
        "frames": {"width": 40, "height": 70, "regX": 0, "regY": 0},
        "animations": {
            "detonation": [0, 5, "detonation"]
        }
    });
    var spriteSheetGreen = new createjs.SpriteSheet({
        framerate: 5,
        "images": [loader.getResult("green_detonator")],
        "frames": {"width": 40, "height": 70, "regX": 0, "regY": 0},
        "animations": {
            "detonation": [0, 5, "detonation"]
        }
    });
    var spriteSheetPurple = new createjs.SpriteSheet({
        framerate: 5,
        "images": [loader.getResult("purple_detonator")],
        "frames": {"width": 40, "height": 70, "regX": 0, "regY": 0},
        "animations": {
            "detonation": [0, 5, "detonation"]
        }
    });

    var redDetonator = new createjs.Sprite(spriteSheetRed, "detonation");
    var yellowDetonator = new createjs.Sprite(spriteSheetYellow, "detonation");
    var blueDetonator = new createjs.Sprite(spriteSheetBlue, "detonation");
    var greenDetonator = new createjs.Sprite(spriteSheetGreen, "detonation");
    var purpleDetonator = new createjs.Sprite(spriteSheetPurple, "detonation");

    redDetonator.x = 100; redDetonator.y = 100;
    yellowDetonator.x = 200; yellowDetonator.y = 100;
    blueDetonator.x = 300; blueDetonator.y = 100;
    greenDetonator.x = 400; greenDetonator.y = 100;
    purpleDetonator.x = 500; purpleDetonator.y = 100;

    stage.addChild(redDetonator, yellowDetonator, blueDetonator, greenDetonator, purpleDetonator);

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", tick);
}

function tick(event) {
    stage.update(event);
}
