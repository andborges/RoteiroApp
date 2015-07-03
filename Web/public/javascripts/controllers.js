angular.module('roteiroApp.controllers', [])

.controller('IndexCtrl', function($scope, $resource) {
  $scope.search = {};

  //$resource('https://roteiro.firebaseio.com/itineraries.json').get(function(entries) {
  //  $scope.itineraries = entries;
  //});

  $scope.executeSearch = function() {
  	var url = "https://roteiro.firebaseio.com/itineraries.json?orderBy=name&startAt=" + $scope.search.name + "&endAt=" + $scope.search.name;

    $resource(url).get(function(entries) {
      $scope.itineraries = entries;
    });
  }
});