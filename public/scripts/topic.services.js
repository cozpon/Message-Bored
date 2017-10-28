angular.module('myApp')
.service('TopicService', ['$http', function($http) {
  var url = '/api/topics';
  var self = this;
  this.topics = [];


  //initialization
  $http.get(url)
  .then(function(response) {
    self.topics = response.data;
  });

// read methods
  this.getTopics = function() {
    return self.topics;
  };
// get messageFromTopic
  this.messageFromTopic = function(id) {
    var fullUrl = url + '/' + id + '/messages';
    return $http.get(fullUrl)
    .then(function(messages){
      console.log("message", messages.data);
      return messages.data.messages;
    });
  };
// GET single user
  this.singleTopic = function(id) {
    var fullUrl = url + '/' + id;
    return $http.get(fullUrl)
    .then(function(res){
      console.log("topic", res.data);
      return res.data;
    });
  };

// create method on frontend
  this.addTopic = function(topicName) {
    if (!topicName) { return '404'; }
    var topic = {
      name: topicName.name
    };
// create method on backend
    return $http.post(url, topic)
    .then(function(response) {
      self.topics.push(response.data);
      return response.data;
    });
  };



}]);

