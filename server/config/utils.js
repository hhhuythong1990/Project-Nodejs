module.exports = function(){
	this.STR_CONNECTDB = {
		"url":"mongodb://localhost/social_project",
		"collections":["user_tb", "article_tb", "request_tb"]
	};

	this.STR_SECRET = "pRo7ect";

	this.SENDDATA = function(code, data, token){
		switch(code){
			case 2:
				return result = {"data":data, "token":token};
				break;
			case 3:
				return result = {"data":data};
				break;
			case 4:
				return result = {"error":data};
				break;
		}
		
	};

	this.CURRENTDATE = function(){
		var date = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
  		return date;
	}

	this.URL_IMG_DEFAULT = "../public/img/";
	this.URL_STORED_IMG = "/../../client/public/img/";
	this.PERSONAL_MALE_IMG_DEFAULT = "avatar_male_def.png";
	this.PERSONAL_FEMALE_IMG_DEFAULT = "avatar_female_def.png";
	this.PAPER_IMA_DEFAULT = "paper_def.jpg";
	this.TOKEN_NEVER_EXPIRE = 900000000;
	this.TOKEN_EXPIRE = 86400;
}