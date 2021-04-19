const contactRepository = require('../repository/contactrepository');
const demoError = require('../dto/demoerror');
const Constants = require('../constant/constant');

class ContactService {
    constructor() {
        this.contactRepository = new contactRepository();
    }

    async listContacts() {
        try {
            return await this.contactRepository.listContacts();
        } catch (error) {
            if (error instanceof demoError) throw error;
        }
    }

    async createContact(name, number, email, photo) {
        try {
            return await this.contactRepository.createContact(name, number, email, photo);
        } catch (error) {
            if (error instanceof demoError) throw error;
        }
    }

    async updateContact(id, name, number, email, photo) {
        try {
            return await this.contactRepository.updateContact(id, name, number, email, photo);
        } catch (error) {
            if (error instanceof demoError) throw error;
        }
    }
}

module.exports = ContactService; 
