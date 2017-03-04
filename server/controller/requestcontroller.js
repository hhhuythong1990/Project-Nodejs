module.exports = function(){
	router.post('/request_create', function(req, res) {
		var data = req.body;	
		data.status = false;
		data.request_at = CURRENTDATE();
		createRequest = new Request(data);
		createRequest.save(function(err, docs) {
			if(docs != null){
				result = SENDDATA(3, "successful");
			}
			return res.json(result);
		});	
	});

	router.get('/request_pending', function(req, res) {
		var data = req.query;
		Request.find({"requestid":data.id}).populate('userid').exec(function (err, docs) {	
			if(err){
				result = SENDDATA(4, err);
				return res.json(result);
			}else{
				result = SENDDATA(3, docs);
				return res.json(result);
			}		
		});
	});

	router.get('/request_cancel', function(req, res) {
		var data = req.query;
		Request.remove({"_id":mongoose.Types.ObjectId(data.id)}, function (err, docs) {	
			if(docs != null){
				result = SENDDATA(3, "successful");
			}
			return res.json(result);				
		});
	});

	router.get('/request_check', function(req, res) {
		var data = req.query;
		Request.find({"requestid":data.id}, function (err, docs) {	
			if(docs.length != 0){
				result = SENDDATA(3, true);				
			}else{
				result = SENDDATA(3, false);
			}
			return res.json(result);
		});
	});

	app.use('/', router);
}