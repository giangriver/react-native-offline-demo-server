//-------------------------------------------------------------------
// user model
//-------------------------------------------------------------------

'use strict';

const uuid = require('uuid'),
      mongoose = require('mongoose'),
      Authentication = require('../libs/authentication.js').Authentication,

//-------------------------------------------------------------------
// imports
//-------------------------------------------------------------------

// set parent schema
Schema = mongoose.Schema;

// setup user information - user_id is from auth0
var UserSchema = new Schema({
    username: { type: String, unique: true },
    password: { type: String },
    email_address: { type: String},
    first_name: { type: String },
    last_name: { type: String }
});

// check logic as it saves
UserSchema.pre('save', function(next) {
    var user = this;

    // check to see if the password is changing
    if (this.isModified('password')) {

        // access authentication
        var authentication = new Authentication();

        // call auth function to encrypt the password    
        authentication.encrypt_string(user.password, function(result) {
            
            // set saved password
            user.password = result;

            // move on
            next();
        });

    } else {
        return next();
    }
});

//-------------------------------------------------------------------
// end
//-------------------------------------------------------------------

module.exports.UserModel = mongoose.model('User', UserSchema, 'User');
