angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $http) {

        $ionicModal.fromTemplateUrl('templates/search.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.openModal = function () {
            console.log('before');
            $scope.modal.show();
            console.log('after');
        };

        $scope.closeModal = function () {
            $scope.modal.hide();
        };

        $http({
            method: 'GET',
            key: '53bdaa14fe3d0a7db5fe60cb7c4facb9',
            url: 'https://salty-taiga-88147.herokuapp.com/styles'
        })
            .then(
            function(response){
                console.log(response);
                $scope.styles = response.data.data;
            },
            function(response){
                console.info('Error getting Beer Style');
            }
        )

    })

    .controller('BeersListCtrl', function ($scope, $stateParams, $http) {
        //That's mine! =D Change it later
        var apiKey = '53bdaa14fe3d0a7db5fe60cb7c4facb9';
        var url = 'https://salty-taiga-88147.herokuapp.com/beers';
        var options = {
            key: apiKey,
            abv: '10'
        };

        //Initializing Filter Object
        $scope.filter = {};

        $http({
            method: 'GET',
            url: url,
            params: options
        })
            .then(
            function (response) {
                $scope.beers = response.data.data;
            },
            function (response) {
                console.info('Error getting Beer list');
            });

        $scope.searchBeer = function(filter){

            $scope.closeModal();
        };

        function createOptions(filter){
            var options = {
                key: apiKey
            };
            if(angular.isString(filter.name)){

            }
        }



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
                $scope.beer = response.data.data;

            },
            function (response) {
                console.info('Error getting Beer Description');
            });
    });
