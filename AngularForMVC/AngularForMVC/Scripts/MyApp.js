(function () {
    //create a module
    var app = angular.module('MyApp', ['ngRoute']);
    //create a controller
    app.controller('HomeController', function ($scope) {
        $scope.message = "Hello world";
    });
})();