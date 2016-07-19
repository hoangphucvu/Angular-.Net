angular.module('MyApp').
controller('LoginController', function ($scope, LoginService) {
    $scope.IsLogin = false;
    $scope.Message = '';
    $scope.Submitted = false;
    $scope.IsFormValid = false;

    $scope.LoginData = {
        Username: '',
        Password: ''
    };

    $scope.$watch('f1.$valid', function (newVal) {
        $scope.IsFormValid = newVal;
    });

    $scope.Login = function () {
        $scope.Submitted = true;
        if ($scope.IsFormValid) {
            LoginService.GetUser($scope.LoginData).then(function (result) {
                if (result.data.Username != null) {
                    $scope.IsLogin = true;
                    $scope.Message = 'Login Success Welcome ' + result.data.Fullname;
                }
                else {
                    alert("Invalid credentails");
                }
            });
        }
    }
}).
factory('LoginService', function ($http) {
    var fac = {};
    fac.GetUser = function (result) {
        return $http({
            url: '/Data/UserLogin',
            method: 'POST',
            data: JSON.stringify(result),
            header: { 'content-type': 'application/json' }
        });
    }
    return fac;
});