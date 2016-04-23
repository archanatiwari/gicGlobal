app.controller('landingController', function($scope, $state, SharedFactory, SharedDataService){

  //private variables
  var map = null, userPosition = null, lastCoveredDist = 0, updatedPath, sec_polygon;
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
    $scope.completedArea = totalArea + lastCoveredDist;
    console.log($scope.completedArea);
    $scope.last_covered_dist = lastCoveredDist ? lastCoveredDist : userObj.teamMembers[userObj.teamMembers.length-1].area;
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

  function update_secColorMap(path, color, id){
    sec_polygon = new google.maps.Polygon({
          paths: path,
          strokeColor: color,
          strokeOpacity: 1,
          strokeWeight: 1,
          fillColor: color,
          fillOpacity: 0.3
        });

       sec_polygon['userId'] = id;
       sec_polygon.setMap(map);
       google.maps.event.addListener(sec_polygon, 'click', function(h) {
           //console.log(polygon.userId);
           $scope.getTerritoryInfo(sec_polygon.userId, true);

       });
      };


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
      if(index != 1)
        colorMaps(value.routes[0].path, value.teamColor, value.id);
      // var obj = {};
      // obj.userId = value.id;
      // obj.color = value.teamColor;
      // obj.routes = value.routes;
      // arr.push(obj);
      if(index == 1){
        update_secColorMap(value.routes[0].path, value.teamColor, value.id);
      }

    });

    var obj = SharedDataService.getNewTerritory();
    if(obj){
      lastCoveredDist = 60;
      colorMaps(obj.path, obj.color, obj.userId);

      sec_polygon.setMap(null);

      updatedPath = [
        {
        "lat": 12.908175,
        "lng": 77.65227
      }, {
        "lat": 12.907688,
        "lng": 77.652189
      }, {
        "lat": 12.907537,
        "lng": 77.653069
      }, {
        "lat": 12.908083,
        "lng": 77.653139
      },  {
        "lat": 12.908175,
        "lng": 77.65227
      }

      ]

      update_secColorMap(updatedPath, '#D32F2F','57171e62f2a6bf241dc6148c');

    }

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