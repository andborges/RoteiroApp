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

    var markers = [];
    for (var i = 0; i < location.itineraries[0].days.length; i++) {
      for (var j = 0; j < location.itineraries[0].days[i].morning.length; j++) {
        var marker = {
          id: "morning" + markers.length,
          latitude: location.itineraries[0].days[i].morning[j].loc[0],
          longitude: location.itineraries[0].days[i].morning[j].loc[1],
          title: location.itineraries[0].days[i].morning[j].name,
          icon: "images/markers/" + (i + 1) + "_MarkerP.png"
        };

        markers.push(marker);
      }
    };

    $scope.map.markers = markers;
  });
});
