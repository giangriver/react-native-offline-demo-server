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
    	catch(error) {
            if (error instanceof demoError) throw error;
            throw new demoError(Constants.ERROR_CODE.BAD_REQUEST, Constants.ERROR_TYPE.API, Constants.ERROR_MAP.FAILED_TO_GET_CONTACTS);
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
    	catch(error) {
            if (error instanceof demoError) throw error;
            throw new demoError(Constants.ERROR_CODE.BAD_REQUEST, Constants.ERROR_TYPE.API, Constants.ERROR_MAP.FAILED_TO_CREATE_CONTACT);
    	}
    }

    async updateContact(id, name, number, email, photo) {
        const METHOD_NAME = "updateContact";
        try {
            const contact = await Contact.findById(id);
  
            if (!contact) {
                this.error.errorCode = Constants.ERROR_CODE.BAD_REQUEST;
                this.error.errorType = Constants.ERROR_TYPE.API;
                this.error.errorKey = Constants.ERROR_MAP.CONTACT_NOT_FOUND;
                throw this.error;
            }

            const updated_date = Date.now();

            const modifier = { name, number, email, photo, updated_date };

            const editedContact = await Contact.findOneAndUpdate(
                { _id: id },
                { $set: modifier }
            );

            return editedContact;
        }
        catch(error) {
            if (error instanceof demoError) throw error;
            throw new demoError(Constants.ERROR_CODE.BAD_REQUEST, Constants.ERROR_TYPE.API, Constants.ERROR_MAP.FAILED_TO_UPDATE_CONTACT);
        }
    }

    async getContact(id) {
    	const METHOD_NAME = "getContact";
    	try {
    		const contact = await Contact.findById(id)
                .select("name number email photo")
                .exec();
      		return { contact };
    	}
    	catch(error) {
            if (error instanceof demoError) throw error;
            throw new demoError(Constants.ERROR_CODE.BAD_REQUEST, Constants.ERROR_TYPE.API, Constants.ERROR_MAP.FAILED_TO_GET_CONTACTS);
    	}
    }

}

module.exports = ContactRepository;