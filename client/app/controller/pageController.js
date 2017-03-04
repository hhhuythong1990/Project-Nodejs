app.controller('pageCtr', ['$scope', '$controller', '$cookieStore', '$rootScope', '$routeParams', 'userServ', 'articleServ', 'commentServ', 'likeServ', 'friendServ', 'requestServ',
    function($scope, $controller, $cookieStore, $rootScope, $routeParams, userServ, articleServ, commentServ, likeServ, friendServ, requestServ){
    var base = $controller('baseCtr', {$scope:$scope});
	var data = {};
    refreshInfo();
    function refreshInfo(){
    	userServ.userInfo($routeParams.userId).success(function(result, status){
    		data.userid = $cookieStore.get("tokenkey").data;
            $scope.userInfo = result.data;
            data.userSearch = $routeParams.userId;
            userServ.userCheckRelation(data).success(function(relation, status){
                if($routeParams.userId === data.userid){
                    $scope.userInfo.relationship = "";
                }else{
                    if(relation.request){
                        $scope.userInfo.relationship = "request";
                    }else if(relation.friend){
                        $scope.userInfo.relationship = "friend";
                    }else if(relation.unknow){
                        $scope.userInfo.relationship = "unknow";
                    }
                }
        		
    		});
    	});
    }
    refreshAritcle();
    function refreshAritcle(){
        $rootScope.userid = $cookieStore.get("tokenkey").data;
        data.id = $routeParams.userId;
        data.userid = $rootScope.userid;
        articleServ.articleLoadFriend(data).success(function(result, status){
            $scope.listArticle = result.data;
        }); 
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

    $scope.cancelFriend = function(userid, acceptid){
        var cancel = {
            "userid":userid,
            "acceptid":acceptid
        };
        friendServ.friendCancel(cancel).success(function(result, status){
            if(result.data === "successful"){
                refreshInfo();
            }
        });
    }

    $scope.makeFriend = function (requestId){
        data.userid = $cookieStore.get("tokenkey").data;
        data.requestid = requestId;

        requestServ.requestcreate(data).success(function(result, status){
            if(result.data === "successful"){
                refreshInfo();
            }
        });
    }
}]);