var Promise = require('promise');
var requestModule = require('request');
var Base64Decode = require('base64-stream').decode;
var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
//var base64Img = require('base64-img');
var fs = require('fs');

function watsonplatformModel(){

}
watsonplatformModel.prototype.getWatsonInfo = function(userObject){
	var serverResponse = {
		'success': 0,
		'error': 0,
		'response': {}
	}
	//userObject.images_files["value"] = new Base64Decode(userObject.images_files["value"]);
	console.log("just for showing demo.......");
	return new Promise(function(resolve, reject){
		try{
			var v3 = new VisualRecognitionV3({
				api_key: '94190f7444d1dbabb97a70c0315d0223cb058edd',
  				version_date: "2017-09-16"
			});
			v3.classify({
				url: "https://visistors-x24.herokuapp.com/images/Naazneen.jpeg",
				classifier_ids: "TrustedFactorVRService_1054403198"
			}, function(err, result){
				if (err){
					serverResponse.error = 1;
					serverResponse.response = err;
					reject(serverResponse);
				}else{	
					console.log(result);
					if(result.images){
						if(result.images.length){
							if(result.images[0].classifiers){
								if(result.images[0].classifiers.length){
									if(result.images[0].classifiers[0].classes){
										serverResponse.success = 1;
										serverResponse.response = result.images[0].classifiers[0].classes[0];
										resolve(serverResponse);
									}else{	
										serverResponse.error = 1;
										serverResponse.response = result.images[0].classifiers;
										reject(serverResponse);
									}								
								}else{
									serverResponse.error = 1;
									serverResponse.response = null;
									reject(serverResponse);
								}
							}else{
								serverResponse.error = 1;
								serverResponse.response = null;
								reject(serverResponse);
							}
							serverResponse.success = 1;
							serverResponse.response = result.images[0].classifiers[0].classes[0];
							resolve(serverResponse);						
						}else{
							serverResponse.error = 1;
							serverResponse.response = null;
							reject(serverResponse);
						}
					}else{
						serverResponse.error = 1;
						serverResponse.response = null;
						reject(serverResponse);
					}			
				}
			});			
		} catch(e){
			serverResponse.error = 1;
			serverResponse.response = e;
			reject(serverResponse);
		}
	});
}
module.exports.watsonplatformModel = new watsonplatformModel();