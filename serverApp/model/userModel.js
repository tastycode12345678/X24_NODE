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
					var queryStr = "INSERT INTO public.tfpuser(name, email, user_name, pass, phone_number, profile_pic, background_check, active) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
					var query =  client.query(queryStr, [record.name, record.email, record.email, record.pass, record.phone_number, record.profile_pic, record.background_check, record.active]);
					console.log(record);
					query.on('end', function(err, res) {
						console.log(err, res);
						done();						
						
						/*new mailer.Mail({
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
						});*/
						that.serverResponse.success = 1;
						that.serverResponse.response = record;
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
					var queryStr = "";
					var recArr = [];
					console.log("record", record);
					if(record.user_name.match(".com")){
						queryStr = "SELECT * FROM tfpuser WHERE user_name = $1 and pass = $2";
						client.query(queryStr, [record.user_name, record.pass], function(err, result) {
							//call `done()` to release the client back to the pool						
							done();	
							console.log("err", err);
							if(err) {
								that.serverResponse.error = 1;
								that.serverResponse.success = 0;
								that.serverResponse.response = err;
								reject(that.serverResponse);
							}else{
								if(result.rows.length){
									that.serverResponse.success = 1;
									that.serverResponse.error = 0;
									that.serverResponse.response = {isVisitor:true, tfpid:result.rows[0].id};
									resolve(that.serverResponse);
								}else{
									that.serverResponse.success = 0;
									that.serverResponse.error = 1;
									that.serverResponse.response = null;
									resolve(that.serverResponse);
								}
							}
						});
					}else{
						queryStr = "SELECT * FROM orguser WHERE org_username = $1 and org_password = $2";							
						client.query(queryStr, [record.user_name, record.pass], function(err, result) {
							//call `done()` to release the client back to the pool						
							done();	
							console.log("err", err);
							if(err) {
								that.serverResponse.error = 1;
								that.serverResponse.success = 0;
								that.serverResponse.response = err;
								reject(that.serverResponse);
							}else{
								if(result.rows.length){
									if(result.rows[0].is_adminuser){
										if(result.rows[0].is_adminuser.toLowerCase() === "true"){
											that.serverResponse.success = 1;
											that.serverResponse.error = 0;
											that.serverResponse.response = {isOrgRegister:true, tfpid: result.rows[0].tfpid, orgUserId:result.rows[0].id};
											resolve(that.serverResponse);
										}else if(result.rows[0].is_adminuser.toLowerCase() === "false"){
											that.serverResponse.success = 1;
											that.serverResponse.error = 0;
											that.serverResponse.response = {isOrgRegister:false, tfpid: result.rows[0].tfpid, orgUserId:result.rows[0].id};
											resolve(that.serverResponse);
										}										
									}else{
										that.serverResponse.success = 0;
										that.serverResponse.error = 1;
										that.serverResponse.response = null;
										resolve(that.serverResponse);
									}
								}else{
									that.serverResponse.success = 0;
									that.serverResponse.error = 1;
									that.serverResponse.response = null;
									resolve(that.serverResponse);
								}
							}
						});
					}						

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

					var queryStr = "UPDATE tfpuser SET name = $1, email = $2, user_name = $3, pass = $4, phone_number = $5, profile_pic = $6, background_check = $7, active = $8 WHERE ID = $9";
					var query = client.query(queryStr, [record.name, record.email, record.email, record.pass, record.phone_number, record.profile_pic, record.background_check, record.active, record.id]);
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
					client.query(queryStr, [/* record.id */21], function(err, result) {
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