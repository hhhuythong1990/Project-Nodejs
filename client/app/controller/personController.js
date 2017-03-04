app.controller('personCtr', ['$scope', '$controller', '$rootScope', '$cookieStore', 'userServ', 'articleServ', 'commentServ', 'likeServ',
	function($scope, $controller, $rootScope, $cookieStore, userServ, articleServ, commentServ, likeServ){
	var base = $controller('baseCtr', {$scope:$scope});
	var comment;
	var data = {};
	if($cookieStore.get("tokenkey") != null){
		$rootScope.id = $cookieStore.get("tokenkey").data;
        userServ.userInfo($rootScope.id).success(function(result, status){
        	$scope.userInfo = result.data;
		});
	}
	// $rootScope.postComment;
    refreshAritcle();
    function refreshAritcle(){
        if($cookieStore.get("tokenkey") != null){
            id = $cookieStore.get("tokenkey").data;
            articleServ.articleLoad(id).success(function(result, status){
                $scope.listArticle = result.data;
            }); 
        }
    }

    $scope.clickLike =  function(status, userid, articleid){
        switch(status){
            case 1:
                unliekArticle(userid, articleid);
                refreshAritcle();
            break;
            case 0:
                likeArticle(userid, articleid);
                refreshAritcle();
            break;
        }
    }
    function likeArticle(userid, articleid){    
        data.userid = userid;
        data.articleid = articleid;
        likeServ.liekArticle(data).success(function(result, status){            
        });
    }

    function unliekArticle(userid, articleid){      
        data.userid = userid;
        data.articleid = articleid;
        likeServ.unliekArticle(data).success(function(result, status){          
        });
    }
    $scope.comment;
    $scope.addComment = function(userid, articleid, comment){
        data.userid = userid;
        data.articleid = articleid;     
        data.content = comment;
        commentServ.commentCreate(data).success(function(result, status){
            if(result.data === "successful"){
                $scope.comment = "";
                refreshAritcle();
            }           
        });     
    }
}]);
