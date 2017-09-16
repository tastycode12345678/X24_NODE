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
				api_key: '776ef8d8e3bdc89c17fcac7eea845cc4885dcea1',
  				version_date: "2017-09-15"
			});
			v3.classify({
				url: "https://visistors-x24.herokuapp.com/images/sangram.jpeg",
				classifier_ids: "TFVRSkill_1696153824"
			}, function(err, result){
				if (err){
					serverResponse.error = 1;
					serverResponse.response = err;
					reject(serverResponse);
				}else{
					//All is good. Print the body
					serverResponse.success = 1;
					serverResponse.response = result;
					resolve(serverResponse);					
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