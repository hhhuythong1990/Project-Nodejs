app.factory('userServ', ['$http', function($http){
	
	return{
		login:function(data){
			return $http({
				method: "POST",
				url: "/user_login",
				type:"json",
				data: data,
				headers: { 'Content-Type': 'application/json' }
			});
		},
		register:function(data){
			return $http({
				method: "POST",
				url: "/user_register",
				type:"json",
				data: data,
				headers: { 'Content-Type': 'application/json' }
			});
		},
		userInfo:function(data){
			return $http({
				method: "GET",
				url: "/user_info?id="+data,
				type:"json"
			});
		},
		userSearch:function(data){
			return $http({
				method: "POST",
				url: "/user_search",
				type:"json",
				data: data,
				headers: { 'Content-Type': 'application/json' }
			});
		},
		userLogout:function(data){
			return $http({
				method: "POST",
				url: "/user_logout",
				type:"json",
				data: data,
				headers: { 'Content-Type': 'application/json' }
			});
		},
		userUpdateInfo:function(data){
			return $http({
				method: "POST",
				url: "/user_updateinfo",
				type:"json",
				data: data,
				headers: { 'Content-Type': 'application/json' }
			});
		},
		userUpdateAvatar:function(data){
			return $http({
				method: "POST",
				url: "/user_updateavatar",
				type:"json",
				data: data,
				headers: { 'Content-Type': 'application/json' }
			});
		},
		userCheckRelation:function(data){
			return $http({
				method: "POST",
				url: "/user_checkrelation",
				type:"json",
				data: data,
				headers: { 'Content-Type': 'application/json' }
			});
		}
	}
}])