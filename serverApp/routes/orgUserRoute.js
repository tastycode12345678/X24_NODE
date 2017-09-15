var OrgUserModel = require('../model/orgUserModel').OrgUserModel;
var CONSTANT = require('../config/constant').CONSTANT;

module.exports = function(app) {

	app.post('/createorguser', function(req, res){
		OrgUserModel.createOrgUser(req.body).then(function(response){
			res.send(response);
		}, function(err){
			res.status(500);
			res.send(err);
		});
	});

}