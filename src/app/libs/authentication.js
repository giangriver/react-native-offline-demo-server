const crypto = require("crypto");

Authentication = function() {
}

/*
---------------------------------------------------------------
Encrypt a string
---------------------------------------------------------------
*/
Authentication.prototype.encrypt_string = function(incoming_string) {

    // set up hash
    var hash_string = crypto.createHash('md5').update('process.env.DEMO_SECRET_KEY', 'utf-8').digest('hex').toUpperCase();

    // build iv
    var iv = new Buffer.alloc(16);

    // set up cipher
    let cipher = crypto.createCipheriv('aes-256-cbc', hash_string, iv);
    
    // set up encrypted data cipher
    let encryptedData = cipher.update(incoming_string, 'utf8', 'hex') + cipher.final('hex');
    
    // encrypt string
    var encrypted_string = encryptedData.toUpperCase();

    // return encrypted data
    return encrypted_string;
}

Authentication.prototype.tester = function() {
    console.log("Tester");
}

module.exports.Authentication = Authentication;