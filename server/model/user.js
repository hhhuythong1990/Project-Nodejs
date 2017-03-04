module.exports = function(){
	var Schema = mongoose.Schema;
	var userSchema = Schema({
		firstname: String,
		lastname: String,
		username: String,
		password: String,
		birthday: { 
			day: String,
			month: String,
			year: String
		},
		"gender" : String,
    	"created_at" : Date,
    	"personal_img" : String,
    	"pager_img" : String,
    	"joinin" : String,
    	"status":Boolean,
    	"request" : [{ type: Schema.Types.ObjectId, ref: 'request_tb' }],
    	"friend" : [{ type: Schema.Types.ObjectId, ref: 'friend_tb' }],
    	"article" : [{ type: Schema.Types.ObjectId, ref: 'article_tb' }],
    	"comment" : [{ type: Schema.Types.ObjectId, ref: 'comment_tb' }]
	});

	this.User = mongoose.model('user_tb', userSchema);
}