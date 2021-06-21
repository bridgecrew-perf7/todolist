$(function(){
    $('#yellowButton').click(function() {

        var link = $(this);
        var colorId = $(this).data('id');
        var yellow = {
            "color" : "yellow"
            }
        console.log(color);
        $.ajax({
            url: "/settings/" + 1,
            method: 'PUT',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(color),
            success: function(response) {
                console.log(response);
            }
        });
        return false;
    });

    $('#greenButton').click(function() {

        var link = $(this);
        var colorId = $(this).data('id');
        var green = {
            "color" : "green"
            }
        console.log(color);
        $.ajax({
            url: "/settings/" + 1,
            method: 'PUT',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(color),
            success: function(response) {
                console.log(response);
            }
        });
        return false;
    });

    $('#whiteButton').click(function() {

        var link = $(this);
        var colorId = $(this).data('id');
        var white = {
            "color" : "white"
            }
        console.log(color);
        $.ajax({
            url: "/settings/" + 1,
            method: 'PUT',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(white),
            success: function(response) {
                console.log(response);
            }
        });
        return false;
    });

});