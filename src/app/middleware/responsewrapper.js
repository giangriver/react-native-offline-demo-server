const constants = require("../constant/constant");
const errorService = require('../services/errorservice');
const violationDto = require("../dto/violationdto");
const responseTemplateDto = require("../dto/responsetemplatedto");
const demoError = require('../dto/demoerror');

module.exports = function (req, res, next) {
	let errService = new errorService();

	res.sendError = function (err) {
		let message = (err != null && err.hasOwnProperty("message") ? err.message : null);
		let violations = [];
		let errCode = err.errorCode || constants.ERROR_CODE.BAD_REQUEST;

		if (err instanceof demoError) {
			var errCodeMessage = errService.getMessage(err.errorCode, err.errorType, err.errorKey);

			if (errCodeMessage) {
				violations.push(new violationDto(
					err.errorCode, errCodeMessage
				));
			}
		}

		if (violations.length == 0) {
			violations.push(new violationDto(
				constants.DEFAULT_ERROR_CODE,
				errService.getMessage(constants.DEFAULT_ERROR_CODE, constants.ERROR_TYPE.API, constants.ERROR_MAP.DEFAULT_KEY_ERROR)
			));
		}
		res.status(errCode).send(new responseTemplateDto(null, message, violations));
	}

	res.sendOk = function (data) {
		res.send(new responseTemplateDto(data));
	}
	next()
}