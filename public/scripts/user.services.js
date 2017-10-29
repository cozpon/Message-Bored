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
    self.users = response.data;
  });

  // read methods
  this.getUsers = function() {
    return self.users; };

  // create method on frontend
  this.addUser = function(givenUser) {
    if (!givenUser) { return '404'; }
    var user = {
      username: givenUser.username,
      password: givenUser.password
    };
    // create method on backend
    return $http.post(url, user)
    .then(function(response) {
      self.users.push(response.data);
      return response.data;
    });
  };

  this.login = function(data) {
    var user = { username: data.username, password: data.password };
    return $http.post('/api/login', user)
    .then(function(user) {
      localStorage.setItem('loggedin', true);
      localStorage.setItem('user', user.data.id);
      return user.data;
    });
  };

  this.logout = function() {
    return $http.get('/logout')
    .then(function(response) {
      localStorage.setItem('loggedin', false);
      localStorage.setItem('user', 0);
      return response;
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