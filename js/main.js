var omaha_url = "https://api.openweathermap.org/data/2.5/weather?lat=42.25&lon=95.99&APPID=25de4193d974875b028cb9b0b62ea042";
var time;
var sunrise;
var sunset;
var day_length;
var day_remaining;
var position;
var rotation;



function position_sun() {
    $.getJSON(omaha_url, function (data) {
        time = data.dt;
        sunrise = data.sys.sunrise + 46800;
        sunset = data.sys.sunset + 46800;
        day_length = sunset - sunrise;
        day_remaining = sunset - time;
        position = 100 - Math.round(day_remaining / day_length * 100);
        rotation = position * 1.8;
        console.log(time);

        if (time >= sunrise && time < sunset) {
            $("#fulcrum").css("transform", "rotate(" + rotation + "deg)");

            if (time >= sunset - 3600) {
                $("#about").css("flex-direction", "row");
                $("#about").css("justfy-content", "flex-start");
                $("body").css("background-color", "ghostwhite");
                $("#greeting").text("Good Evening, ");
            } else if (time >= sunrise + day_length / 2) {
                $("#about").css("flex-direction", "row");
                $("#about").css("justfy-content", "flex-start");
                $("body").css("background-color", "ghostwhite");
                $("#greeting").text("Good Afternoon,");
            } else if (sunrise + 10800 >= time) {
                $("#about").css("flex-direction", "row-reverse");
                $("#about").css("justfy-content", "flex-end");
                $("body").css("background-color", "ghostwhite");
                $("#greeting").text("Good Morning, ");
            } else {
                $("#about").css("flex-direction", "row");
                $("#about").css("justfy-content", "flex-start");
                $("body").css("background-color", "ghostwhite");
                $("#greeting").text("Hello, ");

            }

        } else {
            if (sunrise + 7200 >= time) {
                $("body").css("background-color", "black");
                $("#about").css("color", "deepskyblue");
                $(".sun").css("display", "none");
                $("#greeting").text("Good Evening, ");
            }
            else {
                 $("#greeting").text("Hello, ");
            }
        }
    });
}



$(document).ready(function () {
    
    

    position_sun();
    
    
    
});

