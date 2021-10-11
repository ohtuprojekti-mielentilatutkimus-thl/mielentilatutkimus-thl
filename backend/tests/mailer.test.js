/* eslint-disable no-undef */
const helper = require('./test_helper')
const MailDev = require('maildev')

const Mailer = require('../services/mailer.js')

const config = require('../utils/config')

jest.setTimeout(30000)

const maildev = new MailDev({ disableWeb: true, verbose: true, ip: '127.0.0.1' })
maildev.listen()

beforeEach(() => {
    maildev.deleteAllEmail(function(err) {
        expect(err).toBeNull()
    })
})

afterAll(() => {
    maildev.close()
})

test('Link to admission form is sent', async () => {
    Mailer.sendLinkToAdmissionForm(helper.basic_information_input.sendersEmail, '616014ea275e2df3c553b958')
    await new Promise((t) => setTimeout(t, 1000))
    maildev.getAllEmail(function (err, emails) {
        expect(err).toBeNull()
        expect(emails.length).toBe(1)
        email = emails[0]
        expect(email.to).toStrictEqual([{ address: helper.basic_information_input.sendersEmail, name: '' }])
        expect(email.text.includes('616014ea275e2df3c553b958')).toBe(true)
    })
})

test('Confirmation is sent', async () => {
    //await Mailer.sendConfirmation(helper.admission_form_input.email, helper.admission_form_input.diaariNumber, helper.thl_id)
    Mailer.sendConfirmation('smth@email.yes', 'R 20 / 123', '616014ea275e2df3c553b958')
    await new Promise((t) => setTimeout(t, 1000))
    maildev.getAllEmail(function (err, emails) {
        expect(err).toBeNull()
        expect(emails.length).toBe(1)
        email = emails[0]
        expect(email.to).toStrictEqual([{ address: 'smth@email.yes', name: '' }])
        expect(email.text.includes('R 20 / 123')).toBe(true)
        expect(email.text.includes('616014ea275e2df3c553b958')).toBe(true)
    })
})

test('Uses values from configuration 1', async () => {
    Mailer.sendLinkToAdmissionForm(helper.basic_information_input.sendersEmail, '616014ea275e2df3c553b958')
    await new Promise((t) => setTimeout(t, 1000))
    maildev.getAllEmail(function (err, emails) {
        expect(err).toBeNull()
        expect(emails.length).toBe(1)
        email = emails[0]
        expect(email.from).toStrictEqual([{ address: config.EMAIL_FROM, name: '' }])
        expect(email.text.includes(config.FORM_FRONTEND_URI)).toBe(true)
    })
})

test('Uses values from configuration 2', async () => {
    Mailer.sendConfirmation('smth@email.yes', 'R 20 / 123', '616014ea275e2df3c553b958')
    await new Promise((t) => setTimeout(t, 1000))
    maildev.getAllEmail(function (err, emails) {
        expect(err).toBeNull()
        expect(emails.length).toBe(1)
        email = emails[0]
        expect(email.from).toStrictEqual([{ address: config.EMAIL_FROM, name: '' }])
    })
})
