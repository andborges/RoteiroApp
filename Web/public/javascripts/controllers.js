angular.module('roteiroApp.controllers', [])

.controller('IndexCtrl', function($scope, $resource) {
  $scope.search = {};

  $scope.executeSearch = function() {
  	var url = "/api/v1/location/search/" + $scope.search.name;

    $resource(url).query(function(locations) {
      $scope.locations = locations;
    });
  }
});