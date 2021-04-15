//-------------------------------------------------------------------
// email library
//-------------------------------------------------------------------

EmailLib = function() {

};

const nodemailer = require('nodemailer'),
      Constants = require('../constant/constant'),
      fs = require('fs');
      config = require('config');

const Config = config.get('App');

//-------------------------------------------------------------------
// send an email
//-------------------------------------------------------------------

EmailLib.prototype.sendEmail = function(user, to_address, emailData, template, callback) {

    console.log("Send Email to %s", to_address);
    
    let fileName = "";
    let subject = "";

    switch (template) {  
        case Constants.templates.WELCOME_EMAIL:
            fileName = "app/templates/welcomeemail.html",
            subject = Constants.mail.EMAIL_WELCOME
            break;    
        default:
            // nothing found
            console.log("Cant find email");
            callback();
            return;
            break;
    }

    // read file
    fs.readFile(fileName, 'utf8', (fileErr, data) => {  

        // check for error TODO: Log error
        if (fileErr) {

            console.log(fileErr);

            callback();
            return;
        };
        
        // get tempalte data
        var bodyHtml = data;
        console.log(user);
        
        // replace variables
        bodyHtml = bodyHtml.replace(Constants.variables.FIRST_NAME, (!user.first_name ? "" : user.first_name));
        bodyHtml = bodyHtml.replace(Constants.variables.LAST_NAME, (!user.first_name ? "" : user.last_name));
        bodyHtml = bodyHtml.replace(Constants.variables.EMAIL_ADDRESS, (!user.first_name ? "" : user.email_address));
        bodyHtml = bodyHtml.replace(Constants.variables.USERNAME, (!user.username ? "" : user.username));

        bodyHtml = bodyHtml.replace(Constants.variables.PASSWORD_RESET_HOURS, Config.password_reset_expiration_hours);
        bodyHtml = bodyHtml.replace(Constants.variables.PASSWORD_RESET_URL, Config.password_reset_url);
        bodyHtml = bodyHtml.replace(Constants.variables.PASSWORD_RESET_ID, (!user.token ? "" : user.token));

        bodyHtml = bodyHtml.replace(Constants.variables.EMAIL_VERIFICATION_RESET_HOURS, Constants.VERIFICATION_EXPIRES);
        bodyHtml = bodyHtml.replace(Constants.variables.EMAIL_VERIFICATION_URL, Config.verification_link_url);
        bodyHtml = bodyHtml.replace(Constants.variables.EMAIL_VERIFICATION_TOKEN, (!user.token ? "" : user.token));
        bodyHtml = bodyHtml.replace(Constants.variables.EMAIL_VERIFICATION_CODE, (!user.code ? "" : user.code));
        bodyHtml = bodyHtml.replace(Constants.variables.INVITATION_ACCEPT_URL, Config.invitation_link_url);
        bodyHtml = bodyHtml.replace(Constants.variables.INVITATION_TOKEN, (!emailData.token ? "" : emailData.token));

        bodyHtml = bodyHtml.replace(Constants.variables.SUBJECT, (!emailData ? "" : emailData.subject));
        bodyHtml = bodyHtml.replace(Constants.variables.MESSAGE, (!emailData ? "" : emailData.message));

        bodyHtml = bodyHtml.replace(Constants.variables.VENDOR_NAME, (!emailData ? "" : emailData.location_name));
        bodyHtml = bodyHtml.replace(Constants.variables.VENDOR_PHONE, (!emailData ? "" : emailData.phone));
        bodyHtml = bodyHtml.replace(Constants.variables.VENDOR_ADDRESS, (!emailData ? "" : emailData.full_address));

        // build email transport
        let transporter = nodemailer.createTransport({
            host: Config.mail.url,
            port: Config.mail.port,
            secure: true, 
            auth: {
                type: 'OAuth2',
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
                clientId: '43146796067-kgkppck6do6fjbuf7uqsgdb34sb7s3fq.apps.googleusercontent.com',
                clientSecret: 'JBSWOIZdqYNevg1doXkFizGL',
                refreshToken: '1//04suP2atdQpX_CgYIARAAGAQSNwF-L9IrB62oAyKHS_7dlvyReTqCCmxpM_eEdpin2d7wvXVDs4I83c1TlYelZlO0BJowQ-myvdM'
            }
        });

        // set options
        let mailOptions = {
            from: Config.mail.from,
            to: to_address,
            subject: subject,
            html: bodyHtml
        };

        // send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);

            // return 
            callback();
        });
    });


}

module.exports.EmailLib = EmailLib;
