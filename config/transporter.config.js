const nodemailer = require('nodemailer');
const config = require('./index');


let transporter = nodemailer.createTransport({
    host: config.SMTP_MAIL_HOST,
    port: config.SMTP_MAIL_PORT,
    secure: false,
    auth: {
        user: config.SMTP_MAIL_USERNAME, // generated user
        pass: config.SMTP_MAIL_PASSWORD  // generated password
    }, 
});

module.exports = transporter;