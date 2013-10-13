//================================================================================================= MAIN INIT

function init() {
  map = null;
  mapOptions = {
    zoom: 6,
    center: new google.maps.LatLng(46, 24.976111111),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControlOptions: {
      style: null
    },
    mapTypeControlOptions: {
      style: null
    },
    scrollwheel: true
  };
  markers = [];
  geocoder = new google.maps.Geocoder();
  infowindow = new google.maps.InfoWindow();
}

//================================================================================================= ZOOM ON

function zoomOn(location) {
  geocoder.geocode({"address": location + ", Romania"}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      map.setZoom(13);
    } else {
      // geocode failed due to status
    }
  });
}

//================================================================================================= INIT SEARCH

function initSearch(local) {
  if (document.location.hash != "" && document.getElementById("map-canvas")) {
    zoomOn(decodeURIComponent(document.location.hash));
  }
  $("#search").submit(function(event) {
    var city = $("#city").val().trim();
    if (!city) {
      return false;
    }
    local = local || false;
    if (local) {
      zoomOn(city);
      document.location.hash = encodeURIComponent(city);
    } else {
      window.location = map_path + "#" + encodeURIComponent(city);
    }
    return false;
  });
}

//================================================================================================= INIT MAP

function initMap() {
  if (!document.getElementById("map-canvas")) {
    return false;
  }
  if ($(window).width() <= 767) {
    mapOptions.zoomControlOptions.style = google.maps.ZoomControlStyle.SMALL;
    mapOptions.mapTypeControlOptions.style = google.maps.MapTypeControlStyle.DROPDOWN_MENU;
    mapOptions.scrollwheel = false;
  }
  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
}

//================================================================================================= ADD PINS

function addPins(data) {
  google.maps.event.addListener(map, "click", function() {
    infowindow.close();
  });
  var pins = ["pin-recycle-bin.png", "pin-recycling-center.png", "pin-store.png"];
  var titles = ["Pubele reciclare", "Centru colectare", "Magazin"];
  var template = Handlebars.compile($("#template").html());
  for (var i = 0; i < data.length; i++) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(data[i]["lat"], data[i]["lng"]),
      icon: "/assets/" + pins[data[i]["point_type"]],
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
        url: "/assets/tree.png",
        width: 32,
        height: 32,
        anchor: [7, null],
        textColor: "#570a36",
        textSize: 10
      }
    ]
  });
}

//================================================================================================= END