const userRepository = require('../repository/userrepository');
const demoError = require('../dto/demoerror');
const Constants = require('../constant/constant');

class UserService {
    constructor() {
        this.userRepository = new userRepository();
    }

    async signUp(username, email_address, password, first_name, last_name) {
        try {
            return await this.userRepository.addUser(username, email_address, password, first_name, last_name);
        } catch (error) {
            if (error instanceof demoError) throw error;
            throw new demoError(Constants.ERROR_CODE.BAD_REQUEST, Constants.ERROR_TYPE.API, Constants.ERROR_MAP.FAILED_TO_SIGN_UP);
        }
    }
}

module.exports = UserService; 