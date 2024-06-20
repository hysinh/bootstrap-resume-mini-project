function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 3,
        center: {
            lat: 46.6199261,
            lng: -33.134766
        }
    });

    var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //each individual letter is going to appear on the markers
    
    //new array that will contain a set of objects - each object will contain a latitude and a longitude of the
    // different places that Rosie has visited
    var locations = [
        {lat: 40.785091, lng: -73.968285},
        {lat: 41.084045, lng: -73.874245},
        {lat: 40.754932, lng: -73.984016}
    ];
    var markers = locations.map(function(location, i){ // built-in map method in javascript
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length] // % operator so that if we have more than 26 locations, then it will loop around to the start of our string again and go from Z back to A, instead of throwing an error
        });
    });
    var markerClusterer = MarkerClusterer(map, markers,
    {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
};