var Promise = require('promise');
var requestModule = require('request');


function watsonplatformModel(){

}

watsonplatformModel.prototype.getWatsonInfo = function(userObject){
	var serverResponse = {
		'success': 0,
		'error': 0,
		'response': {}
	}
	return new Promise(function(resolve, reject){
		try{
			requestModule({
				uri: "https://gateway-a.watsonplatform.net/visual-recognition/api/v3/classify",
				method: "POST",
				headers:{
					'postman-token': '3011924c-941c-88db-b04f-98e8d93fa900',
     				'cache-control': 'no-cache'
				},
				formData:userObject
			}, function(error, res, body) {
				if (!error && res.statusCode == 200) {
					//All is good. Print the body
					that.serverResponse.success = 1;
					that.serverResponse.response = body;
					resolve(that.serverResponse);
				}else if(error){
					that.serverResponse.error = 1;
					that.serverResponse.response = {'Error': error};
					reject(that.serverResponse);
				}else if(res.statusCode !== 200){
					that.serverResponse.error = 1;
					that.serverResponse.response = {'statusCode':res.statusCode,'body':body};
					reject(that.serverResponse);
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