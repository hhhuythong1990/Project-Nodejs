app.factory('articleServ', ['$http', function($http){	
	return{
		articleCreate:function(data){
			return $http({
				method: "POST",
				url: "/article_create",
				type:"json",
				data: data,
				headers: { 'Content-Type': 'application/json' }
			});
		},
		articleLoad:function(data){
			return $http({
				method: "GET",
				url: "/article_load?id="+data,
				type:"json"
			});
		},
		articleAll:function(data){
			return $http({
				method: "GET",
				url: "/article_all?id="+data,
				type:"json"
			});
		},
		articleLoadFriend:function(data){
			return $http({
				method: "POST",
				url: "/article_load",
				type:"json",
				data: data,
				headers: { 'Content-Type': 'application/json' }
			});
		},
	}
}])