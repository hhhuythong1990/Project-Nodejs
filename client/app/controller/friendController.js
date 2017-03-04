app.controller('friendCtr', ['$scope', '$controller', '$cookieStore', '$rootScope', 'friendServ', 'requestServ',
	function($scope, $controller, $cookieStore, $rootScope, friendServ, requestServ){
	var base = $controller('baseCtr', {$scope:$scope});
	var data = {};
	refresh();
	function refresh(){
		if($cookieStore.get("tokenkey") != null){
			$rootScope.id = $cookieStore.get("tokenkey").data;
			friendServ.friendLoad($rootScope.id).success(function(result, status){
        		$scope.listFriend = result.data;
			});
		}
	}

	$scope.cancelFriend = function(userid,acceptid){
		var cancel = {
			"userid":userid,
			"acceptid":acceptid
		};
		friendServ.friendCancel(cancel).success(function(result, status){
			if(result.data === "successful"){
				refresh();
			}
		});
	}
}]);