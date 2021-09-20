const nodemailer = require('nodemailer')

const sendConfirmation = (email) => {
    let transporter = nodemailer.createTransport({
        host: '127.0.0.1',
        port: 25,
        secure: false,
        tls: { rejectUnauthorized: false }
    })

    var mailOptions = {
        from: 'noreply@thl.nonexistent',
        to: email,
        subject: 'Vahvistus',
        text: 'Lomake lähetetty.'
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