//-------------------------------------------------------------------
// authentication routes
//-------------------------------------------------------------------

'use strict';

var authenticationController = require('../controllers/authentication'),
    AuthGuard = require('../libs/authguard').AuthGuard;

module.exports = function(app) {

    // get user authentication information
    // app.get('/api/v1/authentication', (req, res, next) => AuthGuard(req, res, next), authenticationController.getAuthenticationInformation);

    // authenticate
    app.post('/api/v1/authenticate', authenticationController.getAuthentication);

    // refresh
    // app.get('/api/v1/refresh', (req, res, next) => AuthGuard(req, res, next), authenticationController.getRefresh);
};
