
//'2440 Main St, Vancouver, BC V5T 3E2',
//'2660 Oak St, Vancouver, BC V6H 3Z6',
//'1205 Howe St Unit 301, Vancouver BC, V6Z0B2',
//'68 Smithe Street, Unit 806, Vancouver',
//'188 Keefer Pl, Vancouver, BC V6A 1X4'

// default map_layer
let map = L.map('map', {
    layers: MQ.mapLayer(),
    center: [49.26352248442074, -123.1007377802855],
    zoom: 12
});

function runDirections(start, end) {

    // recreating the new map Layer
        map = L.map('map', {
        layers: MQ.mapLayer(),
        center: [49.26352248442074, -123.1007377802855],
        zoom: 12
    });

    var dir = MQ.routing.directions();

    dir.route({
        locations: [
            start,
            end           
        ]
    });

    CustomRouteLayer = MQ.Routing.RouteLayer.extend({
        createStartMarker: (location) => {
            var custom_icon;
            var marker;

            custom_icon = L.icon({
                iconUrl: 'img/red.png',
                iconSize: [20,29],
                iconAnchor: [10,29],
                popupAnchor: [0,-29]
            });
            
            marker = L.marker(location.latLng, {icon: custom_icon}).addTo(map);

            return marker;
        },

        createEndMarker: (location) => {
            var custom_icon;
            var marker;

            custom_icon = L.icon({
                iconUrl: 'img/blue.png',
                iconSize: [20,29],
                iconAnchor: [10,29],
                popupAnchor: [0,-29]
            });
            
            marker = L.marker(location.latLng, {icon: custom_icon}).addTo(map);

            return marker;
        },

    });

    map.addLayer(new CustomRouteLayer({
        directions: dir,
        fitBounds: true
    }));

}

// function that runs when form submitted
function submitForm(event) {
    event.preventDefault();

    // delete current map layer
    map.remove();

    //console.log('Form submitted');

    //getting form data
    start = document.getElementById('start').value;
    end = document.getElementById('destination').value;

    // run directions function
    runDirections(start, end);

    // reset form
    document.getElementById('form').reset();

}

// asing the form to a form variable
const form = document.getElementById('form');

// call the submitForm funciont when submitting the form
form.addEventListener('submit', submitForm);