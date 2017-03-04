module.exports = function(){
	router.post('/comment_create', function(req, res) {
		var data = req.body;
		data.created_at = CURRENTDATE();
		createcomment = new Comment(data);
		createcomment.save(function(err, docs) {
			if(docs){
				return res.json(SENDDATA(3,"successful"));
			}				
		})
	});

	router.get('/comment_load', function(req, res) {
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
				return res.json(result);
			}		
		});
	});
}