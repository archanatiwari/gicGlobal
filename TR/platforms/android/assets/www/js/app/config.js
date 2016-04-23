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
        .state('notification', {
            url: '/notification',
            templateUrl: 'partials/notification.html',
            controller: 'notificationController'
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
        })
        .state('leaderboard', {
            url: '/leaderboard',
            templateUrl: 'partials/leaderboard.html',
            controller: 'leaderboardController'
        });
});

// app.run(function($rootScope){
//  $rootScope.$on('$stateChangeSuccess', 
//          function(event, toState, toParams, fromState, fromParams){ 
//              if(fromState.name == "navigation" && toState.name == "map"){
//                 //$rootScope.$broadcast('setNewTerritory');
//              }
//          });
// });
