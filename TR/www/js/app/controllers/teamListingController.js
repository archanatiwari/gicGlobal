app.controller('teamListingController', function($scope, SharedDataService){
	
	var obj = SharedDataService.getSelectedTerritory();

	  $scope.teamMembers = obj.teamMembers;
	  //obj.userId = $scope.selctedObj.id;
	  $scope.teamName = obj.teamName;
	  $scope.last_covered_dist = obj.last_covered_dist;
	  $scope.completedArea = obj.completedArea;

	  //$scope.$apply();

});