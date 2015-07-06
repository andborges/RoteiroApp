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
    otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
}]);