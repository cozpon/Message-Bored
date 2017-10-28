angular.module('myApp')
.controller('TopicsController', ['$scope', '$location', 'TopicService', 'MessageService',
 function($scope, $location, TopicService, MessageService) {

  $scope.getTopics = TopicService.getTopics;
  $scope.getMessages = MessageService.getMessages;

  $scope.addTopic = function(e) {
    TopicService.addTopic($scope.newTopic)
    .then(function(){
      $scope.newTopic.name = '';
      $location.url('/topics');
    });
  };

}]);

