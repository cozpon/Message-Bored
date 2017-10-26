//USERS PLURAL

angular.module('myApp')
.controller('UsersController', ['$scope', 'UserService', function($scope, UserService) {


  $scope.getUsers = UserService.getUsers;

  $scope.addUser = function(e) {
    UserService.addUser($scope.newUser)
    .then(function(){
      $scope.newUser.username = '';
      $scope.newUser.password = '';
    });
  };

  $scope.login = function(e) {
    UserService.login($scope.loginUser);
      $scope.loginUser.username = '';
      $scope.loginUser.password = '';
  };

}]);