app.controller('mapController', function($scope, SharedFactory, SharedDataService){

	//private variables
	var map = null, userPosition = null;
	var speed = 50, delay = 100, curRouteIndex = 0; curIndex = -1, curRoute = [], userRoute = null, runningStopped = false;   

    var loadMap = function(){
    	var userPos = $scope.currentUser.source;
    	map = new google.maps.Map(document.getElementById('map'), {
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
	    });

	    userRoute = new google.maps.Polyline({
	        path: [],
	        geodesic : true,
	        strokeColor: '#FF0000',
	        strokeOpacity: 1.0,
	        strokeWeight: 2,
	        editable: false,
	        map:map
	    });
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

    function colorMaps(path, color) {
	  var polygon = new google.maps.Polygon({
	    paths: path,
	    strokeColor: color,
	    strokeOpacity: 0,
	    strokeWeight: 1,
	    fillColor: color,
	    fillOpacity: 0.35
	  });
	  polygon.setMap(map);
	  google.maps.event.addListener(polygon, 'click', function(h) {
	      //console.log("Value is:::",h);   
	      //console.log(polygon); 
	  });
	};

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
                  userRoute.setPath([]); //clear the path
                  colorMaps(curUser.routes[curRouteIndex].path, "#E01B2F"); // mark the territory
                  curIndex = 0; 
                  curRouteIndex++;                
                }else{
                  setTimeout(getNextPosition, delay);
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
    	runningStopped = true;
    };
	
});