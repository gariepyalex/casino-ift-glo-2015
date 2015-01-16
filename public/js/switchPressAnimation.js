var casino = casino || {};

casino.switchPressAnimation = function(switchSprite, characterSprite) {

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

        }else {
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

    var playSwitchAnimation = function() {
        switchSprite.gotoAndPlay(0);
        switchSprite.on("animationend", function() {
            switchSprite.gotoAndStop(5);
            characterSprite.visible = false;
            phase++;
        });
    };

    this.isDone = function() {
        return done;
    }
};
