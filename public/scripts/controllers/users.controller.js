//USERS PLURAL

angular.module('myApp')
.controller('UsersController', ['$scope', 'UserService', function($scope, UserService) {

  $scope.getUsers = UserService.getUsers;

  $scope.addUser = function(e) {
    console.log('controller');
    UserService.addUser($scope.newUser);
    $scope.newUser.name = '';
  };
}]);