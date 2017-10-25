// create a new Module
angular.module('myApp', ['ngRoute']);

// get back that new module
var app = angular.module('myApp')
.config(['', '', '',
 function() {
  // configure Movies
  MoviesProvider.setUrl('http://localhost:3000/api/movies');

  // define routes
  // $routeProvider
  // .when('/', {
  //   templateUrl: '/views/home.html',
  //   controller: 'HomeController'
  // })
  // .when('/users', {
  //   templateUrl: '/views/users.html',
  //   controller: 'UsersController'
  // })
  // .when('/latest', {
  //   templateUrl: '/views/latest.html',
  //   controller: 'MessagesController'
  // })
  // .otherwise({ //this is the 404 // error page
  //   template: '<h1><center> kablamo! </center></h1>'
  // });


  //this gets rid of #! in URL
  $locationProvider.html5Mode(true);

}]);