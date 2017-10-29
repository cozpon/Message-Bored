angular.module('myApp')
.controller('ViewsController', ['$scope', function($scope){

  $scope.login = function(){
    return localStorage.getItem("loggedin") === "true";
  };

}]);