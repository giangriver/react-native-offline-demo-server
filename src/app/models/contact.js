'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var ContactSchema = new Schema({
	// user_id: { type: Schema.Types.ObjectId, ref: 'User' },
	photo: {type: String},
    name: { type: String, required: true },
    number: { type: String },
    email: { type: String, required: true, unique: true},
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
    deleted_date: { type: Date }
});

module.exports.ContactModel = mongoose.model('Contact', ContactSchema, 'Contact');