app.factory('friendServ', ['$http', function($http){	
	return{
		friendCreate:function(data){
			return $http({
				method: "POST",
				url: "/friend_create",
				type:"json",
				data: data,
				headers: { 'Content-Type': 'application/json' }
			});
		},
		friendLoad:function(data){
			return $http({
				method: "GET",
				url: "/friend_load?id="+data,
				type:"json"
			});
		},
		friendCancel:function(data){
			return $http({
				method: "POST",
				url: "/friend_cancel",
				type:"json",
				data: data,
				headers: { 'Content-Type': 'application/json' }
			});
		},
		friendOnline:function(data){
			return $http({
				method: "GET",
				url: "/friend_online?id="+data,
				type:"json"
			});
		}
	}
}])