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
    this.completedTerritory = null; 

    this.setCurrentUser = function(data) {
        return this.currentUser = data;
    };
    
    this.getCurrentUser = function() {
        return this.currentUser;
    };

    // this.setTerritory = function(data){
    //     if(typeof localStorage != undefined){
    //         localStorage.setItem('territoryInfo', JSON.stringify(data));
    //     }

    // };

    // this.getTerritory = function(){
    //     if( (typeof localStorage != undefined) && (localStorage.getItem('territoryInfo'))){
    //        return JSON.parse(localStorage.getItem('territoryInfo'));
    //     }
    //     else {
    //         return [];
    //     }
    // }

    this.setNewTerritory = function(path, color, id){
        this.completedTerritory = {};
        this.completedTerritory.path = path;
        this.completedTerritory.color = color;
        this.completedTerritory.userId = id;
    };

    this.getNewTerritory = function(){
        return this.completedTerritory;
    };

});