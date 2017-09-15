var visitorTrackingSchema = require('../schema/visitorTrackingSchema');
var Promise = require('promise');
var CONSTANT = require('../config/constant').CONSTANT;
const crypto = require('crypto');

function VisitorTrackingModel(){

}

VisitorTrackingModel.prototype.trackVisitor = function(visitorObj){
	var serverResponse = {
		'success': 0,
		'error': 0,
		'response': {}
	}
	return new Promise(function(resolve, reject){
		try{
			visitorTrackingSchema.create(visitorObj, function(err, response){
				if(err){
					console.log(err);
					serverResponse.error = 1;
					serverResponse.response = err;
					reject(serverResponse);
				}
				else{
					serverResponse.success = 1;
					serverResponse.response = true;
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

VisitorTrackingModel.prototype.getAllVisitors = function(visitorObj){
	var serverResponse = {
		'success': 0,
		'error': 0,
		'response': {}
	}
	return new Promise(function(resolve, reject){
		try{
			visitorTrackingSchema.find({ role_id: { $ne: '56f1067c4c1108dc2926a5bd' } }, function(err, response){
				if(err){
					console.log(err);
					serverResponse.error = 1;
					serverResponse.response = err;
					reject(serverResponse);
				}
				else{
					if(response.length > 0){
						serverResponse.success = 1;
						serverResponse.response = response;
						resolve(serverResponse);
					}else{
						serverResponse.error = 1;
						serverResponse.response = {'errmsg': 'No users found.'};
						resolve(serverResponse);
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

module.exports.VisitorTrackingModel = new VisitorTrackingModel();