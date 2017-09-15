var mongoose = require('mongoose');
var CONSTANT = require('../config/constant').CONSTANT;
const crypto = require('crypto');

var userSchema = mongoose.Schema({
	fname: {
		type:String,
		required: true
	},
	lname: {
		type:String,
		required: true
	},
	email:{
		type: String,
		required: false
	},
	user_name:{
		type:String,
		required: true
	},
	password: {
		type:String,
		required: true,
		validate:[function(password){
			return password.length >= 8;
		}, 'Password should be minimum 8 characters in length.']
	},
	phone_number: {
		type: Number,
		required: true
	},
	profile_pic: {
		type: String,
		required: false
	},
	background_check:{
		type: String,
		required: true,
		default: "false"
	}
});

module.exports = mongoose.model(CONSTANT.SCHEMA.USER, userSchema);
