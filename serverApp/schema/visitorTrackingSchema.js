var mongoose = require('mongoose');
var CONSTANT = require('../config/constant').CONSTANT;
const crypto = require('crypto');

var visitorTrackingSchema = mongoose.Schema({
	tfp_id: {
		type:String,
		required: true
	},
	visiting_date: {
		type:String,
		required: true
	},
	org_id:{
		type:String,
		required: true
	}
});

module.exports = mongoose.model(CONSTANT.SCHEMA.VISITOR_TRACKING, visitorTrackingSchema);
