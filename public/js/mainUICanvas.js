var stage, loader;

$(document).ready(function() {
    stage = new createjs.Stage("stageCanvas");

    var manifest = [
        {src: "../img/detonator/red_detonator_sprite.png", id: "detonator"}
    ];

    loader = new createjs.LoadQueue(false);
    loader.addEventListener("complete", handleComplete);
    loader.loadManifest(manifest, true, "../_assets/art/");
});

function handleComplete() {
    var spriteSheet = new createjs.SpriteSheet({
        framerate: 12,
        "images": [loader.getResult("detonator")],
        "frames": {"width": 40, "height": 70, "regX": 0, "regY": 0},
        "animations": {
            "detonation": [0, 5, "detonation"]
        }
    });

    var animation1 = new createjs.Sprite(spriteSheet, "detonation");
    var animation2 = new createjs.Sprite(spriteSheet, "detonation");
    var animation3 = new createjs.Sprite(spriteSheet, "detonation");
    var animation4 = new createjs.Sprite(spriteSheet, "detonation");
    var animation5 = new createjs.Sprite(spriteSheet, "detonation");
    animation1.x = 100; animation1.y = 100;
    animation2.x = 200; animation2.y = 100;
    animation3.x = 300; animation3.y = 100;
    animation4.x = 400; animation4.y = 100;
    animation5.x = 500; animation5.y = 100;

    stage.addChild(animation1, animation2, animation3, animation4, animation5);

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", tick);
}

function tick(event) {
    stage.update(event);
}
