angular.module('roteiroApp', ['ngRoute', 'ngResource', 'roteiroApp.controllers']).

config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'partials/index',
      controller: 'IndexCtrl'
    }).
    when('/search/:text', {
      templateUrl: 'partials/search',
      controller: 'SearchCtrl'
    }).
    when('/location/:id', {
      templateUrl: 'partials/location',
      controller: 'LocationCtrl'
    }).
    when('/itinerary/:id', {
      templateUrl: 'partials/itinerary',
      controller: 'ItineraryCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
}]);