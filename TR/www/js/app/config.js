var app = angular.module('trApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider
        .state('navigation', {
            url: '/navigation',
            templateUrl: 'partials/navigation.html',
            //controller: 'navigationController'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'partials/login.html',
            //controller: 'loginController'
        })
});