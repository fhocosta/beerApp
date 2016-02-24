angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $http, $rootScope, $ionicScrollDelegate) {

        var apiKey = '53bdaa14fe3d0a7db5fe60cb7c4facb9';
        var url = 'https://salty-taiga-88147.herokuapp.com/beers';
        $scope.noMorePagesAvailable = false;
        $scope.morePagesAvailable = false;
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
                    $ionicScrollDelegate.scrollTop();
                    $scope.createNextPageRequest(response);
                    $rootScope.beers = response.data.data;
                },
                function(response){

                }
            );
            $scope.closeModal();
        };

        $scope.loadNextPage = function(){
            $http($scope.nextPageRequest)
                .then(
                function(response){
                    $scope.createNextPageRequest(response);
                    $rootScope.beers = $rootScope.beers.concat(response.data.data);
                },
                function(response){

                }
            )
        };

        $scope.createNextPageRequest = function(response){
            if ( response.data.currentPage < response.data.numberOfPages ) {
                $scope.morePagesAvailable = true;
                if (angular.isDefined(response.config.params)) {
                    if (angular.isDefined(response.config.params.p)) {
                        response.config.params.p = response.config.params.p + 1;
                    } else {
                        response.config.params['p'] = response.data.currentPage + 1;
                    }
                }

                $scope.nextPageRequest = {
                    method: 'GET',
                    url: url,
                    params: response.config.params
                }
            }else{
                $scope.noMorePagesAvailable = true;
            }
        };

        $scope.clearFilters = function(){
            $scope.filter = {};
        }


    })

    .controller('BeersListCtrl', function ($scope, $stateParams, $http, $rootScope, $ionicScrollDelegate) {
        $scope.beers = [];
        $rootScope.$watch('beers', function (newValue, oldValue) {
            if (newValue) {
                $scope.beers = $rootScope.beers;
            }
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
                console.log(response);
                $scope.beer = response.data.data;
            },
            function (response) {
                console.info('Error getting Beer Description');
            });
    });
