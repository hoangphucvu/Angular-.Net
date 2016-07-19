angular.module('MyApp').
controller('EmployeeController', function ($scope, EmployeeService) {
    $scope.Employees = null;
    EmployeeService.GetEmployeeList().then(function (result) {
        $scope.Employees = result.data;
    }, function () {
        alert('Error');
    });
}).
factory('EmployeeService', function ($http) {
    var fac = {};
    fac.GetEmployeeList = function () {
        return $http.get('/Data/GetEmployeeList');
    }
    return fac;
});