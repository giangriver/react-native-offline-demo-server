'use strict';
const mongoose = require('mongoose'),
    ReturnResult = require('../libs/returnresult'),
    Authentication = require('../libs/authentication').Authentication,
    Constants = require('../constant/constant'),
    jwt = require('jsonwebtoken'),
    config = require('config'),
    User = mongoose.model('User'),
    Config = config.get('App');

exports.getAuthentication = function (req, res) {
    // access authentication
    var authentication = new Authentication();

    // call auth function to encrypt the password    
    authentication.encrypt_string(req.body.password, (result) => {
        // set saved password
        var password = result;

        var username = !req.body.username ? "" : req.body.username.toLowerCase();
        var email_address = !req.body.email_address ? null : req.body.email_address.toLowerCase();

        // look up user
        User.find({ 
                $or: [ 
                    { username: username },
                    { email_address: email_address }
                ],
                deleted_date: null
            })
            .select("username password email_address first_name last_name")
            .exec((err, users) => {
                // check for error
                if (err) {
                    res.jsonp(new ReturnResult("Error", null, null, Constants.messages.INTERNAL_ERROR));
                    return;
                }
                // check found
                if (users.length === 0) {
                    res.jsonp(new ReturnResult("Error", null, null, Constants.messages.USER_NOT_FOUND));
                    return;
                }
                // get user
                var user = users[0];
                console.log(user.username + " logged in");

                // check password
                if (user.password != password) {
                    res.jsonp(new ReturnResult("Error", null, null, Constants.messages.INVALID_PASSWORD));
                    return;
                }
                // create a token
                var token = jwt.sign({ 
                    iat: Math.floor(Date.now() / 1000) - 30,
                    expiresIn: Constants.EXPIRES,
                    ip: req.ip,
                    email_address: user.email_address,
                    username: user.username
                }, process.env.DEMO_JWT_SECRET_KEY);

                // get result
                var result = new ReturnResult({
                    token: token,
                    expiresIn: Constants.EXPIRES,
                    expiryDate: parseInt((Math.floor(Date.now() / 1000) - 30) + (Constants.EXPIRES * 60)),
                    username: user.username,
                    email_address: user.email_address,
                    first_name: user.first_name,
                    last_name: user.last_name
                }, null, "Logged In", null);
                // return results
                res.jsonp(result);

            });
    });
}
