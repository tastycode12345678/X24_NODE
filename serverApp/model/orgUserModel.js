var Promise = require('promise');
var CONSTANT = require('../config/constant').CONSTANT;
const crypto = require('crypto');
var mailer = require('node-mailer');
var pg = require('pg');
	pg.defaults.ssl = true;
	pg.defaults.poolSize = 20;

function OrgUserModel(){
	this.serverResponse = {
		'success': 0,
		'error': 0,
		'response': {}
	}
}

OrgUserModel.prototype.createOrgUser = function(record){
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

					var queryStr = "INSERT INTO public.orguser(orgid, tfpid, is_adminuser, org_username, org_password, active) VALUES ($1, $2, $3, $4, $5, $6)";
					client.query(queryStr, [record.orgid, record.tfpid, record.is_adminuser, record.org_username, record.org_password, record.active], function(err, result) {
						//call `done()` to release the client back to the pool						
						if(err) {
							done();	
							that.serverResponse.error = 1;
							that.serverResponse.response = err;
							reject(that.serverResponse);
						}else{
							if(result.rows.length){
								
								var innerQuery = "SELECT * FROM tfpuser WHERE id = $1";
								client.query(innerQuery, [record.tfpid], function(err, res){
									done();	
									if(err) {
										that.serverResponse.error = 1;
										that.serverResponse.response = err;
										reject(that.serverResponse);
									}else{
										if(res["rows"].length){
											var email = res["rows"][0].email;
												
											new mailer.Mail({
												from: 'care.trustfactor@gmail.com',
												to: email,
												subject: 'My Subject',
												body: 'Hi Nilesh Dethe,\r\n\r\nThank you for your interest in TheTruth Factor! We are pleased to inform you that you have registered successfully.\r\nPlease use the following credentials:\r\nUsername - \r\nPassword - \r\n\r\nCheers!\r\nTeam Trust Factor.',
												callback: function(err, data){
													if(err){
														that.serverResponse.error = 1;
														that.serverResponse.response = err;
														reject(that.serverResponse);
													}else{
														console.log(data);
														that.serverResponse.success = 1;
														that.serverResponse.response = {sentEmail:true};
														resolve(that.serverResponse);								
													}
												}
											});											
										}else{
											that.serverResponse.success = 1;
											that.serverResponse.response = {sentEmail:false};
											resolve(that.serverResponse);
										}
									}									
								});								
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
}

module.exports.OrgUserModel = new OrgUserModel();