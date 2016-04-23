app.controller('mapController', function($scope, $rootScope, SharedFactory, SharedDataService){

  //private variables
  var map = null, userPosition = null;
  var speed = 50, delay = 100, curRouteIndex = 0; curIndex = -1, curRoute = [], userRoute = null, runningStopped = false;   

  function colorMaps(path, color, id) {
    //arr.forEach(function(value, index){
      //var path, color, id;
        var polygon = new google.maps.Polygon({
        paths: path,
        strokeColor: color,
        strokeOpacity: 1,
        strokeWeight: 1,
        fillColor: color,
        fillOpacity: 0.3
     });
     polygon['userId'] = id;
     polygon.setMap(map);
     google.maps.event.addListener(polygon, 'click', function(h) {
         console.log(polygon.userId);
     });

    //});
  };

  // $rootScope.$on('setNewTerritory', function(){
  //     var obj = SharedDataService.getNewTerritory();
  //     colorMaps(obj.path, obj.color, obj.userId);
  // });

  var loadMap = function(){
    var userPos = $scope.currentUser.source;
    var userData = $scope.userData;
    map = new google.maps.Map(document.getElementById('map'), {
        center: userPos,
        scrollwheel: true,
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true, // way to hide all controls
    });
    var arr = [];
    userData.forEach(function(value, index){
      colorMaps(value.routes[0].path, value.teamColor, value.id);
      // var obj = {};
      // obj.userId = value.id;
      // obj.color = value.teamColor;
      // obj.routes = value.routes;
      // arr.push(obj);
    });

    var obj = SharedDataService.getNewTerritory();
    if(obj)
      colorMaps(obj.path, obj.color, obj.userId);
  };

    var onSuccess = function(response) {
        $scope.userData = response;
        $scope.currentUser =  SharedDataService.getCurrentUser();
        loadMap();
    };

    var onError = function(response) {
        $scope.userData = response;
    };

    //if user data is not available then only call factory
    if(!$scope.userData)
      SharedFactory.getData().then(onSuccess, onError);
    // else
    //   loadMap();
});