const config = require('../utils/config')
const logger = require('../utils/logger')
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
        text: 'Lähettäjän tiedot tallennettu.\n\nLähetä mielentilatutkimuspyyntö: ' + config.FORM_FRONTEND_URI + 'admission_form/' + id
    }
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            logger.info(err)
        }
        if (info) {
            logger.info(info)
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
            logger.info(err)
        }
        if (info) {
            logger.info(info)
        }
    })
}

const requestAdditionalInfoFromSender = (email, id, additional_info) => {
    var mailOptions = {
        from: config.EMAIL_FROM,
        to: email,
        subject: 'Mielentilatutkimuspyyntö vaatii lisätietoja',
        text: 'Hei, tutkimuspyynnössäsi on puutteita. Seuraavia lisätietoja pyydetään:\n\n ' + additional_info + '\n\n Lähetä tutkimuspyynnön tiedot uudelleen: ' + config.FORM_FRONTEND_URI + 'admission_form/' + id +'/edit'

    }
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            logger.info(err)
        }
        if (info) {
            logger.info(info)
        }
    })
}


module.exports = { sendLinkToAdmissionForm, sendConfirmation, requestAdditionalInfoFromSender }