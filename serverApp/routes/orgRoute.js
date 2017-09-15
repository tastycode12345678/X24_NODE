var OrgModel = require('../model/orgModel').OrgModel;
var CONSTANT = require('../config/constant').CONSTANT;

module.exports = function(app) {

	app.post('/createorg', function(req, res){
		OrgModel.createOrg(req.body).then(function(response){
			res.send(response);
		}, function(err){
			res.status(500);
			res.send(err);
		});
	});

}