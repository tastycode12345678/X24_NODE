var VisitorTrackingModel = require('../model/visitorTrackingModel').VisitorTrackingModel;
var CONSTANT = require('../config/constant').CONSTANT;

module.exports = function(app) {

	app.post('/trackVisitor', function(req, res){
		VisitorTrackingModel.trackVisitor(req.body).then(function(response){
			res.send(response);
		}, function(err){
			res.status(500);
			res.send(err);
		});
	});

}