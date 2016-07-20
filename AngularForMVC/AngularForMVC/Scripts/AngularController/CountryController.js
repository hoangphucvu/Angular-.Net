var app = angular.module('MyApp', ['angucomplete-alt']);
app.controller('CountryController', ['$scope', '$http', function ($scope, $http) {
    $scope.Countries = [];
    $scope.SelectedCountry = null;

    //After select country event
    $scope.afterSelectCountry = function (selected) {
        if (selected) {
            $scope.SelectedCountry = selected.originalObject;
        }
    }

    $http({
        method: 'GET',
        url: '/Data/GetCountries'
    }).then(function (data) {
        $scope.Countries = data.data;
    }, function () {
        alert('Error');
    })
}]);