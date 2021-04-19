'use strict';
const authenticationService = require('../../services/authenticationservice');

class AuthenticationController {
    constructor() {
        this.authenticationService = new authenticationService();
    }

    init(router) {
        const self = this;

        router.route('/login')
            .post(async function (req, res, next) {
                try {
                    let username = req.body.username.toLowerCase() || null;
                    let email_address = req.body.email_address.toLowerCase() || null;
                    let password = req.body.password || null;
                    let ip = req.ip || null;
                    let result = await self.authenticationService.getAuthentication(username, email_address, password, ip);
                    res.sendOk(result);
                } catch (error) {
                    res.sendError(error);
                }
            })
    }
}
module.exports = AuthenticationController;
