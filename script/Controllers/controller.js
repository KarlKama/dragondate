function getUrlParameter(sParam){
    var sPageUrl = window.location.search.substring(1);
    var sURLVariables = sPageUrl.split('&');
    for(var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if(sParameterName[0] = sParam)
            return sParameterName[1];   
    }
}

var gender = getUrlParameter("gender");
var app = angular.module('mainApp', []);
var objekt;

app.controller('dragons', function($scope, $http) {
    $http.get('http://www.dragonsofmugloar.com/dating/api/profile/random?gender=' + gender).success(function(response){
        $scope.dragon = response;
        objekt = response;
        for (var property in objekt) {
            if(property == "likesYou") {
                vastus = objekt[property];
                for (var property in objekt) {
                    if(property == "name") {
                        name = objekt[property];
                    }
                    else if (property == "id") {
                        id = objekt[property];
                    }
                }
            }
        }
        if(gender == "girl"){
            var header = "<h1 class=dragontitle> Search for your Dragon Queen </h1>";
            $('#header').append(header);
        } else {
            var header = "<h1 class=dragontitle> Search for your Dragon King </h1>";
            $('#header').append(header);
        }
        show_results(vastus, name, id);
    });
});

function dislike(){
    window.location.reload()
}
function show_results(likesme, name, id) {
    var nimedelist = [];
    var nimed = localStorage.getItem("salvestus");
    nimedelist.push(nimed);
    
    if (likesme == true) {
        document.getElementById('like').onclick = function() {
            fixedlist.push( name +"-" + id );
            localStorage.setItem("salvestus", fixedlist);
            var snd = new Audio("audio/Bleep-sound.mp3");
            snd.play();
            var notific = "<div><h3 class=frame id=notific> We have a match! </h3>";
            $('#header').append(notific);
            
            document.getElementById('like').onclick = function(){
                window.location.reload();
            }
            var delay=2500; 
            setTimeout(function() {
                window.location.reload()
            }, delay);   
        }
    }
    else {
        document.getElementById('like').onclick = function() {
            window.location.reload()
        }
    }
    
    nimedelist = nimedelist + '';
    var fixedlist = nimedelist.split(",");
    
    for (i = 1; i < fixedlist.length; i++) { 
        var newlist = fixedlist[i].split("-");
        var tile = "<a href=profile.html?id="+newlist[1]+">" + newlist[0] + "</a><br/>";
        $('.matches').append(tile);
    }
}
