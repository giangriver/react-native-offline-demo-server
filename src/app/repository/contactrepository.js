const demoError = require('../dto/demoerror');
const mongoose = require('mongoose');
const Constants = require('../constant/constant');
const jwt = require('jsonwebtoken');
const MODULE_NAME = 'ContactRepository';
const async = require('async');

const Contact = require('../models/contact').ContactModel;

class ContactRepository {
    constructor() {
        this.error = new demoError();
    }

    async listContacts({ offset = 0, limit = 10 } = {}) {
    	const METHOD_NAME = "listContacts";
    	try {
    		const contacts = await Contact.find({}).sort({ updated_date: -1 }).skip(offset).limit(limit);
      		return { contacts };
    	}
    	catch(err) {

    	}
    }

    async createContact(name, number, email, photo) {
    	const METHOD_NAME = "createContact";
    	try {
    		const contact = new Contact({name: name,
    			number: number,
    			email: email,
    			photo: photo});

    		contact = await contact.save();
    		return contact;
    	}
    	catch(err) {

    	}
    }

    async updateContact(id, name, number, email, photo) {
        const METHOD_NAME = "updateContact";
        try {
            const contact = await Contact.findById(id);
  
            if (!contact) {
                throw new Error('Contact is not found by id');
            }

            const updated_date = Date.now();

            const modifier = { name, number, email, photo, updated_date };
            console.log(modifier);

            const editedContact = await Contact.findOneAndUpdate(
                { _id: id },
                { $set: modifier }
            );

            return editedContact;
        }
        catch(err) {

        }
    }

}

module.exports = ContactRepository;