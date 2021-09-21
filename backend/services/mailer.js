const config = require('../utils/config')
const nodemailer = require('nodemailer')

const sendConfirmation = (email, id) => {
    let transporter = nodemailer.createTransport({
        host: config.EMAIL_SMTP,
        port: config.EMAIL_PORT,
        secure: false,
        tls: { rejectUnauthorized: false }
    })

    var mailOptions = {
        from: config.EMAIL_FROM,
        to: email,
        subject: 'Vahvistus',
        text: 'Tiedot vastaanotettu.\n\nLähetä muutos: ' + config.FORM_FRONTEND_URI + '?change=true&old_id=' + id
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err)
        }
        if (info) {
            this.console.log(info)
        }
    })
}

module.exports = sendConfirmation