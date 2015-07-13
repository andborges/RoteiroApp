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
    when('/location/:code', {
      templateUrl: 'partials/location',
      controller: 'LocationCtrl'
    }).
    when('/itinerary/:code', {
      templateUrl: 'partials/itinerary',
      controller: 'ItineraryCtrl'
    }).

    when('/admin/location', {
      templateUrl: 'partials/admin/location/list',
      controller: 'AdminLocationListCtrl'
    }).
    when('/admin/location/create', {
      templateUrl: 'partials/admin/location/create',
      controller: 'AdminLocationCreateCtrl'
    }).
    when('/admin/location/edit/:id', {
      templateUrl: 'partials/admin/location/edit',
      controller: 'AdminLocationEditCtrl'
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