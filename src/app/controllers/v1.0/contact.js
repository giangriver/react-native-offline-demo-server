const mongoose = require('mongoose'),
contactService = require('../../services/contactservice');
const upload = require("../../middleware/uploadmiddleware");

class ContactController {
    constructor() {
        this.contactService = new contactService();
    }

    init(router) {
        const self = this;

        router.route('/listContacts')
            .get(async function (req, res, next) {
                try {
                    const contacts = await self.contactService.listContacts();
                    res.sendOk(contacts);
                } catch (error) {
                    res.sendError(error);
                }
            });

        router.route('/addContact')
            .post(async function (req, res, next) {
                try {
                    let photoUrl = undefined;
                    await upload(req, res);
                    if (req.file) {
                      photoUrl = req.file.originalname
                    }

                    let name = req.body.name || null;
                    let email = req.body.email.toLowerCase() || null;
                    let number = req.body.number || null;
                    let photo = photoUrl? photoUrl : null;
                    const contact = await self.contactService.createContact(name, number, email, photo);
                    res.sendOk(contact);
                } catch (error) {
                    res.sendError(error);
                }
            });

        router.route('/updateContact/:id')
            .put(async function (req, res, next) {
                try {
                    const { id } = req.params;

                    let photoUrl = undefined;
                    await upload(req, res);
                    if (req.file) {
                      photoUrl = req.file.originalname
                    }

                    let name = req.body.name || null;
                    let email = req.body.email.toLowerCase() || null;
                    let number = req.body.number || null;
                    let photo = photoUrl? photoUrl : null;
                    const contact = await self.contactService.updateContact(id, name, number, email, photo);
                    res.sendOk(contact);
                } catch (error) {
                    res.sendError(error);
                }
            });

        router.route('/uploadphoto')
            .post(async function (req, res, next) {
                try {
                    console.log("Begin upload....");
                    let photoUrl = undefined;
                    await upload(req, res);
                    if (req.file) {
                      photoUrl = req.file.originalname
                    }
                    res.sendOk({url: photoUrl});
                } catch (error) {
                    res.sendError(error);
                }
            });
    }
}
module.exports = ContactController;