// USER SINGULAR
angular.module('myApp')
.controller('topicController', ['$scope', '$routeParams', 'TopicService',
  function($scope, $routeParams, TopicService) {
  console.log(TopicService.singleTopic, "HESDFSDFSDFSDY");
  TopicService.singleTopic($routeParams.id)
  .then(function(data) {
    $scope.singleTopic = data;
  });

}]);