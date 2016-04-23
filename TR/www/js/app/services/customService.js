app.factory('SharedFactory', function($http) {

    var getData = function() {
        return $http.get('data/data.json').then(function(response) {
            return response.data.data;
        }, function(response) {
            console.log('error in fetching' + response.status);
            return [];
        });
    };

    return {
        getData: getData
    };
});


app.service('SharedDataService', function($http) {

    this.currentUser = null;    

    this.setCurrentUser = function(data) {
        return this.currentUser = data;
    };
    
    this.getCurrentUser = function() {
        return this.currentUser;
    };

});