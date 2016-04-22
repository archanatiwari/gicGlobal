app.controller('loginController', function($scope, $state, SharedFactory, SharedDataService){

	$scope.userData = null; 
	
	SharedFactory.getData().then(function(response) {
        $scope.userData = response;
    }, function(response) {
        $scope.userData = response;
    });
	
	//hard-coded login
	$scope.email = "archit@globant.com", $scope.password = "1234abcd";

    $scope.doLogin = function() {
        var userData = $scope.userData;
        for (var i = 0; i < userData.length; i++) {
            var user = userData[i];
            if (user.email == $scope.email && user.password == $scope.password) {
                SharedDataService.setCurrentUser(user);
                $state.go('home');
                break;
            } else {
                console.log('Enter correct username and password');
                // $scope.errorMsg = true;
            }
        }
    }
	
});