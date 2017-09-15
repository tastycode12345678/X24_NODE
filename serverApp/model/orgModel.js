var Promise = require('promise');
var CONSTANT = require('../config/constant').CONSTANT;
const crypto = require('crypto');

var pg = require('pg');
	pg.defaults.ssl = true;
	pg.defaults.poolSize = 20;

function OrgModel(){
	this.serverResponse = {
		'success': 0,
		'error': 0,
		'response': {}
	}
}

OrgModel.prototype.createOrg = function(record){
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


					var queryStr = "SELECT * FROM ORGANIZATION WHERE ID = $1";
					client.query(queryStr, [record.orgid], function(err, result) {
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
}

module.exports.OrgModel = new OrgModel();