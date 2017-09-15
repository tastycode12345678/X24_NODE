var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
	development: {
		rootPath: rootPath,
		dbUrl: 'mongodb://X24_2017:#bvcxz321@ds135624.mlab.com:35624/x242017_visitors'
	},
	production: {
		rootPath: rootPath,
		dbUrl: 'mongodb://X24_2017:#bvcxz321@ds135624.mlab.com:35624/x242017_visitors'
	}
}
