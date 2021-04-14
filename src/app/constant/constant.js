module.exports = Object.freeze({

    // encryption constants
    SALT_WORK_FACTOR:10,
    ALGORITHM: 'aes-256-ctr',
    EXPIRES: 4320,
    MONGO_TIME_ZONE_DEFAULT: -5,
    VERIFICATION_EXPIRES: 24,
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
    }
});
