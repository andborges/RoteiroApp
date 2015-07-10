angular.module('roteiroApp', ['ngRoute', 'ngResource', 'uiGmapgoogle-maps', 'roteiroApp.controllers']).

config(['$routeProvider', '$locationProvider', 'uiGmapGoogleMapApiProvider', function($routeProvider, $locationProvider, GoogleMapApi) {
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

  GoogleMapApi.configure({
    // key: 'your api key',
    v: '3.17',
    libraries: 'weather,geometry,visualization'
  });
}]);