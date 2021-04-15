const mongoose = require('mongoose'),
    Authentication = require('../libs/authentication.js').Authentication,
    ReturnResult = require('../libs/returnresult'),
    Constants = require('../constant/constant'),
    async = require('async'),
    User = mongoose.model('User'),
    EmailLib = require('../libs/email').EmailLib;

exports.addUser = function (req, res) {

    // call add user function
    addUserF(req, res, function (result, user) {
        // return
        res.json(result);
    })
}

function addUserF(req, res, routeCallback) {

    console.log("Adding new user");

    // get username
    var username = req.body.username.toLowerCase()
    
    // check
    async.series({
        userExists: function(callback){
            User.findOne({username: username, deleted_date: null}, function(err, user) {
                callback(null, user);
            });
        },
        emailExists: function(callback){
            if(!req.body.email_address) {
                callback(null, null);
            } else {
                User.findOne({email_address: req.body.email_address.toLowerCase(), deleted_date: null}, function(err, user) {
                    callback(null, user);
                });
            }
        }
    },
    function(err, results) {
        if (results.userExists != null) {
            // set up result
            var result = new ReturnResult(null, null, Constants.messages.USERNAME_EXISTS, Constants.messages.USERNAME_EXISTS);
            // return
            routeCallback(result, null);
        } else if (results.emailExists) {
            // set up result
            var result = new ReturnResult(null, null, Constants.messages.EMAIL_EXISTS, Constants.messages.EMAIL_EXISTS);
            // return
            routeCallback(result, null);
        } else {
            // validation
            if (!req.body.password) {
                // set up result
                var result = new ReturnResult(null, null, Constants.messages.INVALID_PASSWORD, Constants.messages.NO_PASSWORD);
                // return
                routeCallback(result, null);
                return;
            }
            
            // create new state
            var user = new User();

            // set user properties
            user.username = username;
            user.password = req.body.password;
            user.email_address = req.body.email_address.toLowerCase();
            user.first_name = req.body.first_name;
            user.last_name = req.body.last_name;

            // save state
            user.save(function(err, user_added) {

                // check for error
                if (err) {
                    // res.jsonp(new ReturnResult("Error", null, null, err.message));
                    routeCallback(new ReturnResult("Error", null, null, err.message), user_added);
                    return;
                }

                // kill pw
                user.password = "#####";
                // set up result
                var result = new ReturnResult(user, null, "Adding a new User - " + user.first_name + " " + user.last_name, err);
                // return result        
                routeCallback(result, user_added);
                // // check for email address
                // if (user.email_address) {
                //     // send email - TODO: queue
                //     EmailLib.prototype.sendEmail(user, user.email_address, {}, Constants.templates.WELCOME_EMAIL, function() {
                //         // set up result
                //         var result = new ReturnResult(user, null, "Adding a new User - " + user.first_name + " " + user.last_name, err);
                //         // return result        
                //         routeCallback(result, user_added);
                //     });
                // } else {
                //     // set up result
                //     var result = new ReturnResult(user, null, "Adding a new User - " + user.first_name + " " + user.last_name, err);
                //     // return result        
                //     routeCallback(result, user_added);
                // }
            });

        }
    });
    
}