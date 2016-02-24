angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $http, $rootScope) {

        var apiKey = '53bdaa14fe3d0a7db5fe60cb7c4facb9';
        var url = 'https://salty-taiga-88147.herokuapp.com/beers';
        $scope.filter = {};

        $ionicModal.fromTemplateUrl('templates/search.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.openModal = function () {
            $scope.clearFilters();
            $scope.modal.show();
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
                $scope.styles = response.data.data;
            },
            function(response){
                console.info('Error getting Beer Style');
            }
        );

        $http({
            method: 'GET',
            key: '53bdaa14fe3d0a7db5fe60cb7c4facb9',
            url: 'https://salty-taiga-88147.herokuapp.com/glassware'
        })
            .then(
            function(response){
                $scope.glassware = response.data.data;
            },
            function(response){
                console.info('Error getting Beer Style');
            }
        );

        function createOptions(filter){
            var options = {
                key: apiKey
            };
            if(angular.isString(filter.name)){options['name'] = filter.name}
            if(angular.isDefined(filter.abv)){options['abv'] = filter.abv}
            if(angular.isDefined(filter.ibu)){options['ibu'] = filter.ibu}
            if(angular.isDefined(filter.style)){options['styleId'] = filter.style.id}
            if(angular.isDefined(filter.glass)){options['glasswareId'] = filter.glass.id}

            return options;
        }

        var beerRequest = {
            method: 'GET',
            url: url
        };


        $scope.searchBeer = function(filter){
            var options = createOptions(filter);
            beerRequest['params'] = options;
            $http(beerRequest).then(
                function(response){
                    $rootScope.beers = response.data.data;
                },
                function(response){

                }
            );
            $scope.closeModal();
        };

        $scope.clearFilters = function(){
            $scope.filter = {};
        }


    })

    .controller('BeersListCtrl', function ($scope, $stateParams, $http, $rootScope) {
        $scope.beers = [];
        $rootScope.$watch('beers', function (newValue, oldValue) {
            if (newValue) {
                console.log(newValue);
                $scope.beers = $rootScope.beers;
            }
        });

        //That's mine! =D Change it later
        //var apiKey = '53bdaa14fe3d0a7db5fe60cb7c4facb9';
        //var url = 'https://salty-taiga-88147.herokuapp.com/beers';
        //var options = {
        //    key: apiKey,
        //    abv: '10'
        //};
        //
        ////Initializing Filter Object
        //$scope.filter = {};
        //
        //$http({
        //    method: 'GET',
        //    url: url,
        //    params: options
        //})
        //    .then(
        //    function (response) {
        //        $scope.beers = response.data.data;
        //    },
        //    function (response) {
        //        console.info('Error getting Beer list');
        //    });






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
