angular.module('MyApp')
.controller('DataController', function ($scope, ContactService) { // inject contact services
    $scope.contact = null;
    ContactService.GetLastContact().then(function (result) {
        $scope.Contact = result.data; // success
    }, function () {
        alert('Failed');
    })
}).
factory('ContactService', function ($http) {
    var fac = {};
    fac.GetLastContact = function () {
        return $http.get('/Data/GetLastContact');
    }
    return fac;
})