module.exports = function(){
	var result;

	router.post('/unlike_article', function(req, res) {
		var data = req.body;
		userid = {"userid":data.userid};
		Article.findOneAndUpdate({"_id": data.articleid},{$pull: {like: userid}},function(err, model) {
			return res.json(err);
    	});
	});

	router.post('/like_article', function(req, res) {
		var data = req.body;
		userid = {"userid":data.userid};

		Article.findOneAndUpdate({"_id": data.articleid},{$push: {like: userid}},{safe: true, upsert: true},function(err, model) {
			return res.json(err);
    	});
	});

	app.use('/', router);
}