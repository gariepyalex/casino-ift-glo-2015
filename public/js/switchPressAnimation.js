var casino = casino || {};

casino.switchPressAnimation = function(switchSprite) {

    var done = false;

    this.play = function() {
        console.log("play");
        console.log(switchSprite);
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
