const app = require('./app')
const logger = require('./utils/logger')
const http = require('http')
const server = http.createServer(app)

if (process.env.NODE_ENV !== 'production') {
    const MailDev = require('maildev')
    const maildev = new MailDev()

    maildev.listen()

    maildev.on('new', (email) => {
        logger.info(`Received new email with subject: ${email.subject}`)
    })
}

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})

