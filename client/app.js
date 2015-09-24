angular.module('app', [
  'ui.router', 'side', 'map', 'board', 'two'
])
.config(function($stateProvider, $httpProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/welcome');
  $stateProvider
    .state('welcome', {
      url: '/welcome',
      templateUrl: '../two/two.html',
      controller: 'twoctrl'
    })
    .state('board', {
      url: '/board',
      templateUrl: '../three/three.html',
      controller: 'boardctrl'
    })
    .state('map', {
      url: '/map',
      templateUrl: '../one/one.html',
      controller: 'mapctrl'
    });
});


