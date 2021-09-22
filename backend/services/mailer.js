const config = require('../utils/config')
const nodemailer = require('nodemailer')


let transporter = nodemailer.createTransport({
    host: config.EMAIL_SMTP,
    port: config.EMAIL_PORT,
    secure: false,
    tls: { rejectUnauthorized: false }
})

const sendLinkToAdmissionForm = (email, id) => {
    var mailOptions = {
        from: config.EMAIL_FROM,
        to: email,
        subject: 'Vahvistus',
        text: 'Lähettäjän tiedot tallennettu.\n\nLähetä mielentilatutkimuspyyntö: ' + config.FORM_FRONTEND_URI + 'admission_form/basic_information_id=' + id
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

const sendConfirmation = (email, diaari_nro, thl_id) => {
    var mailOptions = {
        from: config.EMAIL_FROM,
        to: email,
        subject: 'Vahvistus',
        text: 'Tutkimuspyyntö vastaanotettu.\n\nLähettäjän diaarinumero: ' + diaari_nro + '\nthl_id:' + thl_id

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


module.exports = { sendLinkToAdmissionForm, sendConfirmation }