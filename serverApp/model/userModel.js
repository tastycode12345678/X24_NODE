var Promise = require('promise');
var CONSTANT = require('../config/constant').CONSTANT;
const crypto = require('crypto');
var mailer = require('node-mailer');

var pg = require('pg');
	pg.defaults.ssl = true;
	pg.defaults.poolSize = 20;

function UserModel(){
	this.serverResponse = {
		'success': 0,
		'error': 0,
		'response': {}
	}
}

UserModel.prototype.createUser = function(record){
	var that = this;
	return new Promise(function(resolve, reject){
		try{
			pg.connect(process.env.DATABASE_URL, function(err, client, done) {
				if(err) {	
					done();			
					that.serverResponse.error = 1;
					that.serverResponse.response = err;
					reject(that.serverResponse);
				}else{
					console.log(record);
					var queryStr = "INSERT INTO public.tfpuser(fname, lname, email, user_name, pass, phone_number, profile_pic, background_check, active)VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9)";
					var query =  client.query(queryStr, [record.fname, record.lname, record.email, record.user_name, record.pass, record.phone_number, record.profile_pic, record.background_check, record.active]);
					query.on('end', function(err, res) {
						console.log(err, res);
						done();				
												
						new mailer.Mail({
							from: 'care.trustfactor@gmail.com',
							to: record.email,
							subject: 'My Subject',
							body: 'Hi '+record.fname+' '+record.lname+',\r\n\r\nThank you for your interest in TheTruth Factor! We are pleased to inform you that you have registered successfully.\r\nPlease use the following credentials:\r\nUsername - '+record.user_name+'\r\nPassword - '+record.pass+'\r\n\r\nCheers!\r\nTeam Trust Factor.',
							callback: function(err, data){
								if(err){
									that.serverResponse.error = 1;
									that.serverResponse.response = err;
									reject(that.serverResponse);
								}else{
									that.serverResponse.success = 1;
									that.serverResponse.response = {sentEmail:true};
									resolve(that.serverResponse);								
								}
							}
						});
						
					});					
				}
			});

		} catch(err){
			that.serverResponse.error = 1;
			that.serverResponse.response = err.message;
			reject(that.serverResponse);
		}
	});
};

UserModel.prototype.validateUser = function(record){
	var that = this;
	return new Promise(function(resolve, reject){
		try{
			pg.connect(process.env.DATABASE_URL, function(err, client, done) {
				if(err) {	
					done();			
					that.serverResponse.error = 1;
					that.serverResponse.response = err;
					reject(that.serverResponse);
				}else{

					var queryStr = "SELECT * FROM tfpuser WHERE user_name = $1 and pass = $2";
					client.query(queryStr, [record.user_name, record.pass], function(err, result) {
						//call `done()` to release the client back to the pool						
						done();	
						console.log("err", err);
						if(err) {
							that.serverResponse.error = 1;
							that.serverResponse.response = err;
							reject(that.serverResponse);
						}else{
							if(result.rows.length > 0){
								that.serverResponse.success = 1;
								that.serverResponse.response = {isOrgRegistered:true};
								resolve(that.serverResponse);
							}else{
								that.serverResponse.success = 1;
								that.serverResponse.response = {isOrgRegistered:false};
								resolve(that.serverResponse);
							}
						}
					});

				}
			});

		} catch(err){
			that.serverResponse.error = 1;
			that.serverResponse.response = err.message;
			reject(that.serverResponse);
		}
	});
};

UserModel.prototype.getAllUsers = function(){
	var that = this;
	return new Promise(function(resolve, reject){
		try{
			pg.connect(process.env.DATABASE_URL, function(err, client, done) {
				if(err) {	
					done();			
					that.serverResponse.error = 1;
					that.serverResponse.response = err;
					reject(that.serverResponse);
				}else{

					var queryStr = "SELECT * FROM tfpuser";
					client.query(queryStr, function(err, result) {
						//call `done()` to release the client back to the pool						
						done();	
						console.log("err", err);
						if(err) {
							that.serverResponse.error = 1;
							that.serverResponse.response = err;
							reject(that.serverResponse);
						}else{
							that.serverResponse.success = 1;
							that.serverResponse.response = result["rows"];
							resolve(that.serverResponse);
						}
					});

				}
			});

		} catch(err){
			that.serverResponse.error = 1;
			that.serverResponse.response = err.message;
			reject(that.serverResponse);
		}
	});
};

UserModel.prototype.updateUser = function(record){
	var that = this;
	return new Promise(function(resolve, reject){
		try{
			pg.connect(process.env.DATABASE_URL, function(err, client, done) {
				if(err) {	
					done();			
					that.serverResponse.error = 1;
					that.serverResponse.response = err;
					reject(that.serverResponse);
				}else{

					var queryStr = "UPDATE tfpuser SET fname = $1, lname = $2, email = $3, user_name = $4, pass = $5, phone_number = $6, profile_pic = $7, background_check = $8, active = $9 WHERE ID = $10";
					var query = client.query(queryStr, [record.fname, record.lname, record.email, record.user_name, record.pass, record.phone_number, record.profile_pic, record.background_check, record.active, record.id]);
					query.on('end', function() {
						done();
						that.serverResponse.success = 1;
						that.serverResponse.response = {"updated":true};
						resolve(that.serverResponse);
					});					
				}
			});

		} catch(err){
			that.serverResponse.error = 1;
			that.serverResponse.response = err.message;
			reject(that.serverResponse);
		}
	});
};

UserModel.prototype.deleteUser = function(record){
	var that = this;
	return new Promise(function(resolve, reject){
		try{
			pg.connect(process.env.DATABASE_URL, function(err, client, done) {
				if(err) {	
					done();			
					that.serverResponse.error = 1;
					that.serverResponse.response = err;
					reject(that.serverResponse);
				}else{


					var queryStr = "DELETE * FROM tfpuser where id = $1";
					client.query(queryStr, [record.id], function(err, result) {
						//call `done()` to release the client back to the pool						
						done();	
						console.log("err", err);
						if(err) {
							that.serverResponse.error = 1;
							that.serverResponse.response = err;
							reject(that.serverResponse);
						}else{
							that.serverResponse.success = 1;
							that.serverResponse.response = {"delete":true};
							resolve(that.serverResponse);
						}
					});
					
				}
			});

		} catch(err){
			that.serverResponse.error = 1;
			that.serverResponse.response = err.message;
			reject(that.serverResponse);
		}
	});
};


UserModel.prototype.getUserById = function(record){
	var that = this;
	return new Promise(function(resolve, reject){
		try{
			pg.connect(process.env.DATABASE_URL, function(err, client, done) {
				if(err) {	
					done();			
					that.serverResponse.error = 1;
					that.serverResponse.response = err;
					reject(that.serverResponse);
				}else{


					var queryStr = "SELECT * FROM tfpuser where id = $1";
					client.query(queryStr, [record.id], function(err, result) {
						//call `done()` to release the client back to the pool						
						done();	
						console.log("err", err);
						if(err) {
							that.serverResponse.error = 1;
							that.serverResponse.response = err;
							reject(that.serverResponse);
						}else{
							that.serverResponse.success = 1;
							that.serverResponse.response = result["rows"];
							resolve(that.serverResponse);
						}
					});
					
				}
			});

		} catch(err){
			that.serverResponse.error = 1;
			that.serverResponse.response = err.message;
			reject(that.serverResponse);
		}
	});
};


UserModel.prototype.getUserByEmail = function(record){
	var that = this;
	return new Promise(function(resolve, reject){
		try{
			pg.connect(process.env.DATABASE_URL, function(err, client, done) {
				if(err) {	
					done();			
					that.serverResponse.error = 1;
					that.serverResponse.response = err;
					reject(that.serverResponse);
				}else{


					var queryStr = "SELECT * FROM tfpuser where email = $1";
					client.query(queryStr, [record.email], function(err, result) {
						//call `done()` to release the client back to the pool						
						done();	
						if(err) {
							that.serverResponse.error = 1;
							that.serverResponse.response = err;
							reject(that.serverResponse);
						}else{
							that.serverResponse.success = 1;
							that.serverResponse.response = result["rows"];
							resolve(that.serverResponse);
						}
					});
					
				}
			});

		} catch(err){
			that.serverResponse.error = 1;
			that.serverResponse.response = err.message;
			reject(that.serverResponse);
		}
	});
};

module.exports.UserModel = new UserModel();