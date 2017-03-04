app.controller('loginCtr', ['$scope', '$controller', '$cookieStore', '$location', '$rootScope', 'userServ', 
	function($scope, $controller, $cookieStore, $location, $rootScope, userServ){
	$controller('baseCtr', {$scope: $scope});
	var data = {};
	$scope.login = function (form){
		if(form){
			userServ.login($scope.user).success(function(result, status){				
				if(result.error){
					$scope.message = result.error;
				}else{
					//if($scope.cb_remember.selected){						
						$cookieStore.put("tokenkey", result);
					//}
					$location.path("/home");
				}				
			});
		}
	}

	$scope.logout = function(){
		data.id = $cookieStore.get("tokenkey").data; 
		userServ.userLogout(data).success(function(result, status){
			console.log(result.data);
		});
		$cookieStore.remove("tokenkey");
		$location.path("/login.html");
	}

}]);