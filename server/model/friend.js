module.exports = function(){
	var Schema = mongoose.Schema;
	var friendSchema = Schema({
		"userid":String,
		"acceptid":{type: String, ref: 'user_tb'},
		"friend_at":Date,
	});
	this.Friend = mongoose.model('friend_tb', friendSchema);
}