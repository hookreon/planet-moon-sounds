angular.module('side', ['ngMaterial'])

.controller('AppCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
    console.log('toggled')
  }; 
}]);

