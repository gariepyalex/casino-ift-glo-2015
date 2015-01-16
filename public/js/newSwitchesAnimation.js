var casino = casino || {};

casino.newSwitchesAnimation = function(switchSprites) {
    var done = false;
    var minY;
    var velocity = 200;

    this.play = function() {
        minY = switchSprites[0].y;
        switchSprites.forEach(function(sprite) {
            sprite.y = 600;
        });
    };

    this.update = function(event) {
        switchSprites.forEach(function(sprite) {
            sprite.y -= event.delta / 1000 * velocity;
            if(sprite.y <= minY) {
                sprite.y = minY;
                done = true;
            }
        });

    };

    this.isDone = function() {
        return done;
    }
};
