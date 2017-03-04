app.factory('requestServ', ['$http', function($http){	
	return{
		requestcreate:function(data){
			return $http({
				method: "POST",
				url: "/request_create",
				type:"json",
				data: data,
				headers: { 'Content-Type': 'application/json' }
			});
		},
		requestget:function(data){
			return $http({
				method: "GET",
				url: "/request_pending?id="+data,
				type:"json",
				headers: { 'Content-Type': 'application/json' }
			});
		},
		requestcancel:function(data){
			return $http({
				method: "GET",
				url: "/request_cancel?id="+data,
				type:"json",
				headers: { 'Content-Type': 'application/json' }
			});
		},
		requestcheck:function(data){
			return $http({
				method: "GET",
				url: "/request_check?id="+data,
				type:"json",
				headers: { 'Content-Type': 'application/json' }
			});
		},
		requestviewed:function(data){
			return $http({
				method: "GET",
				url: "/request_viewed?id="+data,
				type:"json",
				headers: { 'Content-Type': 'application/json' }
			});
		},


	}
}])