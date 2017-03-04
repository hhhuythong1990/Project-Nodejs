var express = require('express');
var app = express();

//inject variables
require("./config/utils.js")();

//inject library
require("./config/library.js")(app, express);

//inject model
require("./model/user.js")();
require("./model/request.js")();
require("./model/friend.js")();
require("./model/article.js")();
require("./model/comment.js")();
//inject controllers
require("./controller/authenticationcontroller.js")();
require("./controller/usercontroller.js")();
require("./controller/articlecontroller.js")();
require("./controller/requestcontroller.js")();
require("./controller/friendcontroller.js")();
require("./controller/likecontroller.js")();
require("./controller/commentcontroller.js")();
//inject angularjs
app.use(express.static(__dirname + '/../client'));



app.listen(3000, function(){
	console.log("Server start 3000 port");
});

// app.get("/", function(req, res){
//     res.sendfile('/index.html'); // load our public/index.html file
// });
// app.get("/", function(req, res){	
//     console.log(req.cookies.thong);
// });