// USER SINGULAR
angular.module('myApp')
.controller('UserController', ['$scope', '$routeParams', 'UserService',
  function($scope, $routeParams, UserService) {

  UserService.singleUser($routeParams.id)
  .then(function(data) {
    $scope.singleUser = data;
  });
}]);