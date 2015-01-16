var casino = casino || {};

casino.switchPressAnimation = function(switchSprite, characterSprite, explosion) {

    var done = false;
    var phase;

    characterVelocity = 200; //pixel per sec.

    this.play = function() {
        phase = 0;
        characterSprite.x = -100;
        characterSprite.visible = true;
        characterSprite.play();
    };

    this.update = function(tickEvent) {
        if(phase == 0) {
            updateMoveToSwitch(tickEvent.delta / 1000);
        }else if(phase == 1){
            //Nothing to do. It updates automatically.
        } else if(phase == 2) {
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
            phase++;
            characterSprite.gotoAndStop(0);
            playSwitchAnimation();
        }
    };

    var updateMoveOutOfStage = function(deltaS) {
        characterSprite.x += characterVelocity * deltaS;
        if(characterSprite.x >= 875) {
            phase++;
            characterSprite.gotoAndStop(0);
        }
    };

    var playSwitchAnimation = function() {
        switchSprite.gotoAndPlay(0);
        switchSprite.on("animationend", function() {
            switchSprite.gotoAndStop(5);
            if(explosion) {
                phase += 2;
                characterSprite.gotoAndStop(0);
            } else {
                characterSprite.play();
                phase++;
            }
        });
    };

    this.isDone = function() {
        return done;
    }
};
