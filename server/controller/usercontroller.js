module.exports = function(){
	var result;
	router.post('/user_login', function(req, res) {
		var data = req.body;
		User.findOne({"username":data.username}, function(err, docs) {
  			if(err) { 
  				return res.json(err);;
  			}else {
  				if(docs == null){
  					result = SENDDATA(4, "Username is invalid. Please check username again!");
  				}else if(docs.username == data.username){
  					if(docs.password == data.password){
  						var token = authenticate(docs, STR_SECRET);
  						result = SENDDATA(2, docs._id, token);
  						User.findOneAndUpdate({"_id":mongoose.Types.ObjectId(docs._id)}, {$set:{"status":true}},function(){});  						
  					}else{
  						result = SENDDATA(4, "Password is invalid. Please check password again!");
  					}
  				}	
    			return res.json(result);
  			};
		}); 		
	});

	router.post('/user_register', function(req, res) {
		var data = req.body;

		User.findOne({"username":data.username}, function(err, docs){
			if(docs != null){
				result = SENDDATA(4, "Username has already existed");
				return res.json(result);
			}else{
				data.created_at = CURRENTDATE();
				if(data.gender === "female"){
					data.personal_img = URL_IMG_DEFAULT + PERSONAL_FEMALE_IMG_DEFAULT;
				}else{
					data.personal_img = URL_IMG_DEFAULT + PERSONAL_MALE_IMG_DEFAULT;
				}				
				data.pager_img = URL_IMG_DEFAULT + PAPER_IMA_DEFAULT;
				data.joinin = "1";
				var newUser = new User(data);
				newUser.save(function(err, docs) {
					if(err){
						result = SENDDATA(4, err);
						return res.json(result);
					}else{
						var token = authenticate(docs, STR_SECRET);
						result = SENDDATA(2, docs._id, token);
						return res.json(result);
					}
				});				
			}			
		});	
	});

	router.get('/user_info', function(req, res) {
		var data = req.query;
		User.findOne({"_id":mongoose.Types.ObjectId(data.id)}, function(err, docs) {
			if(docs != null){
				docs.joinin = moment(docs.created_at).toNow();
				result = SENDDATA(3, docs);
			}
			return res.json(result);
		});	
	});

	router.post('/user_search', function(req, res) {
		var data = req.body;
		User.find({$and:[{"username":{$regex:data.username}},{"_id":{$ne:mongoose.Types.ObjectId(data.id)}}]}, function(err, docs) {
			if(docs != null){
				result = SENDDATA(3, docs);
			}
			return res.json(result);
		});	
	});

	router.post('/user_logout', function(req, res) {
		var data = req.body;
		User.findOneAndUpdate({"_id":mongoose.Types.ObjectId(data.id)}, {$set:{"status":false}},function(err, docs){
			if(docs != null){
				result = SENDDATA(3, "succesfull");
			}
			return res.json(result);
		});	
	});

	router.post('/user_updateinfo', function(req, res) {
		var data = req.body;
		User.findOneAndUpdate({"_id": mongoose.Types.ObjectId(data._id)}, {$set:{
			"firstname": data.firstname,
			"lastname": data.lastname,
			"username": data.username,
			"password": data.password,
			"gender" : data.gender,
			"birthday" : {
		        "day" : data.birthday.day,
		        "month" : data.birthday.month,
		        "year" : data.birthday.year
		    }

		}}, {upsert: true}, function(err, doc){
		    if(doc != null){
				result = SENDDATA(3, "succesfull");
			}
			return res.json(result);
		});
	});

	router.post('/user_updateavatar', function(req, res) {
		var data = req.body;
		var img = URL_IMG_DEFAULT + data.nameAvatar;
		User.findOneAndUpdate({"_id":mongoose.Types.ObjectId(data.id)}, {$set:{"personal_img":img}},function(err, docs){
			if(docs != null){
				result = SENDDATA(3, "succesfull");
			}
			return res.json(result);
		});
	});

	router.post('/userupload', upload.array('image'), function(req, res){
		if (req.files[0] != null){
			var img = req.files[0];
			fs.readFile(img.path, function (err, data) {
				if (err) res.json("error");
				var newPath = __dirname + URL_STORED_IMG + req.files[0].originalname;
				fs.writeFile(newPath, data, function (err) {
					if (err) return SENDDATA(4, err);
					return SENDDATA(3, "succesfull");
				});
			});
		}
	});

	router.post('/user_checkrelation', function(req, res){
		var data = req.body;
		async.parallel({
			friend: function(callback) {
		        checkFriend(data, callback);
		    },
			request: function(callback) {
		        checkRequest(data, callback);
		    }
		},
	    function(err, results) {
	    	if(results.friend){
	    		result = {"friend":true};
	    	}else if (results.request){
	    		result = {"request":true};
	    	}else if (!results.friend && !results.request){
	    		result = {"unknow":true};
	    	}
	    	return res.json(result);					 
		});
	});


	app.use('/', router);	
}

function checkFriend(data, callback){
	var friend;
	Friend.find( 
		{$or:[
			{$and:[{"userid":data.userid},{"acceptid":data.userSearch}]}, 
			{$and:[{"userid":data.userSearch},{"acceptid":data.userid}]}
		]} ,
		function(err, docs){
			if(docs.length > 0){
				friend = true;
			}else{
				friend = false;
			}
			callback(err, friend);
		}
	);
}

function checkRequest(data, callback){
	var request;
	Request.find( 	
		{$or:[
			{$and:[{"userid":data.userid},{"requestid":data.userSearch}]}, 
			{$and:[{"userid":data.userSearch},{"requestid":data.userid}]}
		]} ,
		function(err, docs){
			if(docs.length > 0){
				request = true;
			}else{
				request = false;
			}
			callback(err, request);
		}
	);
}