angular.module('roteiroApp.controllers', [])

.controller('IndexCtrl', function($scope, $location) {
  $scope.search = {};

  $scope.executeSearch = function() {
    $location.url("/search/" + $scope.search.text);
  }
})
.controller('SearchCtrl', function($scope, $location, $routeParams, $resource) {
  $scope.search = { text: $routeParams.text };

  $resource("/api/v1/location/search/" + $scope.search.text).query(function(locations) {
    $scope.locations = locations;
  });

  $scope.executeSearch = function() {
    $location.url("/search/" + $scope.search.text);
  }
})
.controller('LocationCtrl', function($scope, $routeParams, $resource) {
  $resource("/api/v1/location/code/" + $routeParams.code).get(function(location) {
    $scope.location = location;
  });
})
.controller('ItineraryCtrl', function($scope, $routeParams, $resource) {
  $resource("/api/v1/itinerary/code/" + $routeParams.code).get(function(location) {
    $scope.location = location;

    $scope.map = {
      center: {
                latitude: location.itineraries[0].mapCenter[0],
                longitude: location.itineraries[0].mapCenter[1]
              },
      zoom: location.itineraries[0].mapZoom
    };

    var createMarkers = function(type, places) {
      var markers = [];

      for (var i = 0; i < places.length; i++) {
        var marker = {
          id: type + "_" + i,
          latitude: places[i].loc[0],
          longitude: places[i].loc[1],
          icon: "images/markers/" + (i + 1) + "_MarkerP.png",
          options: {
            labelContent: places[i].name,
            labelAnchor: "0 55",
            labelClass: "marker-labels"
          }
        };

        markers.push(marker);
      }

      return markers;
    };

    var markers = [];

    for (var i = 0; i < location.itineraries[0].days.length; i++) {
      markers = markers.concat(createMarkers("morning_" + i, location.itineraries[0].days[i].morning));
      markers = markers.concat(createMarkers("afternoon_" + i, location.itineraries[0].days[i].afternoon));
      markers = markers.concat(createMarkers("night_" + i, location.itineraries[0].days[i].night));
      markers = markers.concat(createMarkers("lunch" + i, [location.itineraries[0].days[i].lunch]));
      markers = markers.concat(createMarkers("dinner" + i, [location.itineraries[0].days[i].dinner]));
    };

    $scope.map.markers = markers;
  });
})

.controller('AdminLocationListCtrl', function($scope, $routeParams, $resource) {
  $resource("/api/v1/location").query(function(locations) {
    $scope.locations = locations;
  });
})
.controller('AdminLocationCreateCtrl', function($scope, $location, $resource) {
  $scope.save = function() {
    $resource("/api/v1/location").save($scope.location, function() {
      $location.url("/admin/location");
    });
  }
})
.controller('AdminLocationEditCtrl', function($scope, $location, $routeParams, $resource) {
  $resource("/api/v1/location/" + $routeParams.id).get(function(location) {
    $scope.location = location;
  });

  $scope.save = function() {
    $resource("/api/v1/location/" + $routeParams.id, null, { 'update': { method:'PUT' } }).update($scope.location, function() {
      $location.url("/admin/location");
    });
  }
})

.controller('AdminPlaceListCtrl', function($scope, $routeParams, $resource) {
  $resource("/api/v1/location/" + $routeParams.location_id + "/place").get(function(location) {
    $scope.location = location;
  });
})
.controller('AdminPlaceCreateCtrl', function($scope, $routeParams, $location, $resource) {
  $resource("/api/v1/location/" + $routeParams.location_id).get(function(location) {
    $scope.location = location;
  });
  
  $scope.map = { center: { latitude: 40.1451, longitude: -99.6680 }, zoom: 16 };
  $scope.options = { scrollwheel: false };

  $scope.searchbox = {
    template:'searchbox.tpl.html',
    events: {
      places_changed: function (searchBox) {
        // console.log(searchBox.getPlaces()[0].geometry.location.lat());
        var latLng = searchBox.getPlaces()[0].geometry.location;
        $scope.map.center = { latitude: latLng.lat(), longitude: latLng.lng() };
      }
    }
  };

  $scope.save = function() {
    $scope.place.location_id = $routeParams.location_id;

    $resource("/api/v1/location/" + $routeParams.location_id + "/place/create").save($scope.place, function() {
      $location.url("/admin/location/" + $routeParams.location_id + "/place");
    });
  }
})
.controller('AdminPlaceEditCtrl', function($scope, $location, $routeParams, $resource) {
  $scope.save = function() {
  }
});