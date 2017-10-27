angular.module('myApp')
.controller('TopicsController', ['$scope', '$location', 'TopicService',
 function($scope, $location, TopicService) {

  $scope.getTopics = TopicService.getTopics;

  $scope.addTopic = function(e) {
    TopicService.addTopic($scope.newTopic)
    .then(function(){
      $scope.newTopic.name = '';
      $location.url('/topics');
    });
  };

}]);

