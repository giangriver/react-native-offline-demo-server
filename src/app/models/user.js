'use strict';
const uuid = require('uuid'),
      mongoose = require('mongoose'),
      Authentication = require('../libs/authentication.js').Authentication,

// set parent schema
Schema = mongoose.Schema;

// setup user information - user_id is from auth0
var UserSchema = new Schema({
    username: { type: String, unique: true },
    password: { type: String },
    email_address: { type: String},
    first_name: { type: String },
    last_name: { type: String },
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
    deleted_date: { type: Date }
});

// check logic as it saves
UserSchema.pre('save', function(next) {
    var user = this;
    // check to see if the password is changing
    if (this.isModified('password')) {
        // access authentication
        var authentication = new Authentication();
        // call auth function to encrypt the password
        let result = authentication.encrypt_string(user.password);
        // set saved password
        user.password = result;
        // move on
        next();
    } else {
        return next();
    }
});
module.exports.UserModel = mongoose.model('User', UserSchema, 'User');
