// all data, all models in here
// and from here we transport it where it needs to go
angular.module('myApp')
.service('UserService', ['$http', function($http) {
  var url = '/api/register';
  var usersUrl = '/api/users/';
  var self = this;
  this.users = [];

  //initialization
  $http.get(usersUrl)
  .then(function(response) {
  console.log(response.data, "HEY");
    self.users = response.data;
  });

  // read methods
  this.getUsers = function() { return self.users; };

  // create method on frontend
  this.addUser = function(givenUser) {
    if (!givenUser) { return; }
    var user = {
      name: givenUser.name,
      password: givenUser.password
    };
    // create method on backend
    return $http.post(url, user)
    .then(function(response) {
      self.users.push(response.data);
      return response.data;
    });
  };

  this.updateUser = function(id, user) {
    var updateUrl = url + '/' + id;
    $http.put(updateUrl, user);
  };

  // GET single user
  this.singleUser = function(id) {
    var fullUrl = usersUrl + '/' + id;
    return $http.get(fullUrl)
    .then(function(res){
      return res.data;
    });
  };

}]);