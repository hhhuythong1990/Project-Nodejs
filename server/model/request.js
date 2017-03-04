module.exports = function(){
	var Schema = mongoose.Schema;
	var requestSchema = Schema({
		"userid":{ type: String, ref: 'user_tb' },
		"requestid":String,
		"status":Boolean,
		"request_at":Date
	});
	this.Request = mongoose.model('request_tb', requestSchema);
}