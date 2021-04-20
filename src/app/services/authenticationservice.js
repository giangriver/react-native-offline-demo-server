const userRepository = require('../repository/userrepository');
const Authentication = require('../libs/authentication').Authentication;
const demoError = require('../dto/demoerror');
const Constants = require('../constant/constant');

class AuthenticationService {
    constructor() {
        this.userRepository = new userRepository();
    }

    async getAuthentication(username, email_address, password, ip) {
        try {
            let authentication = new Authentication();
            let encryptPass = authentication.encrypt_string(password);
            let result = await this.userRepository.verifyLoginUser(username, email_address, encryptPass, ip);
            return result;
        } catch (error) {
            if (error instanceof demoError) throw error;
            throw new demoError(Constants.ERROR_CODE.BAD_REQUEST, Constants.ERROR_TYPE.API, Constants.ERROR_MAP.FAILED_TO_AUTHENTICATE);
        }
    }

    async verifyToken(token, ip) {
        try {
            return await this.userRepository.verifyToken(token, ip);
        } catch (error) {
            if (error instanceof demoError) throw error;
            throw new demoError(Constants.ERROR_CODE.BAD_REQUEST, Constants.ERROR_TYPE.API, Constants.ERROR_MAP.FAILED_TO_VERIFY_TOKEN);
        }
    }
}

module.exports = AuthenticationService;