const mongoose = require('mongoose'),
contactService = require('../../services/contactservice');

class ContactController {
    constructor() {
        this.contactService = new contactService();
    }

    init(router) {
        const self = this;

        router.route('/')
            .get(async function (req, res, next) {
                try {
                    const contacts = await self.contactService.listContacts();
                    res.sendOk(contacts);
                } catch (error) {
                    res.sendError(error);
                }
            });

        router.route('/add')
            .post(async function (req, res, next) {
                try {
                    let name = req.body.name || null;
                    let email = req.body.email.toLowerCase() || null;
                    let number = req.body.number || null;
                    let photo = req.body.photo || null;
                    const contact = await self.contactService.createContact(name, number, email, photo);
                    res.sendOk(contact);
                } catch (error) {
                    res.sendError(error);
                }
            });

        router.route('/update/:id')
            .put(async function (req, res, next) {
                try {
                    const { id } = req.params;

                    let name = req.body.name || null;
                    let email = req.body.email.toLowerCase() || null;
                    let number = req.body.number || null;
                    let photo = req.body.photo || null;
                    const contact = await self.contactService.updateContact(id, name, number, email, photo);
                    res.sendOk(contact);
                } catch (error) {
                    res.sendError(error);
                }
            });

        router.route('/:id')
            .get(async function (req, res, next) {
               try {
                let { id } = req.params || null;
                let result = await self.contactService.getContact(id);
                res.sendOk(result);
               } catch (error) {
                 res.sendError(error);
               } 
            })
    }
}
module.exports = ContactController;