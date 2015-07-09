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

    var markers = [];
    for (var i = 0; i < location.itineraries[0].days.length; i++) {
      for (var j = 0; j < location.itineraries[0].days[i].morning.length; j++) {
        markers.push(location.itineraries[0].days[i].morning[j]);
      }
      
      markers.push(location.itineraries[0].days[i].lunch);
      markers.push(location.itineraries[0].days[i].dinner);
    };

    $scope.markers = markers;
  });
});
