app.factory('commentServ', ['$http', function($http){	
	return{
		commentCreate:function(data){
			return $http({
				method: "POST",
				url: "/comment_create",
				type:"json",
				data: data,
				headers: { 'Content-Type': 'application/json' }
			});
		}		
	}
}])