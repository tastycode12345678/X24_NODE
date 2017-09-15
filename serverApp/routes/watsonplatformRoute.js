var watsonplatformModel = require('../model/watsonplatformModel').watsonplatformModel;

module.exports = function(app) {

	app.post('/watsonplatform', function(req, res){
		/*
				{ 
					images_files: {
						value: 'fs.createReadStream("C:\\DEV\\Einstien\\Stepup Demo\\Einstein Vision Sample Data\\Standard Model Test Data\\Food Image Model Test\\1421666878-649_a.jpg")',
				        options:{ 
				        	filename: 'C:\\DEV\\Einstien\\Stepup Demo\\Einstein Vision Sample Data\\Standard Model Test Data\\Food Image Model Test\\1421666878-649_a.jpg',
				           	contentType: null 
				        } 
				    },
				    classifier_ids: 'myfirsWatsonVRClassifier_1397351012' 
				}
		*/
		watsonplatformModel.getWatsonInfo(req.body).then(function(response){
			res.send(response);
		}, function(err){
			res.status(400);
			res.send(err);
		});
	});

};