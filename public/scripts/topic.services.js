
angular.module('myApp')
.service('TopicService', ['$http', function($http) {
  var url = '/api/topics';
  var self = this;
  this.topics = [];
}]);