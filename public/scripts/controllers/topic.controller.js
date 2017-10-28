// USER SINGULAR
angular.module('myApp')
.controller('topicController', ['$scope', '$routeParams', '$location', 'TopicService', 'MessageService',
  function($scope, $routeParams, $location, TopicService, MessageService) {
    $scope.singleTopic = null;
    $scope.MessageService = MessageService;

    console.log(typeof $routeParams.id, "SOIHESF");


    if($routeParams.id){
      TopicService.singleTopic($routeParams.id)
      .then(function(data) {
        $scope.singleTopic = data;
      });
    }

    $scope.addMessage = function(e) {
      MessageService.addMessage($scope.newMessage, $scope.singleTopic.id)
      .then(function(newMessage){
        $scope.newMessage.body = '';
        $location.url('/messages/latest');
      });
    };
}]);


