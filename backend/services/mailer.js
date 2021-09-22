const config = require('../utils/config')
const nodemailer = require('nodemailer')

const sendMail = (email, subject, text) => {
    let transporter = nodemailer.createTransport({
        host: config.EMAIL_SMTP,
        port: config.EMAIL_PORT,
        secure: false,
        tls: { rejectUnauthorized: false }
    })
    var mailOptions = {
        from: config.EMAIL_FROM,
        to: email,
        subject: subject,
        text: text
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

const sendLinkToAdmissionForm = (email, id) => {
    sendMail(email, 'Vahvistus',
        'Lähettäjän tiedot tallennettu.\n\nLähetä mielentilatutkimuspyyntö: ' + config.FORM_FRONTEND_URI + 'admission_form?basic_information_id=' + id)
}

const sendConfirmation = (email, diaari_nro, thl_id) => {
    sendMail(email, 'Vahvistus',
        'Tutkimuspyyntö vastaanotettu.\n\nLähettäjän diaarinumero: ' + diaari_nro + '\nthl_id:' + thl_id)
}

module.exports = { sendLinkToAdmissionForm, sendConfirmation }