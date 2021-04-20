const contactRepository = require('../repository/contactrepository');
const demoError = require('../dto/demoerror');
const Constants = require('../constant/constant');

class ContactService {
    constructor() {
        this.contactRepository = new contactRepository();
        this.error = new demoError();
    }

    async listContacts() {
        try {
            return await this.contactRepository.listContacts();
        } catch (error) {
            if (error instanceof demoError) throw error;
            throw new demoError(Constants.ERROR_CODE.BAD_REQUEST, Constants.ERROR_TYPE.API, Constants.ERROR_MAP.FAILED_TO_GET_CONTACTS);
        }
    }

    async createContact(name, number, email, photo) {
        try {
            return await this.contactRepository.createContact(name, number, email, photo);
        } catch (error) {
            if (error instanceof demoError) throw error;
            throw new demoError(Constants.ERROR_CODE.BAD_REQUEST, Constants.ERROR_TYPE.API, Constants.ERROR_MAP.FAILED_TO_CREATE_CONTACT);
        }
    }

    async updateContact(id, name, number, email, photo) {
        try {
            return await this.contactRepository.updateContact(id, name, number, email, photo);
        } catch (error) {
            if (error instanceof demoError) throw error;
            throw new demoError(Constants.ERROR_CODE.BAD_REQUEST, Constants.ERROR_TYPE.API, Constants.ERROR_MAP.FAILED_TO_UPDATE_CONTACT);
        }
    }
    
    async getContact(id) {
        try {
            if (!id) {
                this.error.errorCode = Constants.ERROR_CODE.BAD_REQUEST;
                this.error.errorType = Constants.ERROR_TYPE.API;
                this.error.errorKey = Constants.ERROR_MAP.ID_NOT_FOUND;
                throw this.error;
            }
            return await this.contactRepository.getContact(id);
        } catch (error) {
            if (error instanceof demoError) throw error;
            throw new demoError(Constants.ERROR_CODE.BAD_REQUEST, Constants.ERROR_TYPE.API, Constants.ERROR_MAP.FAILED_TO_GET_CONTACT);
        }
    }
}

module.exports = ContactService; 
