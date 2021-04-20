'use strict';
const authenticationService = require('../../services/authenticationservice'),
      AuthGuard = require('../../libs/authguard').AuthGuard;

class AuthenticationController {
    constructor() {
        this.authenticationService = new authenticationService();
    }

    init(router) {
        const self = this;

        router.route('/login')
            .post(async function (req, res, next) {
                try {
                    let username = !req.body.username ? null : req.body.username.toLowerCase();
                    let email_address = !req.body.email_address ? null : req.body.email_address.toLowerCase();
                    let password = req.body.password || null;
                    let ip = req.ip || null;
                    let result = await self.authenticationService.getAuthentication(username, email_address, password, ip);
                    res.sendOk(result);
                } catch (error) {
                    res.sendError(error);
                }
            })
        
        router.get('/refresh', AuthGuard, async function (req, res, next) {
            try {
                let token = req.headers.token;
                let ip = req.ip;
                let result = await self.authenticationService.verifyToken(token, ip);
                res.sendOk(result);
            } catch (error) {
                res.sendError(error);
            }
        })
    }
}
module.exports = AuthenticationController;
