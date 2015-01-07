var BombSwitch = function(name) {

    var activated = false;
    var subscribers = [];


    this.getName = function() {
        return name;
    };

    this.isActivated = function() {
        return activated;
    };

    this.press = function() {
        activated = true;
        subscribers.forEach(function(callback) {
            callback();
        });
    };

    this.addSubscriber = function(callback) {
        subscribers.push(callback);
    };
};

module.exports = BombSwitch;

