//================================================================================================= SECTION

var map = null;
var zoomControlStyle = null;
var mapTypeControlStyle = null;
var geocoder = null;
var template = Handlebars.compile($("#template").html());
var infowindow = null;
var markers = [];
var data = [];

//================================================================================================= SECTION

function initMap() {

	var mapOptions = {
		zoom: 6,
		center: new google.maps.LatLng(46, 24.976111111),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		zoomControlOptions: {
			style: zoomControlStyle
		},
		mapTypeControlOptions: {
			style: mapTypeControlStyle
		}
	};

	map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
	geocoder = new google.maps.Geocoder();
	infowindow = new google.maps.InfoWindow();

	google.maps.event.addListener(map, "click", function() {
		infowindow.close();
	});

}

//================================================================================================= SECTION

function addPins() {

	var pins = ["pin-recycle-bin.png", "pin-recycling-center.png", "pin-store.png"];
	var titles = ["Pubele reciclare", "Centru colectare", "Magazin"];

	for (var i = 0; i < data.length; i++) {
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(data[i]["lat"], data[i]["lng"]),
			icon: "assets/" + pins[data[i]["point_type"]],
			title: titles[data[i]["type"]],
			index: i,
			map: map
		});
		google.maps.event.addListener(marker, "click", function() {
			var marker = this;
			infowindow.setContent(template(data[marker.index]));
			infowindow.open(map, marker);
		});
		markers.push(marker);
	}

	var markerCluster = new MarkerClusterer(map, markers, {
		gridSize: null,
		maxZoom: 11,
		styles: [
			{
				url: "assets/tree.png",
				width: 32,
				height: 32,
				anchor: [7, null],
				textColor: "#570a36",
				textSize: 10
			}
		]
	});

}

//================================================================================================= SECTION

function zoomOn(city) {

	geocoder.geocode({"address": city + ", Romania"}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			map.setCenter(results[0].geometry.location);
			map.setZoom(13);
		} else {
			// TODO
			alert("Geocode was not successful: " + status);
		}
	});

}

function initSearch() {

	if (document.location.hash != "")
		zoomOn(decodeURIComponent(document.location.hash));

	$("#search").submit(function(event) {
		var city = $("#city").val().trim();
		if (!city)
			return false;

		window.location = "http://localhost:3000/map#" + city;
		return false;

		zoomOn(city);
		document.location.hash = encodeURIComponent(city);
		return false;
	});

}

//================================================================================================= SECTION



//================================================================================================= SECTION



//================================================================================================= SECTION



//================================================================================================= SECTION



//================================================================================================= SECTION



//================================================================================================= SECTION



//================================================================================================= SECTION



//================================================================================================= SECTION



//================================================================================================= SECTION



//================================================================================================= SECTION


//================================================================================================= SECTION

google.maps.event.addDomListener(window, "load", function() {

	if ($(window).width() <= 767) {
		zoomControlStyle = google.maps.ZoomControlStyle.SMALL;
		mapTypeControlStyle = google.maps.MapTypeControlStyle.DROPDOWN_MENU;
	}

	initMap();
	initSearch();

	$.get("http://localhost:3000/points.json", function(response) {
		data = response;
		addPins();
	});

});

//================================================================================================= SECTION
