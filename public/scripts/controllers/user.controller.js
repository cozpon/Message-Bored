// USER SINGULAR
angular.module('myApp')
.controller('userController', ['$scope', '$routeParams', 'UserService',
  function($scope, $routeParams, UserService) {

  UserService.singleUser($routeParams.id)
  .then(function(data) {
    $scope.singleUser = data;
  });
}]);