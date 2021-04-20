const demoError = require('../dto/demoerror');
const mongoose = require('mongoose');
const Constants = require('../constant/constant');
const jwt = require('jsonwebtoken');
const MODULE_NAME = 'UserRepository';
const async = require('async');

const User = require('../models/user').UserModel;

class UserRepository {
    constructor() {
        this.error = new demoError();
    }

    async verifyLoginUser(username, email_address, password, ip) {
        const METHOD_NAME = "verifyLoginUser";
        try {
            const conditionFindLoginUser = {
                $or: [
                    { username: username },
                    { email_address: email_address }
                ],
                deleted_date: null
            };
            let users = await User.find(conditionFindLoginUser)
                .select("username password email_address first_name last_name")
                .exec();

            if (users.length === 0) {
                this.error.errorCode = Constants.ERROR_CODE.BAD_REQUEST;
                this.error.errorType = Constants.ERROR_TYPE.API;
                this.error.errorKey = Constants.ERROR_MAP.USER_NOT_FOUND;
                throw this.error;
            }

            // get user
            var user = users[0];
            console.log(user.username + " logged in");

            // check password
            if (user.password != password) {
                this.error.errorCode = Constants.ERROR_CODE.BAD_REQUEST;
                this.error.errorType = Constants.ERROR_TYPE.API;
                this.error.errorKey = Constants.ERROR_MAP.INVALID_PASSWORD;
                throw this.error;
            }
            // create a token
            var token = jwt.sign({
                iat: Math.floor(Date.now() / 1000) - 30,
                expiresIn: Constants.EXPIRES,
                ip: ip,
                email_address: user.email_address,
                username: user.username
            }, process.env.DEMO_JWT_SECRET_KEY);
            return {
                token: token,
                expiresIn: Constants.EXPIRES,
                expiryDate: parseInt((Math.floor(Date.now() / 1000) - 30) + (Constants.EXPIRES * 60)),
                username: user.username,
                email_address: user.email_address,
                first_name: user.first_name,
                last_name: user.last_name
            };
        } catch (error) {
            if (error instanceof demoError) throw error;
            throw new demoError(Constants.ERROR_CODE.BAD_REQUEST, Constants.ERROR_TYPE.API, Constants.ERROR_MAP.FAILED_TO_VERIFY_LOGIN_USER);
        }
    }

    async addUser(username, email_address, password, first_name, last_name) {
        try {
            const METHOD_NAME = "signUpAccount";
            const conditionFindExistingUser = {
                $or: [
                    { username: username },
                    { email_address: email_address }
                ],
                deleted_date: null
            };
            let existingUser = await User.findOne(conditionFindExistingUser).exec();
            if (existingUser) {
                this.error.errorCode = Constants.ERROR_CODE.BAD_REQUEST;
                this.error.errorType = Constants.ERROR_TYPE.API;
                this.error.errorKey = Constants.ERROR_MAP.USERNAME_EXISTS;
                throw this.error;
            }

            if (!password) {
                this.error.errorCode = Constants.ERROR_CODE.BAD_REQUEST;
                this.error.errorType = Constants.ERROR_TYPE.API;
                this.error.errorKey = Constants.ERROR_MAP.NO_PASSWORD;
                throw this.error;
            }

            // create new state
            var user = new User({
                username: username,
                password: password,
                email_address: email_address,
                first_name: first_name,
                last_name: last_name
            });

            user = await user.save();
            user.password = '###';
            return user;

            // return user.save().then(user_added => {
            //     user.password = '#####';
            //     return user;
            // }).catch(err => {
            //     this.error.errorCode = Constants.ERROR_CODE.BAD_REQUEST;
            //     this.error.errorType = Constants.ERROR_TYPE.API;
            //     this.error.errorKey = Constants.ERROR_MAP.FAILED_TO_ADD_USER;
            //     throw this.error;
            // });
        } catch (error) {
            if (error instanceof demoError) throw error;
            throw new demoError(Constants.ERROR_CODE.BAD_REQUEST, Constants.ERROR_TYPE.API, Constants.ERROR_MAP.FAILED_TO_ADD_USER);
        }
    }

    async verifyToken(token, ip) {
        try {
            if (!token) {
                this.error.errorCode = Constants.ERROR_CODE.UNAUTHORIZED;
                this.error.errorType = Constants.ERROR_TYPE.API;
                this.error.errorKey = Constants.ERROR_MAP.UNAUTHORIZED_USER;
                throw this.error;
            }

            let decoded = jwt.verify(token, process.env.DEMO_JWT_SECRET_KEY);

            // get expired date
            var dateNow = parseInt(new Date().getTime() / 1000);
            var expiryDate = +decoded.iat + (+decoded.expiresIn * Constants.EXPIRES);

            if (decoded.ip != ip) {
                this.error.errorCode = Constants.ERROR_CODE.UNAUTHORIZED;
                this.error.errorType = Constants.ERROR_TYPE.API;
                this.error.errorKey = Constants.ERROR_MAP.UNAUTHORIZED_USER;
                throw this.error;
            }

            // check expiration
            if (dateNow < expiryDate) {
                let users = await User.find({ username: decoded.username, deleted_date: null })
                    .select("username password email_address first_name last_name")
                    .exec();

                if (users.length === 0) {
                    this.error.errorCode = Constants.ERROR_CODE.BAD_REQUEST;
                    this.error.errorType = Constants.ERROR_TYPE.API;
                    this.error.errorKey = Constants.ERROR_MAP.USER_NOT_FOUND;
                    throw this.error;
                }

                // get user
                var user = users[0];

                // create a token
                var token = jwt.sign({
                    iat: Math.floor(Date.now() / 1000) - 30,
                    expiresIn: Constants.EXPIRES,
                    ip: ip,
                    email_address: user.email_address,
                    username: user.username
                }, process.env.DEMO_JWT_SECRET_KEY);

                return {
                    token: token,
                    expiresIn: Constants.EXPIRES,
                    expiryDate: parseInt((Math.floor(Date.now() / 1000) - 30) + (Constants.EXPIRES * 60)),
                    username: user.username,
                    email_address: user.email_address,
                    first_name: user.first_name,
                    last_name: user.last_name
                };

            } else {
                if (err) {
                    this.error.errorCode = Constants.ERROR_CODE.UNAUTHORIZED;
                    this.error.errorType = Constants.ERROR_TYPE.API;
                    this.error.errorKey = Constants.ERROR_MAP.UNAUTHORIZED_USER;
                    throw this.error;
                } else {
                    this.error.errorCode = Constants.ERROR_CODE.UNAUTHORIZED;
                    this.error.errorType = Constants.ERROR_TYPE.API;
                    this.error.errorKey = Constants.ERROR_MAP.UNAUTHORIZED;
                    throw this.error;
                }
            }
        } catch (error) {
            if (error instanceof demoError) throw error;
            throw new demoError(Constants.ERROR_CODE.BAD_REQUEST, Constants.ERROR_TYPE.API, Constants.ERROR_MAP.FAILED_TO_VERIFY_TOKEN);
        }
    }

}

module.exports = UserRepository;