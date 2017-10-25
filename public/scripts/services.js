// all data, all models in here
// and from here we transport it where it needs to go
// only has $http in here

angular.module('myApp')
.service('UserService', ['$http', function($http) {
  var url = '/api/users';
  var self = this;
  this.users = [];

  //initialization
  // all http-get's return promises
  $http.get(url)
  .then(function(response) {
    console.log(response);
    self.users = response.data;
  });

  // read methods
  this.getUsers = function() { return self.users; };
  this.getUser = function(index) { return users[index]; };

  // create method on frontend
  this.addUser = function(givenUser) {
    if (!givenUser) { return; }
    var user = {
      name: givenUser.name,
    };
    self.users.push(user);
    // create method on backend
    $http.post(url, user)
    .then(function(response) {
      console.log('user made on backend');
    });
  };

  // this.updateUser = function(id, user) {
  //   var updateUrl = url + '/' + id;
  //   $http.put(updateUrl, user);
  // };

}]);