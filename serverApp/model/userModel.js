var orgUserSchema = require('../schema/orgUserSchema');
var userSchema = require('../schema/userSchema');
var Promise = require('promise');
var CONSTANT = require('../config/constant').CONSTANT;
const crypto = require('crypto');

function UserModel(){

}

UserModel.prototype.createUser = function(userObject){
	var serverResponse = {
		'success': 0,
		'error': 0,
		'response': {}
	}
	return new Promise(function(resolve, reject){
		try{
			userSchema.create(userObject, function(err, response){
				if(err){
					console.log(err);
					serverResponse.error = 1;
					serverResponse.response = err;
					reject(serverResponse);
				}
				else{
					serverResponse.success = 1;
					serverResponse.response = { _id: response._id };
					resolve(serverResponse);
				}
			});
		} catch(e){
			serverResponse.error = 1;
			serverResponse.response = e;
			reject(serverResponse);
		}
	});
};

UserModel.prototype.validateUser = function(userObject){
	var serverResponse = {
		'success': 0,
		'error': 0,
		'response': {}
	}
	return new Promise(function(resolve, reject){
		try{
			console.log(userObject);

			if(userObject.user_name.split('.')[1] === "com" ) {
				userSchema.findOne({'user_name': userObject.user_name, 'password': userObject.password}, {}, function(err, response){
					console.log("err ",err);
					if(err){
						console.log(err);
						serverResponse.error = 1;
						serverResponse.response = err;
						reject(serverResponse);
					}
					else{
						console.log(response);
						if(response){
							serverResponse.success = 1;
							serverResponse.response = response;
							resolve(serverResponse);
						} else {
							serverResponse.error = 1;
							serverResponse.response = {errmsg: 'Invalid Credentials Provided.'};
							reject(serverResponse);
						}
					}
				});
			} else {
				orgUserSchema.findOne({'org_usernam': userObject.user_name, 'org_password': userObject.password}, {}, function(err, response){
					console.log("err ",err);
					if(err){
						console.log(err);
						serverResponse.error = 1;
						serverResponse.response = err;
						reject(serverResponse);
					}
					else{
						console.log(response);
						if(response){
							serverResponse.success = 1;
							serverResponse.response = response;
							resolve(serverResponse);
						} else {
							serverResponse.error = 1;
							serverResponse.response = {errmsg: 'Invalid Credentials Provided.'};
							reject(serverResponse);
						}
					}
				});
			}
				
		} catch(e){
			console.log(e);
			serverResponse.error = 1;
			serverResponse.response = e;
			reject(serverResponse);
		}
	});
};

UserModel.prototype.getAllUsers = function(){
	var serverResponse = {
		'success': 0,
		'error': 0,
		'response': {}
	}
	return new Promise(function(resolve, reject){
		try{
			userSchema.find({ role_id: { $ne: '56f1067c4c1108dc2926a5bd' } }, function(err, response){
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
};

UserModel.prototype.updateUser = function(userObject){
	var serverResponse = {
		'success': 0,
		'error': 0,
		'response': {}
	}
	return new Promise(function(resolve, reject){
		try{
			userSchema.update({'_id': userObject._id}, userObject, function(err, response){
				if(err){
					console.log(err);
					serverResponse.error = 1;
					serverResponse.response = err;
					reject(serverResponse);
				}
				else{
					serverResponse.success = 1;
					serverResponse.response = { _id: userObject._id };
					resolve(serverResponse);
				}
			});
		} catch(e){
			console.log(e);
			serverResponse.error = 1;
			serverResponse.response = e;
			reject(serverResponse);
		}
	});
};

UserModel.prototype.deleteUser = function(userObject){
	var serverResponse = {
		'success': 0,
		'error': 0,
		'response': {}
	}
	return new Promise(function(resolve, reject){
		try{
			userSchema.remove({'_id': userObject.userid}, function(err, response){
				if(err){
					console.log(err);
					serverResponse.error = 1;
					serverResponse.response = err;
					reject(serverResponse);
				}
				else{
					if(response){
						serverResponse.success = 1;
						serverResponse.response = response;
						resolve(serverResponse);
					}else{
						serverResponse.error = 1;
						serverResponse.response = {'errmsg': 'No such user found.'};
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
};


UserModel.prototype.getUserById = function(userObject){
	var serverResponse = {
		'success': 0,
		'error': 0,
		'response': {}
	}
	return new Promise(function(resolve, reject){
		try{
			userSchema.findOne({'_id': userObject.userid}, function(err, response){
				if(err){
					console.log(err);
					serverResponse.error = 1;
					serverResponse.response = err;
					reject(serverResponse);
				}
				else{
					if(response){
						serverResponse.success = 1;
						serverResponse.response = response;
						resolve(serverResponse);
					}else{
						serverResponse.error = 1;
						serverResponse.response = {'errmsg': 'User not found.'};
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
};

module.exports.UserModel = new UserModel();