var casino = casino || {};

casino.switchPressAnimation = function(switchSprite, characterSprite, boomImage, explosion) {

    var done = false;
    var phase;

    var characterVelocity = 200; //pixel per sec.

    var BOOM_DISPLAY_TIME_SEC = 0.9;
    var accumlatedBoomDisplayTime = 0;

    var phases = {
        walkToSwitch: "WALK TO SWICH",
        pressSwitch: "PRESS SWITCH",
        explosion: "EXPLOSION",
        walkAway: "WALK AWAY",
        done: "DONE"
    };

    this.play = function() {
        phase = phases.walkToSwitch;
        characterSprite.x = -100;
        characterSprite.visible = true;
        characterSprite.play();
    };

    this.update = function(tickEvent) {
        if(phase == phases.walkToSwitch) {
            updateMoveToSwitch(tickEvent.delta / 1000);
        }else if(phase == phases.pressSwitch){
            //Nothing to do. It updates automatically.
        } else if(phase == phases.explosion) {
            updateExplosionDisplay(tickEvent.delta / 1000);
        }else if(phase == phases.walkAway) {
            updateMoveOutOfStage(tickEvent.delta / 1000);
        } else {
            characterSprite.visible = false;
            done = true;
        }
    };

    var updateMoveToSwitch = function(deltaS) {
        characterSprite.x += characterVelocity * deltaS;
        if(characterSprite.x >= switchSprite.x) {
            characterSprite.x = switchSprite.x;
            phase = phases.pressSwitch;
            characterSprite.gotoAndStop(0);
            playSwitchAnimation();
        }
    };

    var updateMoveOutOfStage = function(deltaS) {
        characterSprite.x += characterVelocity * deltaS;
        if(characterSprite.x >= 875) {
            phase = phases.done;
            characterSprite.gotoAndStop(0);
        }
    };

    var updateExplosionDisplay = function(deltaS) {
        boomImage.visible = true;
        accumlatedBoomDisplayTime += deltaS
        if(accumlatedBoomDisplayTime >= BOOM_DISPLAY_TIME_SEC) {
            phase = phases.done;
            boomImage.visible = false;
        }
    };

    var playSwitchAnimation = function() {
        switchSprite.gotoAndPlay(0);
        switchSprite.on("animationend", function() {
            switchSprite.gotoAndStop(5);
            if(explosion) {
                phase = phases.explosion;
                characterSprite.gotoAndStop(0);
            } else {
                characterSprite.play();
                phase = phases.walkAway;
            }
        });
    };

    this.isDone = function() {
        return done;
    }
};
