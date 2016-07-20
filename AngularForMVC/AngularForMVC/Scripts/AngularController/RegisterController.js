angular.module('MyApp').
controller('RegisterController', function ($scope, RegisterService) {
    $scope.submitText = "Save";
    $scope.submitted = false;
    $scope.message = '';
    $scope.isFormValid = false;

    $scope.User = {
        Username: '',
        Password: '',
        FullName: '',
        EmailID: '',
        Gender: ''
    }

    //check form validation
    //f1 is form name
    $scope.$watch('f1.$valid', function (newValue) {
        $scope.isFormValid = newValue;
    });

    $scope.SaveData = function (data) {
        if ($scope.submitText === 'Save') {
            $scope.submitted = true;
            $scope.message = '';
            if ($scope.isFormValid) {
                $scope.submitText = 'Please wait ...';
                $scope.User = data;
                RegisterService.SaveFormData($scope.User).then(function (result) {
                    alert(result);
                    if (result == 'Success') ClearForm();
                    $scope.submitText = 'Save';
                });
            } else {
                $scope.message = 'Please fill required fields value';
            }
        }
    }

    function ClearForm() {
        $scope.User = {};
        $scope.f1.$setPristine();
        $scope.submitted = false;
    }
}).
factory('RegisterService', function ($http, $q) {
    //here $q is a angularjs service with help us to run asynchronous function and return result when processing done
    var fac = {};
    fac.SaveFormData = function (data) {
        var defer = $q.defer();
        $http({
            url: '/Data/Register',
            method: 'POST',
            data: JSON.stringify(data),
            header: { 'content-type': 'application/json' }
        }).success(function (data) {
            defer.resolve(data);
        }).error(function (err) {
            alert('Error');
            defer.reject(err);
        });
        return defer.promise;
    }
    return fac;
});