module.exports = function (data, message, violations){
	return {
		"message" : (!message ? null : message),
		"responseData" : (data === undefined || data === null ? null : data),
		"status" : (violations === undefined || violations === null || violations.length == 0 ? "success" : "fail"),
		"timeStamp" : new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
		"violations" : (!violations ? null : violations)
	}
}