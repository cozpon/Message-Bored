angular.module('myApp')
.service('MessageService', ['$http', function($http) {
  var url = '/api/messages';
  var urlGet = '/api/messages/latest';
  var self = this;
  self.messages = [];
  console.log(self.messages, "UPPER SELF MESAGES");
  //initialization
  $http.get(urlGet)
  .then(function(response) {
    self.messages = response.data;
    console.log(self.messages, "MIDDLE SELF MISEESEGES");
  });

// read methods
  this.getMessages = function() {
    return self.messages;
  };



  // create method on frontend
  this.addMessage = function(newMessage, topicID) {
    if (!newMessage) { return '404'; }
    var message = {
      body: newMessage.body,
      topic_id: topicID
    };
    // create method on backend
    return $http.post(url, message)
    .then(function(response) {
      console.log(response.data, "RES DATA");
      self.messages.push(response.data);
      console.log(self.messages, "SELF MESSAGES");
      return response.data;
    });
  };



}]);