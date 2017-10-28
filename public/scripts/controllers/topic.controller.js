// USER SINGULAR
angular.module('myApp')
.controller('topicController', ['$scope', '$routeParams', 'TopicService', 'MessageService',
  function($scope, $routeParams, TopicService, MessageService) {
    $scope.singleTopic = null;
    TopicService.singleTopic($routeParams.id)
    .then(function(data) {
      $scope.singleTopic = data;
    });

    $scope.addMessage = function(e) {
      console.log($scope.singleTopic.id, "Scope Single");
      MessageService.addMessage($scope.newMessage, $scope.singleTopic.id)
      .then(function(newMessage){
        $scope.newMessage.body = '';
        $location.url('/topic/:id');
      });
    };
}]);