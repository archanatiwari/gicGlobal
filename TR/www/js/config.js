var app = angular.module('trApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider
        .state('location', {
            url: '/location',
            templateUrl: 'partials/location.html',
            //controller: 'homeController'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'login.html',
            //controller: 'loginController'
        })
});