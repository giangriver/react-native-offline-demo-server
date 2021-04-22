module.exports = Object.freeze({
    ROUTE_PREFIX: 'demo',
    SALT_WORK_FACTOR:10,
    ALGORITHM: 'aes-256-ctr',
    EXPIRES: 4320,
    MONGO_TIME_ZONE_DEFAULT: -5,
    VERIFICATION_EXPIRES: 24,
    templates: {
        PASSWORD_RESET: 1,
        PASSWORD_RESET_SMS: 2,
        EMAIL_VERIFICATION_CODE: 3,
        EMAIL_VERIFICATION_TOKEN: 4,
        PHONE_VERIFICATION_CODE: 5,
        WELCOME_EMAIL: 6,
        CONTACT_EMAIL: 7,
        INVITATION: 8,
        CONTACT_EMAIL_ADMIN: 9
    },
    variables: {
        FIRST_NAME: "$$FIRST_NAME$$",
        LAST_NAME: "$$LAST_NAME$$",
        EMAIL_ADDRESS: "$$EMAIL_ADDRESS$$",
        USERNAME: "$$USERNAME$$",
        PASSWORD_RESET_HOURS: "$$PASSWORD_RESET_HOURS$$",
        PASSWORD_RESET_URL: "$$PASSWORD_RESET_URL$$",
        PASSWORD_RESET_ID: "$$PASSWORD_RESET_ID$$",
        EMAIL_VERIFICATION_RESET_HOURS: "$$EMAIL_VERIFICATION_RESET_HOURS$$",
        EMAIL_VERIFICATION_URL: "$$EMAIL_VERIFICATION_URL$$",
        EMAIL_VERIFICATION_TOKEN: "$$EMAIL_VERIFICATION_TOKEN$$",
        EMAIL_VERIFICATION_CODE: "$$EMAIL_VERIFICATION_CODE$$",
        INVITATION_ACCEPT_URL: "$$INVITATION_ACCEPT_URL$$",
        INVITATION_TOKEN: "$$INVITATION_TOKEN$$",
        SUBJECT: "$$SUBJECT$$",
        MESSAGE: "$$MESSAGE$$",
        CODE: "$$CODE$$",
        VENDOR_NAME: "$$VENDOR_NAME$$",
        VENDOR_ADDRESS: "$$VENDOR_ADDRESS$$",
        VENDOR_PHONE: "$$VENDOR_PHONE$$"
    },
    mail: {
        PASSWORD_RESET_SUBJECT: "Password Reset",
        EMAIL_WELCOME: "Welcome to Demo!"
    },
    messages: {
        INTERNAL_ERROR: "An internal error has occurred",
        USER_NOT_FOUND: "Authentication failed. User not found.",
        INVALID_PASSWORD: "Authentication failed. Wrong password.",
        NEED_NEW_PASSWORD: "Password needs to be a new password.",
        NO_PASSWORD: "No password provided.",
        USERNAME_EXISTS: "A user with this username already exists.",
        EMAIL_EXISTS: "A user with this email address already exists.",
        UNAUTHORIZED_USER: "Unauthorized user",
        EXISTING_USER: "Username already exists",
        AUTHORIZED: "Authorized",
        INVALID_TOKEN: "Invalid token",
        TOKEN_EXPIRED: "Token has expired",
        INVITATION_REQUEST_ACCEPTED: "Invitation request accepted",
        PASSWORD_RESET_COMPLETE: "Password reset complete",
    },
    DEFAULT_ERROR_CODE: -999,
    ERROR_CODE_DELIMETER: '_',
    DEFAULT_LANGUAGEID: 'en-US',
    ERROR_TYPE: {
        API: 'API'
    },
    ERROR_MAP: {
        DEFAULT_KEY_ERROR: 'DEFAULT_KEY_ERROR',
        USER_NOT_FOUND: 'USER_NOT_FOUND',
        INVALID_PASSWORD: 'INVALID_PASSWORD',
        FAILED_TO_AUTHENTICATE: 'FAILED_TO_AUTHENTICATE',
        FAILED_TO_VERIFY_LOGIN_USER: 'FAILED_TO_VERIFY_LOGIN_USER',
        USERNAME_EXISTS: 'USERNAME_EXISTS',
        EMAIL_EXISTS: 'EMAIL_EXISTS',
        NO_PASSWORD: 'NO_PASSWORD',
        FAILED_TO_ADD_USER: 'FAILED_TO_ADD_USER',
        FAILED_TO_SIGN_UP: 'FAILED_TO_SIGN_UP',
        FAILED_TO_SAVE_NEW_USER: 'FAILED_TO_SAVE_NEW_USER',
        FAILED_TO_GET_CONTACTS: 'FAILED_TO_GET_CONTACTS',
        FAILED_TO_CREATE_CONTACT: 'FAILED_TO_CREATE_CONTACT',
        FAILED_TO_UPDATE_CONTACT: 'FAILED_TO_UPDATE_CONTACT',
        FAILED_TO_GET_CONTACT: 'FAILED_TO_GET_CONTACT',
        ID_NOT_FOUND: 'ID_NOT_FOUND',
        CONTACT_NOT_FOUND: 'CONTACT_NOT_FOUND',
        FAILED_TO_VERIFY_TOKEN: 'FAILED_TO_VERIFY_TOKEN',
        UNAUTHORIZED_USER: 'UNAUTHORIZED_USER',
        TOKEN_EXPIRED: 'TOKEN_EXPIRED',
        UNAUTHORIZED: 'UNAUTHORIZED',
        UNEXISTING_CONTACT: 'UNEXISTING_CONTACT'
    },
    ERROR_CODE: {
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401
    },
    ErrorConfiguration:
    {
        API:
        {
            [-999]: {
                "DEFAULT_KEY_ERROR": "There seems to be a problem performing your action, please try again."
            },
            [400]: {
                'USER_NOT_FOUND' : "Authentication failed. User not found.",
                'INVALID_PASSWORD': "Authentication failed. Wrong password.",
                'FAILED_TO_AUTHENTICATE': "Fail to get authentication",
                'FAILED_TO_VERIFY_LOGIN_USER': "Fail to verify login user",
                'USERNAME_EXISTS': "A user with this username or email address already exists.",
                'EMAIL_EXISTS': "A user with this email address already exists.",
                'NO_PASSWORD': "No password provided.",
                'FAILED_TO_ADD_USER': "Fail to add user",
                'FAILED_TO_SIGN_UP': "Fail to sign up",
                'FAILED_TO_SAVE_NEW_USER': "Fail to save new user",
                'FAILED_TO_GET_CONTACTS': "Fail to retrieve contacts",
                'FAILED_TO_CREATE_CONTACT': "Fail to create contact",
                'FAILED_TO_UPDATE_CONTACT': "Fail to update contact",
                'FAILED_TO_GET_CONTACT': "Fail to get detail of contact",
                'ID_NOT_FOUND': "Id contact is undefined",
                'CONTACT_NOT_FOUND': "Contact is not found",
                'FAILED_TO_VERIFY_TOKEN': "Fail to verify token",
                'UNEXISTING_CONTACT': "Contact id is not existing"
            },
            [401]: {
                'UNAUTHORIZED': "Token expired or invalid",
                'UNAUTHORIZED_USER': "Unauthorized user"
            }
        },
    },
});
