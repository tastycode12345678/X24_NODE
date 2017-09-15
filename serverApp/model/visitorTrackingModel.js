var Promise = require('promise');
var CONSTANT = require('../config/constant').CONSTANT;
const crypto = require('crypto');

var pg = require('pg');
	pg.defaults.ssl = true;
	pg.defaults.poolSize = 20;

function VisitorTrackingModel(){
	this.serverResponse = {
		'success': 0,
		'error': 0,
		'response': {}
	}
}

VisitorTrackingModel.prototype.trackVisitor = function(visitorObj){
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

					var queryStr = "INSERT INTO visitortracking (tfpid, visiting_date, orgid, visited, accepted, rejected, additional_person) values ($1, $2, $3, $4, $5, $6, $7)";
					var query =  client.query(queryStr, [record.tfpid, record.visiting_date, record.orgid, record.visited, record.accepted, record.rejected, record.additional_person]);
						//call `done()` to release the client back to the pool
					query.on('end', function() {					
						done();	
						console.log("err", err);
						that.serverResponse.success = 1;
						that.serverResponse.response = {insrted:true};
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
}

VisitorTrackingModel.prototype.getAllVisitors = function(visitorObj){
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


					var queryStr = "SELECT t.fname, t.lname, t.email, t.phone_number, v.visited, v.accepted, v.rejected, v.additional_person FROM visitortracking as v, tfpuser as t WHERE 't.id' = 'v.tfpid'";
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
							that.serverResponse.response = result;
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
}

module.exports.VisitorTrackingModel = new VisitorTrackingModel();