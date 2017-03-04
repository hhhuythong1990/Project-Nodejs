app.controller('requestCtr', ['$scope', '$controller', '$interval', '$cookieStore', '$rootScope', 'requestServ', 'friendServ',
	function($scope, $controller, $interval, $cookieStore, $rootScope, requestServ, friendServ){
	var base = $controller('baseCtr', {$scope:$scope});
	var data = {};
	
	refresh();
	function refresh(){
		if($cookieStore.get("tokenkey") != null){
			var id = $cookieStore.get("tokenkey").data;
			requestServ.requestget(id).success(function(result, status){
		    	$scope.requestUser = result.data;
		    	console.log($scope.requestUser);
			});			
		}		
	}

	$scope.cancelRequest = function(idRequest){
		requestServ.requestcancel(idRequest).success(function(result, status){
			if(result.data === "successful"){
				refresh();
			}
		});
	}
	
	$scope.acceptRequest = function (idRequest, userid, acceptid){
        data.userid = userid;
        data.acceptid = acceptid;
		friendServ.friendCreate(data).success(function(result, status){
		});
		requestServ.requestcancel(idRequest).success(function(result, status){
		});
		refresh();
	}
	
	$interval(function(){
		if($cookieStore.get("tokenkey")){		
			var id = $cookieStore.get("tokenkey").data;
			requestServ.requestcheck(id).success(function(result, status){
	        	if(result.data == true){	        		
	        		$rootScope.hasRequest = true;
	        	}else{
	        		$rootScope.hasRequest = false;
	        	}
			});
		}
	},5000);
	
	$scope.loadRequest = function(){
		var id = $cookieStore.get("tokenkey").data;
		requestServ.requestget(id).success(function(result, status){
        	$scope.requestUser = result.data;
		});
		requestServ.requestviewed(id).success(function(result, status){});
	}
	
	$scope.makeFriend = function (requestId){
		var id = $cookieStore.get("tokenkey").data;
		data.userid = id;
		data.requestid = requestId;
		requestServ.requestcreate(data).success(function(result, status){
        	console.log(result);
		});
	}
}]);
