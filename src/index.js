//-------------------------------------------------------------------
// application definition
//-------------------------------------------------------------------
// required packages
const express = require('express'),
    mongoose = require('mongoose'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    // config = require('config'),
    requestIp = require('request-ip'),
    mongoSanitize = require('express-mongo-sanitize'),
    swaggerUI = require('swagger-ui-express'),
    YAML = require('yamljs');

const swaggerDocument = YAML.load('./app/swagger/swagger.yml');
const constant = require('./app/constant/constant');

// allow override of environment variables
require('dotenv').config();
process.env['NODE_CONFIG_DIR'] = path.join(__dirname, 'app/config');

// get port
const port = process.env.PORT || 8006;

// set up database
const db = mongoose.connect(process.env.DEMO_DB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });

//-------------------------------------------------------------------
// configure app
//-------------------------------------------------------------------

// build initial app
const app = express();

// set up cors
app.use(cors());

// dont sent errors back to client
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send({
        message: "Unknown Error"
    });
    next();
})

//-------------------------------------------------------------------
// remote ip
//-------------------------------------------------------------------
app.use(requestIp.mw())

app.use(function(req, res, next) {
    const ip = req.clientIp;
    req.ip = ip;

    next();
});

//-------------------------------------------------------------------
// Add headers
//-------------------------------------------------------------------

app.use(function (req, res, next) {

    // request methods to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // request headers to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // allow creds
    res.setHeader('Access-Control-Allow-Credentials', true);
    // pass to next layer of middleware
    next();
});

// for parsing application/json
app.use(bodyParser.json());
// To remove data, use:
app.use(mongoSanitize());

app.use('/' + constant.ROUTE_PREFIX + '/api/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

//-------------------------------------------------------------------
// set up models
//------------------------------------------------------
var UserModel = require('./app/models/user');
var ContactModel = require('./app/models/contact');

//-------------------------------------------------------------------
// set up middlewares
//------------------------------------------------------
app.use(require('./app/middleware/responsewrapper'));

//-------------------------------------------------------------------
// set up routes
//-------------------------------------------------------------------

// require('./app/routes/authentication')(app);
// require('./app/routes/user')(app);
require('./app/init/route')(app);

// set up static folder
app.use('/public', express.static(path.join(__dirname, 'public')))

const server = app.listen(port, function() {
    console.log('Demo listening on port ' + port);
});

module.exports = app;