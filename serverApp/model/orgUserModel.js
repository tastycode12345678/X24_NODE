var orgUserSchema = require('../schema/orgUserSchema');
var Promise = require('promise');
var CONSTANT = require('../config/constant').CONSTANT;
const crypto = require('crypto');

function OrgUserModel(){

}

OrgUserModel.prototype.createOrgUser = function(orgObject){
	var serverResponse = {
		'success': 0,
		'error': 0,
		'response': {}
	}
	return new Promise(function(resolve, reject){
		try{
			orgUserSchema.create(orgObject, function(err, response){
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

module.exports.OrgUserModel = new OrgUserModel();