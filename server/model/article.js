module.exports = function(){
	var Schema = mongoose.Schema;
	var articleSchema = Schema({
		"userid":{type: String, ref: 'user_tb'},
		"content":String,
		"created_at":Date,
		"count":String,
		"liked":Boolean,
		"comments":[],
		"like":[{
			"userid":String
		}]
	});
	this.Article = mongoose.model('article_tb', articleSchema);
}