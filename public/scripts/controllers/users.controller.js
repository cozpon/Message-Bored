//USERS PLURAL

angular.module('myApp')
.controller('UsersController', ['$scope', '$location', 'UserService',
  function($scope, $location, UserService) {


  $scope.getUsers = UserService.getUsers;

  $scope.addUser = function(e) {
    UserService.addUser($scope.newUser)
    .then(function(){
      $scope.newUser.username = '';
      $scope.newUser.password = '';
    });
  };

  $scope.login = function(e) {
    UserService.login($scope.loginUser)
    .then(function(user) {
      $location.url('/users/' + user.id);
     });
    $scope.loginUser.username = '';
    $scope.loginUser.password = '';
  };

  $scope.logout = function(e){
    UserService.logout()
    .then(function (){
      console.log("here");
    $location.url('/users');
    });
  };

}]);