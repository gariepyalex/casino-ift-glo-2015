$( document ).ready(function() {
    var socket = io.connect();

    $("#button1").click(function(event){
        $('#button1').prop('disabled', true);
    });

    $("#button2").click(function(event){
        $('#button2').prop('disabled', true);
    });

    $("#button3").click(function(event){
        $('#button3').prop('disabled', true);
    });

    $("#button4").click(function(event){
        $('#button4').prop('disabled', true);
    });

    $("#button5").click(function(event){
        $('#button5').prop('disabled', true);
    });

    $("#reset").click(function(event){
        $('#button1').prop('disabled', false);
        $('#button2').prop('disabled', false);
        $('#button3').prop('disabled', false);
        $('#button4').prop('disabled', false);
        $('#button5').prop('disabled', false);
    });
});