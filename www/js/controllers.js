angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal) {


        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/search.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Open the search modal
        $scope.openModal = function () {
            $scope.modal.show();
        };

        // Triggered in the login modal to close it
        $scope.closeModal = function () {
            $scope.modal.hide();
        };



    })

    .controller('BeersListCtrl', function ($scope, $stateParams, $http) {
        //That's mine! =D Change it later
        var apiKey = '53bdaa14fe3d0a7db5fe60cb7c4facb9';
        var url = 'https://salty-taiga-88147.herokuapp.com/beers';
        var options = {
            key: apiKey,
            abv: '10'
        };
        $http({
            method: 'GET',
            url: url,
            params: options
        })
            .then(
            function (response) {
                console.info('Success');
                console.log(response);
                $scope.beers = response.data.data;

            },
            function (response) {
                console.info('Error');
                console.log(response);
            });

    })
    .controller('BeerDescriptionCtrl', function ($scope, $stateParams, $http) {
        var url = 'https://salty-taiga-88147.herokuapp.com/beer/';
        if(angular.isDefined($stateParams.idBeer)){
            url += $stateParams.idBeer;
        }
        var apiKey = '53bdaa14fe3d0a7db5fe60cb7c4facb9';

        var options = {
            key: apiKey
        };
        var request = {
            method: 'GET',
            url: url,
            params: options
        };

        $http(request)
            .then(
            function (response) {
                console.info('Success');
                console.log(response);
                $scope.beer = response.data.data;

            },
            function (response) {
                console.info('Error');
                console.log(response);
            });
    });
