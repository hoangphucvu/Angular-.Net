angular.module('MyApp').
controller('UploadController', function ($scope, UploadService) {
    $scope.Message = '';
    $scope.FileInvalidMessage = "";
    $scope.SelectedFileForUpload = null;
    $scope.FileDescription = "";
    $scope.IsFormSubmitted = false;
    $scope.IsFileValid = false;
    $scope.IsFormValid = false;

    //Form Validation
    $scope.$watch("f1.$valid", function (isValid) {
        $scope.IsFormValid = isValid;
    });

    // THIS IS REQUIRED AS File Control is not supported 2 way binding features of Angular
    // ------------------------------------------------------------------------------------
    //File Validation

    $scope.CheckFileValid = function (file) {
        var isValid = false;
        if ($scope.SelectedFileUpload != null) {
            if ((file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/gif') && file.size <= (512 * 1024)) {
                $scope.FileInvalidMessage = "";
                isValid = true;
            }
            else {
                $scope.FileInvalidMessage = "Selected file is Invalid. (only file type png, jpeg and gif and 512 kb size allowed)";
            }
        }
        else {
            $scope.FileInvalidMessage = "Image required!";
        }
        $scope.IsFileValid = isValid;
    };

    //file select event
    $scope.selectFileUpload = function (file) {
        $scope.SelectedFileUpload = file[0];
    }

    $scope.SaveFile = function () {
        $scope.IsFormSubmitted = true;
        $scope.Message = "";
        $scope.CheckFileValid($scope.SelectedFileUpload);
        if ($scope.IsFormValid && $scope.IsFileValid) {
            UploadService.UploadFile($scope.SelectedFileUpload).then(function (data) {
                alert(data.Message);
                ClearForm();
            }, function (err) {
                alert(e);
            });
        }
        else {
            $scope.Message = "All the fields are required.";
        }
    };

    function ClearForm() {
        angular.forEach(angular.element("input[type='file']"), function (inputElement) {
            angular.element(inputElement).val(null);
        });

        $scope.f1.$setPristine();
        $scope.IsFormSubmitted = false;
    }
}).
factory('UploadService', function ($http, $q) {
    var fac = {};
    fac.UploadFile = function (file) {
        var formData = new FormData();
        //send data to server using append
        formData.append('file', file);

        var defer = $q.defer();
        $http.post('/Data/UpFile', formData, {
            withCredentials: true,
            headers: { 'Content-type': undefined },
            transformRequest: angular.identity
        }).
        success(function (data) {
            defer.resolve(data);
        }).
        error(function () {
            defer.reject("File Upload Failed!");
        });
        return defer.promise;
    }
    return fac;
});