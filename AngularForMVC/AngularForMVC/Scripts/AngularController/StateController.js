angular.module('MyApp').
controller('StateController', function ($scope, LocationService) {
    $scope.CountryID = null;
    $scope.StateID = null;
    $scope.CountryList = null;
    $scope.StateList = null;

    $scope.StateTextToShow = 'Select State';
    $scope.Result = "";

    LocationService.GetCountry().then(function (result) {
        $scope.CountryList = result.data;
    }, function () { alert('Error') });

    //this function will call after select change country
    $scope.GetState = function () {
        $scope.StateID = null; // clear selected stated if any
        $scope.StateList = null; // clear previous loaded state list
        $scope.StateTextToShow = "Please Wait...";

        LocationService.GetState($scope.CountryID).then(function (result) {
            $scope.StateList = result.data;
            $scope.StateTextToShow = 'Select State';
        }, function () { alert('Error') });
    }

    //show result
    $scope.ShowResult = function () {
        $scope.Result = "Selected Country ID : " + $scope.CountryID + " State ID : " + $scope.StateID;
    }
}).
factory('LocationService', function ($http) {
    var fac = {};
    fac.GetCountry = function () {
        return $http.get('/Data/GetCountries');
    }
    fac.GetState = function (countryID) {
        return $http.get('/Data/GetStates?countryId=' + countryID);
    }
    return fac;
});