var bodyParser = require('body-parser');
var session	   = require('express-session');

module.exports = function(express, app, config) {
	app.use(session({secret: 'x24spartans',saveUninitialized: true,resave: true}));
	app.set('views', config.rootPath + '/server/views');
	app.set('view engine', 'jade');


	var allowCrossDomain = function(req, res, next) {
	    res.header('Access-Control-Allow-Origin', '*');
	    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	    res.header('Access-Control-Allow-Headers', 'Content-Type');
	    next();
	};
	app.use(express.static(config.rootPath + '/public'));
	app.use(express.static(config.rootPath + '/bower_components'));
	app.use('/bower_components',  express.static(config.rootPath + '/bower_components'));
	app.use('/uploads',  express.static(config.rootPath + '/uploads'));
	app.use(bodyParser.json());
	app.use(allowCrossDomain);
	app.use(bodyParser.urlencoded({
		extended: true
	}));
}
