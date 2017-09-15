var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var path = require("path");
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./serverApp/config/init')[env];

require('./serverApp/config/express')(express, app, config);

require('./serverApp/config/mongoose')(config.dbUrl);

require('./serverApp/routes/userRoutes')(app);
require('./serverApp/routes/watsonplatformRoute')(app);
require('./serverApp/routes/orgRoute')(app);
require('./serverApp/routes/orgUserRoute')(app);
require('./serverApp/routes/visitorTrackingRoute')(app);

app.listen(port, function() {
    console.log('Server listening on port ...'+ port);
});