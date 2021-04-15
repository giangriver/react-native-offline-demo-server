'use strict';

const userController = require('../controllers/user'),
    AuthGuard = require('../libs/authguard').AuthGuard;

module.exports = function(app) {
    // sign up
    app.post('/demo/api/v1/user', userController.addUser);
}