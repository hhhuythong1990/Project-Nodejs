module.exports = function(){
	var Schema = mongoose.Schema;
	var commentSchema = Schema({
		"articleid":String,
		"userid":{type: String, ref: 'user_tb'},
		"content":String,
		"created_at":Date		
	});
	this.Comment = mongoose.model('comment_tb', commentSchema);
}