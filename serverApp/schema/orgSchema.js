var mongoose = require('mongoose');
var CONSTANT = require('../config/constant').CONSTANT;
const crypto = require('crypto');

var orgSchema = mongoose.Schema({
	name: {
		type:String,
		required: true
	},
	address: {
		type:String,
		required: true
	},
	is_adminuser:{
		type:Boolean,
		required: true,
		default:false
	}
});

module.exports = mongoose.model(CONSTANT.SCHEMA.ORGANIZATION, orgSchema);
