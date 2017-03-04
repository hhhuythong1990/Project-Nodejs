module.exports = function(){
	router.post('/friend_create', function(req, res) {
		var data = req.body;
		
		async.parallel({
			saveRequestUser: function(callback) {
		        saveAcceptUser(data, callback);
		    },
			saveAcceptUser: function(callback) {
		        saveRequestUser(data, callback);
		    }
		},
	    function(err, results) {
	    	if(err){
	    		return res.json(SENDDATA(4,"Have a error"));
	    	} else{
	    		return res.json(SENDDATA(3,"successful"));
	    	}
					 
		});		
	});

	router.get('/friend_load', function(req, res) {
		var data = req.query;
		Friend.find({"userid":data.id}).populate('acceptid').exec(function (err, docs) {	
			if(err){
				result = SENDDATA(4, err);
				return res.json(result);
			}else{
				result = SENDDATA(3, docs);
				return res.json(result);
			}		
		});
	});

	router.post('/friend_cancel', function(req, res) {
		var data = req.body;
		async.parallel({
			deleteRequestUser: function(callback) {
		        deleteFriend(data.userid, data.acceptid, callback);
		    },
			daleteAcceptUser: function(callback) {
		        deleteFriend(data.acceptid, data.userid, callback);
		    }
		},
	    function(err, results) {
	    	if(err){
	    		return res.json(SENDDATA(4,"Have a error"));
	    	} else{
	    		return res.json(SENDDATA(3,"successful"));
	    	}
					 
		});
	});

	router.get('/friend_online', function(req, res) {
		var data = req.query;
		Friend.find({"userid":data.id}).populate('acceptid').exec(function (err, docs) {
			var online ={};
			docs.forEach(function (item , index){
				var key = "online";
	            if (typeof(online[key]) == "undefined"){
	            	online[key] = [];
	            	var json = {};
	            	if(item.acceptid.status){	                	
		            	json.firstname = item.acceptid.firstname;
		            	json.lastname = item.acceptid.lastname;
		            	json.personal_img = item.acceptid.personal_img;
		                json.userid = item.acceptid._id;
		                json.username = item.acceptid.username;
		                online[key].push(json);
	                }
	            }else{
	            	var json = {};
	            	if(item.acceptid.status){
		            	json.firstname = item.acceptid.firstname;
		            	json.lastname = item.acceptid.lastname;
		            	json.personal_img = item.acceptid.personal_img;
		                json.userid = item.acceptid._id;
		                json.username = item.acceptid.username;
		                online[key].push(json);
		            }
	            }
			});			
            return res.json(SENDDATA(3, online));			
		});	
	});

}

function saveRequestUser(data, callback){
	requestFriend = new Friend({
		"userid":data.acceptid,
		"acceptid":data.userid,
		"friend_at":CURRENTDATE()
	});
	requestFriend.save(function(err, docs) {
		callback(err, docs);
	});
}

function saveAcceptUser(data, callback){
	acceptFriend = new Friend({
		"userid":data.userid,
		"acceptid":data.acceptid,
		"friend_at":CURRENTDATE()
	});
	acceptFriend.save(function(err, docs) {
		callback(err, docs);
	});	
}

function deleteFriend(userid, acceptid, callback){
	Friend.remove({$and:[{"userid":userid},{"acceptid":acceptid}]}, function (err, docs) {	
		callback(err, docs);	
	});
}

