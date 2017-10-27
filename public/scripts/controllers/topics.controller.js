angular.module('myApp')
.controller('TopicsController', ['$scope', '$location', 'TopicService', 'UserService',
 function($scope, $location, TopicService, UserService) {
  $scope.getUsers = UserService.getUsers;
  $scope.getTopics = TopicService.getTopics;

  $scope.addTopic = function(e) {
    TopicService.addTopic($scope.newTopic)
    .then(function(){
      $scope.newTopic.name = '';
      $location.url('/topics');
    });
  };

}]);

