app.factory('likeServ', ['$http', function($http){	
	return{
		liekArticle:function(data){
			return $http({
				method: "POST",
				url: "/like_article",
				type:"json",
				data: data,
				headers: { 'Content-Type': 'application/json' }
			});
		},
		unliekArticle:function(data){
			return $http({
				method: "POST",
				url: "/unlike_article",
				type:"json",
				data: data,
				headers: { 'Content-Type': 'application/json' }
			});
		},
		// checkLike:function(data){
		// 	return $http({
		// 		method: "POST",
		// 		url: "/check_like",
		// 		type:"json",
		// 		data: data,
		// 		headers: { 'Content-Type': 'application/json' }
		// 	});
		// }
	}
}])