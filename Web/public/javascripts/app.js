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
    when('/admin/location/:id/edit', {
      templateUrl: 'partials/admin/location/edit',
      controller: 'AdminLocationEditCtrl'
    }).

    when('/admin/location/:location_id/place', {
      templateUrl: 'partials/admin/place/list',
      controller: 'AdminPlaceListCtrl'
    }).
    when('/admin/location/:location_id/place/create', {
      templateUrl: 'partials/admin/place/create',
      controller: 'AdminPlaceCreateCtrl'
    }).
    when('/admin/location/:location_id/place/:id/edit', {
      templateUrl: 'partials/admin/place/list',
      controller: 'AdminPlaceListCtrl'
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