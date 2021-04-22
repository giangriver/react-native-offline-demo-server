const contactService = require('../../services/contactservice');
const upload = require("../../middleware/uploadmiddleware");
const AuthGuard = require('../../libs/authguard').AuthGuard;
class ContactController {
    constructor() {
        this.contactService = new contactService();
    }

    init(router) {
        const self = this;

        router.get('/', AuthGuard, async function (req, res, next) {
                try {
                    const contacts = await self.contactService.listContacts();
                    res.sendOk(contacts);
                } catch (error) {
                    res.sendError(error);
                }
            });

        router.post('/add', [AuthGuard, upload], async function (req, res, next) {
            try {
                let name = req.body.name || null;
                let email = !req.body.email ? null : req.body.email.toLowerCase();
                let number = req.body.number || null;
                let photo = req.file.path || null;
                const contact = await self.contactService.createContact(name, number, email, photo);
                res.sendOk(contact);
            } catch (error) {
                res.sendError(error);
            }
        })

        router.put('/update/:id', [AuthGuard, upload], async function (req, res, next) {
                try {
                    const { id } = req.params;
                    let name = req.body.name || null;
                    let email = !req.body.email ? null : req.body.email.toLowerCase();
                    let number = req.body.number || null;
                    let photo = !req.file ? null : req.file.path;
                    const contact = await self.contactService.updateContact(id, name, number, email, photo);
                    res.sendOk(contact);
                } catch (error) {
                    res.sendError(error);
                }
            });

        router.get('/:id', AuthGuard, async function (req, res, next) {
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