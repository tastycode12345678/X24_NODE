var Promise = require('promise');
var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');

function watsonplatformModel(){

}
watsonplatformModel.prototype.getWatsonInfo = function(imageUrl){
	console.log("just for showing demo.......");
	var visual_recognition = new VisualRecognitionV3({
		api_key: '94190f7444d1dbabb97a70c0315d0223cb058edd',
  		version_date: "2016-05-20"
	});
	var params = {
		url: imageUrl,
		classifier_ids: "TrustedFactorVRService_1054403198"
	};
	return new Promise(function(resolve, reject){
		try{
			visual_recognition.classify(params, function(err, result){
				if (err){
					reject(err);
				}else{	
					resolve(JSON.stringify(result, null, 2));			
				}
			});			
		} catch(e){
			reject(e);
		}
	});
}
module.exports.watsonplatformModel = new watsonplatformModel();