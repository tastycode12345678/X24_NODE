var restful = require('node-restful');
var mongoose = restful.mongoose;

module.exports = function(dbUrl) {
	mongoose.connect(dbUrl);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'Some connection error occured....'));
	db.once('open', function callback() {
		console.log('Successfully connected to database.');
	});
}

