const constants = require('../constant/constant');

class errorService {
    constructor() {
    }

    getMessage(errorCode, errorType, errorKey) {
        // Exception will be thrown if the ErrorCode + LanguageId combination is not found
        // Catch this exception and proceed to get the defaut error message
        var message
        try {
            try {
                message = constants.ErrorConfiguration[errorType][errorCode][errorKey];
            } catch (ex) {
                message = constants.ErrorConfiguration[constants.ERROR_TYPE.API][errorCode][constants.ERROR_MAP.DEFAULT_KEY_ERROR];
            }
        }
        catch (ex) {
            message = constants.ErrorConfiguration[constants.ERROR_TYPE.API][constants.DEFAULT_ERROR_CODE][constants.ERROR_MAP.DEFAULT_KEY_ERROR];
        }
        return message;
    }
}

module.exports = errorService;