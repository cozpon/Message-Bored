angular.module('myApp')
.controller('UsersController', ['$scope', 'UserService', function($scope, UserService) {

  $scope.users = UserService.getUsers();

  $scope.addUser = function(e) {
    console.log('controller');
    UserService.addUser($scope.newUser);
    $scope.newUser.name = '';
  };
}]);