var mongoose = require('mongoose');
var CONSTANT = require('../config/constant').CONSTANT;
const crypto = require('crypto');

var visitorTrackingSchema = mongoose.Schema({
	tfp_id: {
		type:String
	},
	visiting_date: {
		type:String
	},
	org_id:{
		type:String
	},
	visited :{
		type:String,
		default: "false"
	},
	accepted :{
		type:String,
		default: "false"
	},
	rejected :{
		type:String,
		default: "false"
	},
	additional_persons :{
		type:String,
		default: "false"
	},
	aadhar_no: {
		type:String
	}

});

module.exports = mongoose.model(CONSTANT.SCHEMA.VISITOR_TRACKING, visitorTrackingSchema);
