var mongoose = require('mongoose');
var CONSTANT = require('../config/constant').CONSTANT;
const crypto = require('crypto');

var orgUserSchema = mongoose.Schema({
	org_id: {
		type:String,
		required: true
	},
	tfp_id:{
		type:String,
		required: true
	},
	is_adminuser:{
		type:Boolean,
		required: true,
		default:false
	},
	org_usernam:{
		type:Boolean,
		required: true,
		default:false
	},
	org_password:{
		type:Boolean,
		required: true,
		default:false
	},
	active:{
		type:Boolean,
		required: true,
		default:false
	}
});

module.exports = mongoose.model(CONSTANT.SCHEMA.ORG_USER_SCHEMA, orgUserSchema);