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
    Mailer.sendLinkToAdmissionForm(helper.basicInfoFormTestData.sendersEmail, '616014ea275e2df3c553b958')
    await new Promise((t) => setTimeout(t, 1000))
    maildev.getAllEmail(function (err, emails) {
        expect(err).toBeNull()
        expect(emails.length).toBe(1)
        email = emails[0]
        expect(email.to).toStrictEqual([{ address: helper.basicInfoFormTestData.sendersEmail, name: '' }])
        expect(email.text.includes('616014ea275e2df3c553b958')).toBe(true)
    })
})

test('Link to editing admission form is sent', async () => {

    Mailer.requestAdditionalInfoFromSender(helper.basicInfoFormTestData.sendersEmail, '616014ea275e2df3c553b958', 'henkilötunnus puutteellinen')

    await new Promise((t) => setTimeout(t, 1000))
    maildev.getAllEmail(function (err, emails) {
        expect(err).toBeNull()
        expect(emails.length).toBe(1)
        email = emails[0]
        expect(email.to).toStrictEqual([{ address: helper.basicInfoFormTestData.sendersEmail, name: '' }])
        expect(email.text.includes('616014ea275e2df3c553b958')).toBe(true)
        expect(email.text.includes('henkilötunnus puutteellinen')).toBe(true)
    }) 
})

test('Link for police to adding attachments is sent', async () => {

    const infoObject= {
        email: 'pekka.pekkanen@poliisi.fi',
        value: 'R 20 / 123',
    }

    Mailer.sendLinkToAddingAttachments(infoObject.email, '616014ea275e2df3c553b958', 'diaarinumero: R 20 / 123')
    await new Promise((t) => setTimeout(t, 1000))
    maildev.getAllEmail(function (err, emails) {
        expect(err).toBeNull()
        expect(emails.length).toBe(1)
        email = emails[0]
        expect(email.to).toStrictEqual([{ address: infoObject.email, name: '' }])
        expect(email.text.includes('616014ea275e2df3c553b958')).toBe(true)
        expect(email.text.includes('voit lähettää liitteitä koskien tapausta (diaarinumero: R 20 / 123)')).toBe(true)
    })
})

test('Confirmation is sent', async () => {
    Mailer.sendConfirmation(helper.basicInfoFormTestData.sendersEmail, helper.admissionFormTestData.diaariNumber, '616014ea275e2df3c553b958')
    await new Promise((t) => setTimeout(t, 1000))
    maildev.getAllEmail(function (err, emails) {
        expect(err).toBeNull()
        expect(emails.length).toBe(1)
        email = emails[0]
        expect(email.to).toStrictEqual([{ address: helper.basicInfoFormTestData.sendersEmail, name: '' }])
        expect(email.text.includes(helper.admissionFormTestData.diaariNumber)).toBe(true)
        expect(email.text.includes('616014ea275e2df3c553b958')).toBe(true)
    })
})

test('Uses values from configuration 1', async () => {
    Mailer.sendLinkToAdmissionForm(helper.basicInfoFormTestData.sendersEmail, '616014ea275e2df3c553b958')
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
    Mailer.sendConfirmation(helper.basicInfoFormTestData.sendersEmail, helper.admissionFormTestData.diaariNumber, '616014ea275e2df3c553b958')
    await new Promise((t) => setTimeout(t, 1000))
    maildev.getAllEmail(function (err, emails) {
        expect(err).toBeNull()
        expect(emails.length).toBe(1)
        email = emails[0]
        expect(email.from).toStrictEqual([{ address: config.EMAIL_FROM, name: '' }])
    })
})

