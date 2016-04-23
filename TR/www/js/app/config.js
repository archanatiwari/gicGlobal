var app = angular.module('trApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider
        .state('landing', {
            url: '/landing',
            templateUrl: 'partials/landing.html',
            controller: 'landingController'
        })
        .state('home', {
            url: '/home',
            templateUrl: 'partials/home.html',
            controller: 'homeController'
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