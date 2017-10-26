//USERS PLURAL

angular.module('myApp')
.controller('UsersController', ['$scope', 'UserService', function($scope, UserService) {

  $scope.UserService = UserService;
  $scope.getUsers = UserService.getUsers;

  $scope.addUser = function(e) {
    UserService.addUser($scope.newUser)
    .then(function(){
      $scope.newUser.name = '';
      $scope.newUser.password = '';
    });

  };
}]);