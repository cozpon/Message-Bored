
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
  this.getTopics = function() { return self.topics; };

  // create method on frontend
  this.addTopic = function(topicName) {
    if (!topicName) { return '404'; }
    console.log(topicName, "TOPIC NAME");
    var topic = {
      name: topicName.name
    };
    // create method on backend
    return $http.post(url, topic)
    .then(function(response) {
      console.log(response, "RESPONSE TOPIC");
      self.topics.push(response.data);
      console.log(response.data);
      return response.data;
    });
  };

}]);

