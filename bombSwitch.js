var BombSwitch = function(name, isBomb) {

    var activated = false;

    this.getName = function() {
        return name;
    };

    this.isActivated = function() {
        return activated;
    };

    this.press = function() {
        activated = true;
    };

    this.isBomb = function() {
        return isBomb;
    };

    this.toJSON = function() {
        return {
            "name": name,
            "activated": activated
        };
    }
};

module.exports = BombSwitch;

