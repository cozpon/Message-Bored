angular.module('myApp')
.service('MessageService', ['$http', function($http) {
  var url = '/api/messages';
  var self = this;
  this.messages = [];

  //initialization
  $http.get(url)
  .then(function(response) {
    self.messages = response.data;
  });

// read methods
  this.getMessages = function() {
    console.log(self.messages);
    return self.messages;
  };


  // create method on frontend
  this.addMessage = function(message, topicID) {
    if (!message) { return '404'; }
    console.log(topicID, "TOPIC ID");
    var newMessage = {
      body: message.body,
      topic_id: topicID
    };
    // create method on backend
    return $http.post(url, newMessage)
    .then(function(response) {
      console.log(response.data, "RES DATA");
      self.messages.push(response.data);
      return response.data;
    });
  };



}]);