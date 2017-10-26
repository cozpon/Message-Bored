// USER SINGULAR

angular.module('myApp')
.controller('UserController', ['$scope', '$routeParams', 'UserService', function($scope, $routeParams, UserService) {
  console.log($routeParams.id, "THIS");

  UserService.singleUser($routeParams.id)
  .then(function(data) {
    $scope.singleUser = data;
  });
}]);