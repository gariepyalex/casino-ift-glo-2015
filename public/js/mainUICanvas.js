$(document).ready(function() {
    $("#stageCanvas")[0].webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    var stage = new createjs.Stage("stageCanvas");
    var shape = new createjs.Shape();
    shape.graphics.beginFill("red").drawCircle(100, 100, 5);
    stage.addChild(shape);
    stage.update();
});
