var watsonplatformModel = require('../model/watsonplatformModel').watsonplatformModel;
var fs = require('fs');

module.exports = function(app) {
	
	app.post('/watsonplatform', function(req, res){	
	
		// function to create file from base64 encoded string
		var base64_decode = function(base64str, file) {
			var bitmap = new Buffer(base64str, 'base64');
			fs.writeFileSync(file, bitmap);
			console.log('******** File created from base64 encoded string ********');
		};
	
		
		var bsString = req.body.imageFile;
		if(bsString){
			var matches = bsString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
			if(matches.length === 3){
				
				var baseUrl = req.protocol + '://' + req.get('host');
				var imageType = matches[1].replace("image/","");
				var fileDirectory = "./public/images/";
				var filePathDirectory = "/images/";
				var fileName = new Date().getTime() +"."+ imageType;
				base64_decode(matches[2], fileDirectory+fileName);				
				watsonplatformModel.getWatsonInfo(baseUrl+filePathDirectory+fileName).then(function(response){
					res.send(response);
				}, function(err){
					res.status(400);
					res.send(err);
				});
			}else{
				res.send("Invalid base64 input");
			}
		}else{
			res.send("Invalid input");
		}
		
	});

};