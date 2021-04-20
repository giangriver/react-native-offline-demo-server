const mongoose = require('mongoose'),
    userService = require('../../services/userservice');

class UserController {
    constructor() {
        this.userService = new userService();
    }

    init(router) {
        const self = this;

        router.route('/signup')
            .post(async function (req, res, next) {
                try {
                    let username = req.body.username.toLowerCase() || null;
                    let email_address = req.body.email_address.toLowerCase() || null;
                    let password = req.body.password || null;
                    let first_name = req.body.first_name || null;
                    let last_name = req.body.last_name || null;
                    let result = await self.userService.signUp(username, email_address, password, first_name, last_name);
                    res.sendOk(result);
                } catch (error) {
                    res.sendError(error);
                }
            })
    }
}
module.exports = UserController;
