
angular.module('myApp')
.controller('TopicsController', ['$scope', 'TopicService', function($scope, UserService) {


  $scope.addTopic = function(e) {
    TopicService.addTopic($scope.newTopic)
    .then(function(){
      $scope.newTopic.username = '';
    });
  };

}]);