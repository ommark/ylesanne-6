(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        var c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            var date = new Date();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();

            var session = "AM";

            if (h == 10) {
                h = 12;
            }

            if (h > 12) {
                h = h - 12;
                session = "PM";
            }

            h = (h < 10) ? "0" + h : h;
            m = (m < 10) ? "0" + m : m;
            s = (s < 10) ? "0" + s : s;

            c.innerHTML = h + ":" + m + ":" + s;
            
        };
        
    });
    
    // forms
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    document.getElementById("form").addEventListener("submit", validate_form); 
    document.getElementById("form").addEventListener("submit", checkNames);
    document.getElementById("form").addEventListener("submit", kokku); 

    function estimateDelivery(event) {
        event.preventDefault();

        var e = 0
        
        var linn = document.getElementById("linn");

            if (linn.value === "tln") {

                e = 0;

            }else if (linn.value === "trt") {

                e = 2.5;

            }else if (linn.value === "nrv") {

                e = 2.5;

            }else if (linn.value === "prn") {

                e = 3;

            }else {
                
                alert("Palun valige linn nimekirjast");
                    
                linn.focus();
    
            }   
            return e;
        }
    
        function checkNames(){
            var eesnimi = document.getElementById("fname").value;
            var perenimi = document.getElementById("lname").value;
            var hasNumber = /\d/;

            if (eesnimi != '' && perenimi !=''){
                return true;
            } 
            else {
                alert("Palun sisestage ees- ja perenimi");
                return false;
            }
            
        }


        function validate_form(){
            var tarne1 = document.getElementById("v1").checked;
            var tarne2 = document.getElementById("v2").checked;

            var hind=0

            if (tarne1 == true && tarne2 == true){
                hind=6
            } else if(tarne1 == true && tarne2 == false){
                hind=5;
            } else if (tarne2 == true && tarne1 == false){
                hind=1;
            } 
            else {
                alert("Palun valige tarneviis");
            } 
            return hind
            
        }

        function kokku(){
            var koguhind = validate_form() + estimateDelivery(event);
            document.getElementById("delivery").innerHTML="Tarne kokku: " + koguhind
        }



})();

// map

var mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

var map, infobox;

function GetMap() {
    
    "use strict"; 

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: new Microsoft.Maps.Location(58.854126, 25.4946461),
        zoom: 7,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });

    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });

    infobox.setMap(map);

    var centerPoint = new Microsoft.Maps.Location(
        58.38104, 
        26.71992

    );

    var teinepunkt = new Microsoft.Maps.Location(
        59.43891, 
        24.77163
    );

    var teinepin = new Microsoft.Maps.Pushpin(teinepunkt);

    map.entities.push(teinepin);
    
    var pin = new Microsoft.Maps.Pushpin(centerPoint);
    
    pin.metadata = {
        title: 'Tartu Ülikool',
        description: 'Hea koht'
    };

    Microsoft.Maps.Events.addHandler(pin, 'click', pushpinClicked);

    map.entities.push(pin);

}

function pushpinClicked(e) {
    if (e.target.metadata) {
        infobox.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true
        });




    }
}


// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

