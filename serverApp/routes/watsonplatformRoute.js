var watsonplatformModel = require('../model/watsonplatformModel').watsonplatformModel;

module.exports = function(app) {

	app.post('/watsonplatform', function(req, res){
		watsonplatformModel.getWatsonInfo(req.body).then(function(response){
			res.send(response);
		}, function(err){
			res.status(400);
			res.send(err);
		});
	});

};