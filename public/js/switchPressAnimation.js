var casino = casino || {};

casino.switchPressAnimation = function(switchSprite, characterSprite, computerSprite, boomImage, explosion) {

    var done = false;
    var phase;

    var characterVelocity = 200; //pixel per sec.

    var SUSPENSE_DISPLAY_TIME_SEC = Math.random()* 3 + 0.5;
    var elapsedSuspenseDisplayTime = 0;

    var BOOM_DISPLAY_TIME_SEC = 0.9;
    var elapsedBoomDisplayTime = 0;

    var phases = {
        walkToSwitch: "WALK TO SWICH",
        pressSwitch: "PRESS SWITCH",
        suspense: "SUSPENSE",
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
        } else if(phase == phases.pressSwitch) {
            //Nothing to do. It updates automatically.
        } else if(phase == phases.suspense) {
            updateSuspense(tickEvent.delta / 1000);
        } else if(phase == phases.explosion) {
            updateExplosionDisplay(tickEvent.delta / 1000);
        } else if(phase == phases.walkAway) {
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

    var updateSuspense = function(deltaS){
        elapsedSuspenseDisplayTime += deltaS;
        if(elapsedSuspenseDisplayTime >= SUSPENSE_DISPLAY_TIME_SEC) {
            computerSprite.gotoAndPlay("wait");
            if(explosion) {
                phase = phases.explosion;
                boomImage.visible = true;
                characterSprite.gotoAndStop(0);
            } else {
                characterSprite.play();
                phase = phases.walkAway;
            }
        }
    };

    var updateExplosionDisplay = function(deltaS) {
        elapsedBoomDisplayTime += deltaS;
        if(elapsedBoomDisplayTime >= BOOM_DISPLAY_TIME_SEC) {
            phase = phases.done;
            boomImage.visible = false;
        }
    };

    var playSwitchAnimation = function() {
        switchSprite.gotoAndPlay(0);
        switchSprite.on("animationend", function() {
            phase = phases.suspense;
            computerSprite.gotoAndPlay("compute");
            switchSprite.gotoAndStop(5);
        });
    };

    this.isDone = function() {
        return done;
    }
};
