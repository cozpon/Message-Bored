angular.module('myApp')
.controller('MessagesController', ['$scope', '$location', 'MessageService',
 function($scope, $location, MessageService) {

  $scope.getMessages = MessageService.getMessagess;

  $scope.addMessage = function(e) {
    console.log($scope.newMessage, "SCOPE SIDE");
    MessageService.addMessage($scope.newMessage)
    .then(function(){
      $scope.newMessage.body = '';
      $location.url('/messages');
    });
  };

}]);