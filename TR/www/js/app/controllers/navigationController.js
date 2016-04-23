app.controller('navigationController', function($scope, $state, $timeout, SharedFactory, SharedDataService){

	//private variables
	var map = null, userPosition = null, tracker = null;
  var speed = 50, delay = 100, curRouteIndex = 1; curIndex = -1, curRoute = [], userRoute = null, runningStopped = false;   
  var markerImage = "img/greenMarker.png";

	var loadMap = function(){
	    var userPos = $scope.currentUser.source;
	    var userData = $scope.userData;
	    map = new google.maps.Map(document.getElementById('map-navigation'), {
	        center: userPos,
	        scrollwheel: true,
	        zoom: 17,
	        mapTypeId: google.maps.MapTypeId.ROADMAP,
	        disableDefaultUI: true, // way to hide all controls
	    });

	    //set the marker to destination
	    userPosition = new google.maps.Marker({
	        position: userPos,
	        map: map,
          icon: markerImage
	    });

	    userRoute = new google.maps.Polyline({
	        path: [],
	        geodesic : true,
	        strokeColor: '#00796B',
	        strokeOpacity: 1.0,
	        strokeWeight: 2,
	        editable: false,
	        map:map
	    });

      $scope.startRunning();
	};

	var onSuccess = function(response) {
        $scope.userData = response;
        $scope.currentUser =  SharedDataService.getCurrentUser();
        loadMap();
    };

    var onError = function(response) {
        $scope.userData = response;
    };

    SharedFactory.getData().then(onSuccess, onError);

    function getNextPosition (){
        
      if(!runningStopped){
        var curUser =  $scope.currentUser;
        var lat = userPosition.position.lat();
        var lng = userPosition.position.lng();
        var step = (speed * 1000 * delay) / 3600000; // in meters
        curIndex++;
        var dest = new google.maps.LatLng(curRoute[curIndex].lat, curRoute[curIndex].lng);

        var distance = google.maps.geometry.spherical.computeDistanceBetween(dest, userPosition.position); // in meters

        var numStep = distance / step;
        var i = 0;
        var deltaLat = (curRoute[curIndex].lat - lat) / numStep;
        var deltaLng = (curRoute[curIndex].lng - lng) / numStep;

        function moveMarker(){

          if(!runningStopped){

            lat += deltaLat;
            lng += deltaLng;
            i += step;

            if (i < distance)
            {
                //draw path
                var latlng = new google.maps.LatLng(lat, lng);
                userRoute.getPath().push(latlng);

                map.panTo(latlng);

                //move the marker to new position
                userPosition.setPosition(latlng);
                setTimeout(moveMarker, delay);
            }
            else
            {   userPosition.setPosition(dest);
                //curIndex++;
                if (curIndex == curRoute.length -1){
                  //completed the loop, reached source position
                  //userRoute.setPath([]); //clear the path
                  //colorMaps(curUser.routes[curRouteIndex].path, "#E01B2F", curUser.id); // mark the territory
                  curIndex = 0; 
                  //curRouteIndex++;                
                }else{
                  tracker = $timeout(getNextPosition, delay);
                }
            }
        }
        // else{
        //   userPosition.setPosition(dest);
        // }
      }
        moveMarker();
      }
    };


	$scope.startRunning = function(){
      runningStopped = false;
      var curUser =  $scope.currentUser;
        //curRouteIndex++;
        if(curUser.routes[curRouteIndex]){
          curRoute = curUser.routes[curRouteIndex].path;
          getNextPosition();
        }
        else{
          //no runnig track
        }
    };

    $scope.stopRunning = function(){
      $timeout.cancel(tracker);
      runningStopped = true;
      var curUser =  $scope.currentUser;
      SharedDataService.setNewTerritory(curUser.routes[curRouteIndex].path, curUser.teamColor, curUser.id);
      $state.go('landing');
    };

});