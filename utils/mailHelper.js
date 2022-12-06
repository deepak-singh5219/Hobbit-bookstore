const transporter = require('../config/transporter.config');
const config = require('../config/index.js');

const mailHelper = async (options) => {

    const message = {
        from: config.SMTP_MAIL_EMAIL, // senders mail
        to: options.email, //list of receivers
        subject: options.subject, // subject line
        text: options.text, // plain text body

    }

    await transporter.sendMail(message);
}

module.exports = mailHelper;
