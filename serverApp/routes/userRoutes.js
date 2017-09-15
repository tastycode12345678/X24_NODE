var UserModel = require('../model/userModel').UserModel;
var CONSTANT = require('../config/constant').CONSTANT;
var multer  = require('multer');

var storage = multer.diskStorage({
  destination: function (req, files, cb) {
    cb(null, 'uploads/users/')
  },
  rename : function (fieldname, filename, req, res) {
       console.log('ici', req.body);
       return "HARRY--";
    },

  filename: function (req, file, cb) {
	var datetimestamp = Date.now();
	cb(null, datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
  }
});

var upload = multer({ storage: storage }).any();


module.exports = function(app) {

	app.post('/createuser', function(req, res){
		UserModel.createUser(req.body).then(function(response){
			console.log("Create User"+JSON.stringify(response));
			res.send(response);
		}, function(err){
			res.status(500);
			res.send(err);
		});
	});

	app.post('/uploadimage', function(req, res, next){
        upload(req, res, function(err){
        	var newObj = {};
		  	for(var i = 0; i < req.files.length; i++){
			    var obj = req.files[i];
		    	if(!newObj.userimages){
		    		newObj.userimages = [];
		    	}
		    	newObj.userimages.push({'name': obj.filename, 'size': obj.size});
		  	}
		  	console.log(newObj);
            if(err){
            	res.status(400);
                res.send({error:1, success: 0, errmsg:err});
            } else{
            	UserModel.getUserById({'userid': req.body.user_id}).then(function(resp){
            		var user = resp.response;
            		user.image = newObj.userimages;
            		console.log('User-------------> ' + user);
            		UserModel.updateUser(user).then(function(response){
            			res.send(response);
            		}, function(err){
        				res.status(400);
						res.send(err);
            		});
            	}, function(err){
    				res.status(400);
					res.send(err);
            	});
    		}
        });
	});

	app.post('/login', function(req, res){
		UserModel.validateUser(req.body).then(function(response){
			res.send(response);
		}, function(err){
			//res.status(500);
			res.send(err);
		});
	});


	app.post('/deleteuser', function(req, res){
		UserModel.deleteUser(req.body).then(function(response){
			res.send(response);
		}, function(err){
			res.status(400);
			res.send(err);
		});
	});

	app.post('/updateuser', function(req, res){
		UserModel.updateUser(req.body).then(function(response){
			res.send(response);
		}, function(err){
			res.status(400);
			res.send(err);
		});
	});

	app.get('/getallusers', function(req, res){
		UserModel.getAllUsers().then(function(response){
			res.send(response);
		}, function(err){
			res.status(400);
			res.send(err);
		});
	});

	app.post('/getuserbyid', function(req, res){
		UserModel.getUserById(req.body).then(function(response){
			res.send(response);
		}, function(err){
			res.status(400);
			res.send(err);
		});
	});

};
