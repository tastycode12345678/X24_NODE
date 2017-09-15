var mongoose = require('mongoose');
var CONSTANT = require('../config/constant').CONSTANT;
const crypto = require('crypto');

var userSchema = mongoose.Schema({
	fname: {
		type:String
	},
	lname: {
		type:String
	},
	email:{
		type: String
	},
	user_name:{
		type:String
	},
	password: {
		type:String
	},
	phone_number: {
		type: Number
	},
	profile_pic: {
		type: String
	},
	background_check:{
		type: String,
		default: "false"
	},
	active:{
		type:Boolean,
		default:false
	},
	pan_no: {
		type:String
	},
	ssn: {
		type:String
	},
	tfp_id: {
		type:String
	}
});

module.exports = mongoose.model(CONSTANT.SCHEMA.USER, userSchema);
