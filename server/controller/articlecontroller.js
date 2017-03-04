module.exports = function(){
	router.post('/article_create', function(req, res) {
		var data = req.body;
		data.created_at = CURRENTDATE();
		createArticle = new Article(data);
		createArticle.save(function(err, docs) {
			if(docs){
				return res.json(SENDDATA(3,"successful"));
			}				
		})
	});

	router.post('/article_load', function(req, res) {
		var data = req.body;
		async.parallel({
			comment: function(callback) {
		        loadComment(callback);
		    },
			article: function(callback) {
		        loadAritcleById(data, callback);
		    }
		},
	    function(err, results) {
	    	if(err){
	    		return res.json(SENDDATA(4,"Have a error"));
	    	} else {
	    		var article = returnValue(results.article, results.comment, data.userid);
	    		return res.json(SENDDATA(3,article));
	    	}
					 
		});	
	});

	router.get('/article_load', function(req, res) {
		var data = req.query;
		async.parallel({
			comment: function(callback) {
		        loadComment(callback);
		    },
			article: function(callback) {
		        loadAritcleById(data, callback);
		    }
		},
	    function(err, results) {
	    	if(err){
	    		return res.json(SENDDATA(4,"Have a error"));
	    	} else {
	    		var article = returnValue(results.article, results.comment, data.id);
	    		return res.json(SENDDATA(3,article));
	    	}
					 
		});	
	});

	router.get('/article_all', function(req, res) {
		var data = req.query;
		async.parallel({
			comment: function(callback) {
		        loadComment(callback);
		    },
			article: function(callback) {
		        loadAritcleAll(callback);
		    }
		},
	    function(err, results) {
	    	if(err){
	    		return res.json(SENDDATA(4,"Have a error"));
	    	} else {
	    		var article = returnValue(results.article, results.comment, data.id);
	    		console.log(article);
				return res.json(SENDDATA(3,article));
	    	}
					 
		});		
	});

	app.use('/', router);
}

function returnValue(listArticle, listComment, idLike){
	for (i = 0; i < listArticle.length; i++) {
		listArticle[i].count = listArticle[i].like.length;
		listArticle[i].comments = listComment[listArticle[i]._id];
		for (j = 0; j < listArticle[i].like.length; j++) {
			if(listArticle[i].like[j].userid == idLike){
				listArticle[i].liked = true;
			}
		}	        			        		
	}
	return listArticle;
}

function loadAritcleById(data, callback){	
	Article.find({"userid":data.id}).populate('userid').sort({created_at: 'desc'}).exec(function (err, docs) {
		if(docs){
			callback(err, docs);
		}					
	});
}

function loadAritcleAll(callback){
	Article.find().populate('userid').sort({created_at: 'desc'}).exec(function (err, docs) {
		if(docs){
			callback(err, docs);
		}					
	});
}

function loadComment(callback){
	Comment.find().populate('userid').exec(function (err, docs) {			
		if(err){
			result = SENDDATA(4, err);
			return res.json(result);
		}else{
			var data ={};
			docs.forEach(function (item , index){
				var key = item['articleid'];
                if (typeof(data[key]) == "undefined"){
                	data[key] = [];
                	var json = {};	                	
                	json.firstname = item.userid.firstname;
                	json.lastname = item.userid.lastname;
                	json.username = item.userid.username;
                	json.id = item.userid._id;
                	json.personal_img = item.userid.personal_img;
                	json.created_at = item.created_at;
                	json.content = item.content;
                    data[key].push(json);
                }else{
                	var json = {};
                	json.firstname = item.userid.firstname;
                	json.lastname = item.userid.lastname;
                	json.username = item.userid.username;
                	json.id = item.userid._id;
                	json.personal_img = item.userid.personal_img;
                	json.created_at = item.created_at;
                	json.content = item.content;
                    data[key].push(json);
                }
			});
			result = SENDDATA(3, data);
			callback(err, data);
		}		
	});
}