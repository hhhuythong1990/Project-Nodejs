app.controller('homeCtr', ['$scope', '$timeout', '$interval', '$window', '$controller', '$rootScope', '$cookieStore', 'userServ', 'articleServ', 'likeServ', 'friendServ', 'commentServ',
	function($scope, $timeout, $interval, $window, $controller, $rootScope, $cookieStore, userServ, articleServ, likeServ, friendServ, commentServ){
	var base = $controller('baseCtr', {$scope:$scope});
	var data = {};	
	var comment;
	
	refresh();
	function refresh(){
		if($cookieStore.get("tokenkey") != null){
			id = $cookieStore.get("tokenkey").data;
			articleServ.articleAll(id).success(function(result, status){
				$scope.listArticle = result.data;
				console.log(result.data);
			});	
		}
	}  
    $scope.clickLike =  function(status, userid, articleid){
    	switch(status){
    		case 1:
    			unliekArticle(userid, articleid);
    			refresh();
    		break;
    		case 0:
    			likeArticle(userid, articleid);
    			refresh();
    		break;
    	}

    }
  	function likeArticle(userid, articleid){    
    	data.userid = userid;
    	data.articleid = articleid;
		likeServ.liekArticle(data).success(function(result, status){		
			console.log(result);	
		});
	}

	function unliekArticle(userid, articleid){    	
    	data.userid = userid;
    	data.articleid = articleid;
		likeServ.unliekArticle(data).success(function(result, status){	
			console.log(result);		
		});
	}

	$scope.addComment = function(userid, articleid, comment){		
		data.userid = userid;
    	data.articleid = articleid;		
		data.content = comment;
		commentServ.commentCreate(data).success(function(result, status){
			if(result.data === "successful"){
  				$scope.comment = "";
  				refresh();
  			}  			
		});		
	}

    $scope.createActicle = function (userid){
		if($scope.article != null){
			data.userid = userid;
			data.content = $scope.article.content;		
			articleServ.articleCreate(data).success(function(result, status){
  				if(result.data === "successful"){
  					$scope.article.content = "";
  				}
			});
			refresh();
		}
			
	}

	if($cookieStore.get("tokenkey") != null){
		$rootScope.id = $cookieStore.get("tokenkey").data;
	    userServ.userInfo($rootScope.id).success(function(result, status){
	    	$scope.userInfo = result.data;
		});
		friendServ.friendOnline($rootScope.id).success(function(result, status){        	      		
	    	$scope.friendOnlines = result.data.online;
		});
	}

    $interval(function(){		
		if($cookieStore.get("tokenkey") != null){
			var id = $cookieStore.get("tokenkey").data;
			friendServ.friendOnline(id).success(function(result, status){        	      		
	        	$scope.friendOnlines = result.data.online;    	
			});
		}			
	},10000);
}]);

app.filter('PassToNow', ['moment', function (moment) {
    return function (input) {
        return moment(input).fromNow();
	};
}]);