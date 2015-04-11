var express = require("express");

var app = express();

var allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
};

app.use(express.static(__dirname + "/build"));

app.use(allowCrossDomain);

app.listen(process.env.PORT || 8000);