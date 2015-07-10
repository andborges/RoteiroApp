angular.module('roteiroApp.controllers', [])

.controller('IndexCtrl', function($scope, $location) {
  $scope.search = {};

  $scope.executeSearch = function() {
    $location.url("/search/" + $scope.search.text);
  }
})

.controller('SearchCtrl', function($scope, $location, $routeParams, $resource) {
  $scope.search = { text: $routeParams.text };

  var url = "/api/v1/location/search/" + $scope.search.text;

  $resource(url).query(function(locations) {
    $scope.locations = locations;
  });

  $scope.executeSearch = function() {
    $location.url("/search/" + $scope.search.text);
  }
})

.controller('LocationCtrl', function($scope, $routeParams, $resource) {
  var url = "/api/v1/location/" + $routeParams.id;

  $resource(url).get(function(location) {
    $scope.location = location;
  });
})

.controller('ItineraryCtrl', function($scope, $routeParams, $resource) {
  var url = "/api/v1/itinerary/" + $routeParams.id;

  $resource(url).get(function(location) {
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
          id: type + "_" + markers.length,
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
      markers = markers.concat(createMarkers("lunch", [location.itineraries[0].days[i].lunch]));
      markers = markers.concat(createMarkers("dinner", [location.itineraries[0].days[i].dinner]));
    };

    $scope.map.markers = markers;
  });
});
