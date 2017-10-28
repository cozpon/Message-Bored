angular.module('myApp')
.service('MessageService', ['$http', function($http) {
  var url = '/api/messages';
  var urlGet = '/api/messages/latest';
  var getByTopic = '/api/topic/:id';
  var self = this;
  self.messages = [];

  //initialization
  $http.get(urlGet)
  .then(function(response) {
    self.messages = response.data;
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
      self.messages.push(response.data);
      return response.data;
    });
  };

// // get messageFromTopic
//   this.messageFromTopic = function(id) {
//     var fullUrl = url + '/' + id + '/messages';
//     console.log(fullUrl, "FULL URL");
//     return $http.get(fullUrl)
//     .then(function(messages){
//       console.log(messages, "MESSAGE TOPIC");
//       return messages;
//     });
//   };


}]);