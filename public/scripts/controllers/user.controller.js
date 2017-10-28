// USER SINGULAR
angular.module('myApp')
.controller('userController', ['$scope', '$routeParams', 'TopicService', 'UserService',
  function($scope, $routeParams, TopicService, UserService) {

  $scope.UserService = TopicService.UserService;

  UserService.singleUser($routeParams.id)
  .then(function(data) {
    $scope.singleUser = data;
  });
}]);