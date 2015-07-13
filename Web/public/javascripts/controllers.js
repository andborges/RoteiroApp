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
  var url = "/api/v1/location/code/" + $routeParams.code;

  $resource(url).get(function(location) {
    $scope.location = location;
  });
})
.controller('ItineraryCtrl', function($scope, $routeParams, $resource) {
  var url = "/api/v1/itinerary/code/" + $routeParams.code;

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
  var url = "/api/v1/location";

  $resource(url).query(function(locations) {
    $scope.locations = locations;
  });
})
.controller('AdminLocationCreateCtrl', function($scope, $location, $resource) {
  $scope.save = function() {
    var url = "/api/v1/location";

    $resource(url).save($scope.location, function() {
      $location.url("/admin/location");
    });
  }
})
.controller('AdminLocationEditCtrl', function($scope, $location, $routeParams, $resource) {
  var url = "/api/v1/location/" + $routeParams.id;

  $resource(url).get(function(location) {
    $scope.location = location;
  });

  $scope.save = function() {
    $resource(url, null, { 'update': { method:'PUT' } }).update($scope.location, function() {
      $location.url("/admin/location");
    });
  }
});