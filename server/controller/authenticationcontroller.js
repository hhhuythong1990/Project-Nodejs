module.exports = function(){
	this.authenticate = function(data, secret){
    	var token = jwt.sign(data, secret, { expiresIn: 3600*24*365 });
    	return token;
  	}
}