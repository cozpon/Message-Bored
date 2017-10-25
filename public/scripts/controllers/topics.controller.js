angular.module('myApp')
.controller('TopicsController', ['$scope', 'Topics', function($scope, Topics) {

  $scope.topics = [];

  Topics.getTopics()
  .then(function(topics) {
    $scope.topics = topics;
  });
}]);