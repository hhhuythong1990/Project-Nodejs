var bodyParser = require('body-parser');
var moment = require('moment');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var async = require("async");
var multer  = require('multer');
var autoReap     = require('multer-autoreap');
var fs      = require('fs');


module.exports = function(app, express){
	app.use(bodyParser.json());
	app.use(autoReap);
	app.use(bodyParser.urlencoded({extended: true}));

	this.app = app;
	this.router = express.Router();;
	this.bodyParser = bodyParser;
	this.moment = moment;
	this.mongoose =mongoose;
	this.jwt = jwt;
	this.async = async;
	this.upload = multer({ dest: './uploads/' });
	this.fs = fs;

	this.db = mongoose.connect(STR_CONNECTDB.url, function(err) {
    	if (err) {
		    console.log('Unable to connect to the mongoDB server. Error:', err);
		}else {
		    console.log('Connection established to', STR_CONNECTDB.url);
		}
	});
}