app.controller('landingController', function($scope, $state, SharedFactory, SharedDataService){

  //private variables
  var map = null, userPosition = null;
  // $scope.teamName = "", $scope.completedArea = null;

  $scope.getTerritoryInfo = function(userId, userClicked){
    var userData = $scope.userData, userObj;
    $scope.selctedObj = {};
    for(var i=0; i<userData.length; i++){
      if(userData[i].id == userId){
          $scope.selctedObj = userObj = userData[i];
          break;
      }
    };

    $scope.teamName = userObj.teamName;
    var totalArea = 0;
    userObj.teamMembers.forEach(function(value, index){
      totalArea += value.area;
    });
    $scope.completedArea = totalArea;
    console.log($scope.completedArea);
    $scope.last_covered_dist = userObj.teamMembers[userObj.teamMembers.length-1].area;
    if(userClicked)
      $scope.$apply();
  };

  function colorMaps(path, color, id) {
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
         //console.log(polygon.userId);
         $scope.getTerritoryInfo(polygon.userId, true);

     });

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

    $scope.getTerritoryInfo($scope.currentUser.id, false);
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


    $scope.updtSelctdTeritoty = function(){
      var obj = {};
      $scope.selctedObj; 
      obj.teamMembers = $scope.selctedObj.teamMembers;
      obj.userId = $scope.selctedObj.id;
      obj.teamName = $scope.teamName;
      obj.last_covered_dist = $scope.last_covered_dist;
      obj.completedArea = $scope.completedArea;
      SharedDataService.setSelectedTerritory(obj);

      $state.go('teamlisting');
    }

});