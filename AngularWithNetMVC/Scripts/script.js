var myApp = angular.module('myApp', ['ngRoute']);
myApp.controller('myAppCtrl', myAppCtrl);
myApp.controller('LoginController', LoginController);
myApp.factory('AuthHttpResponseInterceptor', AuthHttpResponseInterceptor);
var configFunction = function ($routeProvider, $httpProvider) {
    $routeProvider.
        when('/routeOne', {
            templateUrl: 'routesDemo/one'
        }).
        when('/routeTwo/:donuts', {
            templateUrl: function (params) { return '/routesDemo/two?donuts=' + params.donuts; }
        }).
        when('/routeThree', {
            templateUrl: 'routesDemo/three'
        }).
        when('/login?returnUrl', {
            templateUrl: '/Account/Login',
            controller: LoginController
        });
    //Http Intercpetor to check auth failures for xhr requests
    $httpProvider.interceptors.push(AuthHttpResponseInterceptor);
}
configFunction.$inject = ['$routeProvider', '$httpProvider'];

myApp.config(configFunction);