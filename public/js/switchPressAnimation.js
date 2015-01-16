var casino = casino || {};

casino.switchPressAnimation = function(switchSprite) {

    var done = false;

    this.play = function() {
        switchSprite.gotoAndPlay(0);
        switchSprite.on("animationend", function() {
            done = true;
            switchSprite.gotoAndStop(5);
        });
    };

    this.update = function() {

    };

    this.isDone = function() {
        return done;
    }
};
