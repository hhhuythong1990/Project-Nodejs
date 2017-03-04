app.controller('searchCtr', ['$scope', '$controller', '$rootScope', '$controller', '$location', 'userServ', '$cookieStore',
	function($scope, $controller, $rootScope, $controller, $location, userServ, $cookieStore){
		var base = $controller('baseCtr', {$scope:$scope});
		var data = {};
		angular.element(document).ready(function () {
			$scope.searchFriend = function () {	
				$location.path("/search");
				data.username = $scope.search.username;
				data.id = $cookieStore.get("tokenkey").data;
				userServ.userSearch(data).success(function(result, status){  					
					if(result.data.length != 0){
						$rootScope.resultSearch = result.data;
					}else{
						$rootScope.message = "User not found";
						console.log($rootScope.message);
					}
				});
			}
		});
	}
]);