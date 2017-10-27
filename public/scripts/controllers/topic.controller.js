// USER SINGULAR
angular.module('myApp')
.controller('topicController', ['$scope', '$routeParams', 'TopicService',
  function($scope, $routeParams, TopicService) {

  TopicService.singleTopic($routeParams.id)
  .then(function(data) {
    $scope.singleTopic = data;
  });

}]);