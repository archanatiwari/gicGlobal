var app = angular.module('trApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider
        .state('landing', {
            url: '/landing',
            templateUrl: 'partials/landing.html',
            controller: 'landingController'
        })
        .state('teamlisting', {
            url: '/teamlisting',
            templateUrl: 'partials/teamlisting.html',
            controller: 'teamListingController'
        })
        .state('map', {
            url: '/map',
            templateUrl: 'partials/map.html',
            controller: 'mapController'
        })
        .state('navigation', {
            url: '/navigation',
            templateUrl: 'partials/navigation.html',
            controller: 'navigationController'
        })
        .state('team', {
            url: '/team',
            templateUrl: 'partials/team.html',
            controller: 'teamController'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'partials/login.html',
            controller: 'loginController'
        });
});