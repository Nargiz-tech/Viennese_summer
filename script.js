// Define the maximum bounds for the map
var southWest = L.latLng(47.98, 15.83),
northEast = L.latLng(48.54, 16.86),
maxBounds = L.latLngBounds(southWest, northEast);

// Initialize the map
var map = L.map('map',{
    // fullscreenControl: true,
	// fullscreenControlOptions: {
	// 	position: 'topleft'
	// },
    center: [48.2082, 16.3738],
    zoom: 12,
    bounds: maxBounds,
    maxZoom: 22
});

// Add the base map layer
var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 24
}).addTo(map);

var search = L.Control.geocoder().addTo(map);

var initialCenter = [48.2082, 16.3738];
var initialZoom = 12;

// Create a custom home button control
var HomeControl = L.Control.extend({
    options: {
        position: 'topleft'
    },
    onAdd: function(map) {
        var container = L.DomUtil.create('div', 'home-button');
        var img = L.DomUtil.create('img', '', container);
        img.src = './icon/home-icon.svg';
        img.alt = 'Home';
        container.onclick = function(){
            map.setView(initialCenter, initialZoom);
        };
        return container;
    }
});


// Add the home button control to the map
map.addControl(new HomeControl());


// Define color shades for each cluster group
var outdoorColors = ['#FBC976', '#FBC976', '#FBC976'];
var fountainsColors = ['#97d6ecff', '#97d6ecff', '#97d6ecff'];
var swimmingColors = ['#0083f1ff', '#0083f1ff', '#0083f1ff'];

// Custom icon create function
function createClusterIcon(cluster, colors) {
    var childCount = cluster.getChildCount();
    var c = ' marker-cluster-';
    if (childCount < 10) {
        c += 'small';
        color = colors[0];
    } else if (childCount < 100) {
        c += 'medium';
        color = colors[1];
    } else {
        c += 'large';
        color = colors[2];
    }
    return new L.DivIcon({
        html: '<div style="background-color: ' + color + ';"><span>' + childCount + '</span></div>',
        className: 'marker-cluster' + c,
        iconSize: new L.Point(40, 40),
        color: color
    });
}

// Create separate marker cluster groups with custom icons
var outdoorCluster = L.markerClusterGroup.layerSupport({
    iconCreateFunction: function (cluster) {
        return createClusterIcon(cluster, outdoorColors);
    },
    polygonOptions: {
        color: '#808080',
        weight: 2,
        opacity: 0.5,
        fillColor: '#808080'
    }
});

var fountainsCluster = L.markerClusterGroup.layerSupport({
    iconCreateFunction: function (cluster) {
        return createClusterIcon(cluster, fountainsColors);
    },
    polygonOptions: {
        color: '#808080',
        weight: 2,
        opacity: 0.5,
        fillColor: '#808080'
    }
});

var swimmingCluster = L.markerClusterGroup({
    iconCreateFunction: function (cluster) {
        return createClusterIcon(cluster, swimmingColors);
    },
    polygonOptions: {
        color: '#808080',
        weight: 2,
        opacity: 0.5,
        fillColor: '#808080'
    }
});


////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
// Function to bind popups for outdoor_public layer
function onEachOutdoorFeature(feature, layer) {
    if (feature.properties) {
        var popupContent = "<p><strong>Address: </strong>" + feature.properties.Address + "</p>" +
            "<p><strong>District: </strong>" + feature.properties.District + "</p>" +
            "<p><a href='" + feature.properties.Weblink + "' target='_blank'>More info</a></p>";
        layer.bindPopup(popupContent);
    }
}

// Function to bind popups for fountains layer
function onEachFountainFeature(feature, layer) {
    if (feature.properties) {
        var popupContent = "<p><strong>Description: </strong>" + feature.properties.name_en + "</p>";
        layer.bindPopup(popupContent);
    }
}

// Function to bind popups for swimming layer
function onEachSwimmingFeature(feature, layer) {
    if (feature.properties) {
        var popupContent = "<p><strong>Swimming Pool: </strong>" + feature.properties.NAME + "</p>" +
            "<p><strong>Address: </strong>" + feature.properties.ADRESSE + "</p>" +
            "<p><strong>Located in District " + feature.properties.BEZIRK + "</strong></p>" +
            "<p><a href='" + feature.properties.WEBLINK1 + "' target='_blank'>More info</a></p>";
        layer.bindPopup(popupContent);
    }
}

function onEachRundumadumFeature(feature, layer) {
    if (feature.properties) {
        var popupContent = "<p><strong>Trail: </strong>Rundumadum</p>" +
            "<p><strong>Stages: </strong>" + feature.properties.BEZ_TEXT + "</p>" +
            "<p><a href='" + feature.properties.URL_INFO + "' target='_blank'>More info</a></p>";
        layer.bindPopup(popupContent);
    }
}

function onEachHikingFeature(feature, layer) {
    if (feature.properties) {
        var popupContent = "<p><strong>Trail: </strong>" + feature.properties.BEZ_TEXT + "</p>" +
            "<p><a href='" + feature.properties.URL_INFO + "' target='_blank'>More info</a></p>";
        layer.bindPopup(popupContent);
    }
}

function onEachHistGardenFeature(feature, layer) {
    if (feature.properties) {
        var popupContent = "<p><strong>" + feature.properties.BEZEICHNUN + "</strong></p>" +
            "<p><strong>Current state of the historial garden: </strong>" + feature.properties.KATEGORIE + "</p>" +
            "<p><strong>Address: </strong>" + feature.properties.ADRESSE_1 + "</p>";
        layer.bindPopup(popupContent);
    }
}


// Function to bind popups for sport facilities layers 
function onEachTennisFeature(feature, layer) {
    if (feature.properties) {
        var popupContent = "<p><strong>Type: </strong>Table Tennis</p>" +
            "<p><strong>Category </strong>" + feature.properties.KATEGORIE_ + "</p>" +
            "<p><strong>District </strong>" + feature.properties.District + "</p>" +
            "<p><a href='" + feature.properties.WEBLINK1 + "' target='_blank'>More info</a></p>";
        layer.bindPopup(popupContent);
    }
}

function onEachSkateFeature(feature, layer) {
    if (feature.properties) {
        var popupContent = "<p><strong>Type: </strong>Skate Park</p>" +
            "<p><strong>Category </strong>" + feature.properties.KATEGORIE_ + "</p>" +
            "<p><strong>District </strong>" + feature.properties.District + "</p>" +
            "<p><a href='" + feature.properties.WEBLINK1 + "' target='_blank'>More info</a></p>";
        layer.bindPopup(popupContent);
    }
}

function onEachMultiHardFeature(feature, layer) {
    if (feature.properties) {
        var popupContent = "<p><strong>Type: </strong>Multisport Hard Court</p>" +
            "<p><strong>Category </strong>" + feature.properties.KATEGORIE_ + "</p>" +
            "<p><strong>District </strong>" + feature.properties.District + "</p>" +
            "<p><a href='" + feature.properties.WEBLINK1 + "' target='_blank'>More info</a></p>";
        layer.bindPopup(popupContent);
    }
}

function onEachMultiGrassFeature(feature, layer) {
    if (feature.properties) {
        var popupContent = "<p><strong>Type: </strong>Multisport Grass Field</p>" +
            "<p><strong>Category </strong>" + feature.properties.KATEGORIE_ + "</p>" +
            "<p><strong>District </strong>" + feature.properties.District + "</p>" +
            "<p><a href='" + feature.properties.WEBLINK1 + "' target='_blank'>More info</a></p>";
        layer.bindPopup(popupContent);
    }
}

function onEachMiniGolfFeature(feature, layer) {
    if (feature.properties) {
        var popupContent = "<p><strong>Type: </strong>Mini Golf</p>" +
            "<p><strong>Category </strong>" + feature.properties.KATEGORIE_ + "</p>" +
            "<p><strong>District </strong>" + feature.properties.District + "</p>" +
            "<p><a href='" + feature.properties.WEBLINK1 + "' target='_blank'>More info</a></p>";
        layer.bindPopup(popupContent);
    }
}

function onEachGolfFeature(feature, layer) {
    if (feature.properties) {
        var popupContent = "<p><strong>Type: </strong>Golf</p>" +
            "<p><strong>Category </strong>" + feature.properties.KATEGORIE_ + "</p>" +
            "<p><strong>District </strong>" + feature.properties.District + "</p>" +
            "<p><a href='" + feature.properties.WEBLINK1 + "' target='_blank'>More info</a></p>";
        layer.bindPopup(popupContent);
    }
}

function onEachFitnessFeature(feature, layer) {
    if (feature.properties) {
        var popupContent = "<p><strong>Type: </strong>Fitness Equipment</p>" +
            "<p><strong>Category </strong>" + feature.properties.KATEGORIE_ + "</p>" +
            "<p><strong>District </strong>" + feature.properties.District + "</p>" +
            "<p><a href='" + feature.properties.WEBLINK1 + "' target='_blank'>More info</a></p>";
        layer.bindPopup(popupContent);
    }
}

function onClimbingFeature(feature, layer) {
    if (feature.properties) {
        var popupContent = "<p><strong>Type: </strong>Climbing</p>" +
            "<p><strong>Category </strong>" + feature.properties.KATEGORIE_ + "</p>" +
            "<p><strong>District </strong>" + feature.properties.District + "</p>" +
            "<p><a href='" + feature.properties.WEBLINK1 + "' target='_blank'>More info</a></p>";
        layer.bindPopup(popupContent);
    }
}

function onEachBocceFeature(feature, layer) {
    if (feature.properties) {
        var popupContent = "<p><strong>Type: </strong>Bocce Ball</p>" +
            "<p><strong>Category </strong>" + feature.properties.KATEGORIE_ + "</p>" +
            "<p><strong>District </strong>" + feature.properties.District + "</p>" +
            "<p><a href='" + feature.properties.WEBLINK1 + "' target='_blank'>More info</a></p>";
        layer.bindPopup(popupContent);
    }
}

function onEachVolleyballFeature(feature, layer) {
    if (feature.properties) {
        var popupContent = "<p><strong>Type: </strong>Beach Volleyball</p>" +
            "<p><strong>Category </strong>" + feature.properties.KATEGORIE_ + "</p>" +
            "<p><strong>District </strong>" + feature.properties.District + "</p>" +
            "<p><a href='" + feature.properties.WEBLINK1 + "' target='_blank'>More info</a></p>";
        layer.bindPopup(popupContent);
    }
}
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////






////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
var swimmingIcon = L.icon({
    iconUrl: 'icon/sports/swimming_pool.svg',
    iconSize: [35, 35],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

var swimmingLayer = L.geoJSON(swimming, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: swimmingIcon })
    },
    onEachFeature: onEachSwimmingFeature
}).addTo(swimmingCluster);

var drinkingIcon = L.icon({
    iconUrl: 'icon/water/drinking.svg',
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

var drinkingLayer = L.geoJSON(drinking, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: drinkingIcon })
    },
    onEachFeature: onEachFountainFeature
});

var groundwaterIcon = L.icon({
    iconUrl: 'icon/water/groundwater.svg',
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

var groundwaterLayer = L.geoJSON(groundwater, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: groundwaterIcon })
    },
    onEachFeature: onEachFountainFeature
});

var ornamentalIcon = L.icon({
    iconUrl: 'icon/water/ornamental.svg',
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

var ornamentalLayer = L.geoJSON(ornamental, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: ornamentalIcon })
    },
    onEachFeature: onEachFountainFeature
});


var outletIcon = L.icon({
    iconUrl: 'icon/water/outlet.svg',
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

var outletLayer = L.geoJSON(outlet, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: outletIcon })
    },
    onEachFeature: onEachFountainFeature
});


var recreationalIcon = L.icon({
    iconUrl: 'icon/water/recreational.svg',
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

var recreationalLayer = L.geoJSON(recreational, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: recreationalIcon })
    },
    onEachFeature: onEachFountainFeature
});


var petdrinkingIcon = L.icon({
    iconUrl: 'icon/water/pet_drinking.svg',
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

var petdrinkingLayer = L.geoJSON(pet_drinking, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: petdrinkingIcon })
    },
    onEachFeature: onEachFountainFeature
});


var tabletennisIcon = L.icon({
    iconUrl: 'icon/sports/table_tennis.svg',
    iconSize: [35, 35],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

var tabletennis = L.geoJSON(table_tennis, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: tabletennisIcon })
    },
    onEachFeature: onEachTennisFeature
});

var skateIcon = L.icon({
    iconUrl: 'icon/sports/skate_park.svg',
    iconSize: [35, 35],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

var skate = L.geoJSON(skate_park, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: skateIcon })
    },
    onEachFeature: onEachSkateFeature
});

var multihardIcon = L.icon({
    iconUrl: 'icon/sports/multisport_hard_court.svg',
    iconSize: [35, 35],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

var multi_hard = L.geoJSON(multi_hard, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: multihardIcon })
    },
    onEachFeature: onEachMultiHardFeature
});

var multigrassIcon = L.icon({
    iconUrl: 'icon/sports/multisport_grass_field.svg',
    iconSize: [35, 35],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

var multi_grass = L.geoJSON(multi_grass, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: multigrassIcon })
    },
    onEachFeature: onEachMultiGrassFeature
});

var minigolfIcon = L.icon({
    iconUrl: 'icon/sports/mini_golf.svg',
    iconSize: [35, 35],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

var mini_golf = L.geoJSON(mini_golf, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: minigolfIcon })
    },
    onEachFeature: onEachMiniGolfFeature
});

var golfIcon = L.icon({
    iconUrl: 'icon/sports/golf.svg',
    iconSize: [35, 35],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});
var golf = L.geoJSON(golf, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: golfIcon })
    },
    onEachFeature: onEachGolfFeature
});

var fitnessIcon = L.icon({
    iconUrl: 'icon/sports/fitness_equipment.svg',
    iconSize: [35, 35],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});
var fitness = L.geoJSON(fitness, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: fitnessIcon })
    },
    onEachFeature: onEachFitnessFeature
});


var climbingIcon = L.icon({
    iconUrl: 'icon/sports/climbing.svg',
    iconSize: [35, 35],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});
var climbing = L.geoJSON(climbing, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: climbingIcon })
    },
    onEachFeature: onClimbingFeature
});

var bocceIcon = L.icon({
    iconUrl: 'icon/sports/bocce_ball.svg',
    iconSize: [35, 35],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});
var bocce = L.geoJSON(bocce, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: bocceIcon })
    },
    onEachFeature: onEachBocceFeature
});

var volleyballIcon = L.icon({
    iconUrl: 'icon/sports/beach_volleyball.svg',
    iconSize: [35, 35],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});
var volleyball = L.geoJSON(volleyball, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: volleyballIcon })
    },
    onEachFeature: onEachVolleyballFeature
});
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

// Create layer groups
var myLayerGroupOutdoor = L.layerGroup([tabletennis, skate, multi_hard, multi_grass, mini_golf, golf, fitness, climbing, bocce, volleyball]);
var myLayerGroupFountains = L.layerGroup([drinkingLayer, groundwaterLayer, ornamentalLayer, outletLayer, recreationalLayer, petdrinkingLayer]);


// Add clusters to the map
map.addLayer(fountainsCluster);
map.addLayer(outdoorCluster);
map.addLayer(swimmingCluster);

outdoorCluster.checkIn(myLayerGroupOutdoor);
fountainsCluster.checkIn(myLayerGroupFountains);

myLayerGroupOutdoor.addTo(map);
myLayerGroupFountains.addTo(map);


var historical_gardens = L.geoJSON(historical_gardens, {
    onEachFeature: onEachHistGardenFeature,
    style: { color: '#89AD6D', weight: 2, fillColor: '#89AD6D', fillOpacity: 0.5 }
}).addTo(map);

var hikingroutes = L.geoJSON(hikingroutes, {
    onEachFeature: onEachHikingFeature,
    style: { color: '#ae711eff', weight: 2 }
}).addTo(map);

var rundumadum = L.geoJSON(rundumadum, {
    onEachFeature: onEachRundumadumFeature,
    style: { color: '#f29b37ff', weight: 3 }
}).addTo(map);


var groupedOverlays = {
    "Fountains": {
        "Drinking Fountains": drinkingLayer,
        "Ground Water Fountains": groundwaterLayer,
        "Ornamental Fountains": ornamentalLayer,
        "Outlet Fountains": outletLayer,
        "Recreational Fountains": recreationalLayer,
        "Pet Drinking Fountains": petdrinkingLayer,
    },
    "Outdoor Facilities": {
        "Table tennis": tabletennis,
        "Skate parks": skate,
        "Multisport Hard Courts": multi_hard,
        "Multisport Grass Fields": multi_grass,
        "Mini Golf": mini_golf,
        "Golf": golf,
        "Fitness equipment": fitness,
        "Climbing": climbing,
        "Bocce": bocce,
        "Volleyball": volleyball,
    },
    "Swimming": {
        "Swimming Pools": swimmingCluster
    },
    "Natural Attractions": {
        "Historical Gardens": historical_gardens,
        "Hiking Routes": hikingroutes,
        "Rundumadum": rundumadum
    }
};

L.control.groupedLayers(null, groupedOverlays).addTo(map);