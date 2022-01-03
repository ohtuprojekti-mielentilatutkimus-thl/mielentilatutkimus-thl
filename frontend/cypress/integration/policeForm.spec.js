/* eslint-disable no-undef */
const helper = require('./test_helper')
import 'cypress-file-upload'

describe('From posting basic informations to police adding attachments', function() {

    var senders_id = ''

    it('adding admission', function(){

        cy.request('DELETE', 'http://localhost:1080/email/all').then((res) => {
            expect(res.status).equal(200)
        })

        cy.request('POST', 'http://localhost:3000/api/admissions/basic_information_form', {
            sender: helper.basic_information_input.sender,
            organization: helper.basic_information_input.organization,
            email: 'leo.lahettaja@helsinki.fi',
            phoneNumber: helper.basic_information_input.phoneNumber

        }).then(() => {

            cy.wait(1000)
            cy.request('GET', 'http://localhost:1080/email').then((emails) => {
                const parts = emails.body[0].text.split('/')
                const id_from_email = parts[parts.length-1].replace('\n','')
                localStorage.setItem('sender_id', JSON.stringify(id_from_email))
                const sender_id = localStorage.sender_id
                senders_id = sender_id.replace(/['"]+/g,'')

            }).then(() => {

                cy.wait(1000)
                cy.request('POST', 'http://localhost:3000/api/admissions/admission_form', {
                    name: helper.admission_form_input.name,
                    lastname: helper.admission_form_input.lastname,
                    diaariNumber: helper.admission_form_input.diaariNumber,
                    basicInformation: senders_id,
                    assistantsEmail: helper.admission_form_input.assistantsEmail,
                    legalGuardianEmail: helper.admission_form_input.legalGuardianEmail
                })
            })
        })
    })


    it('police getting email for adding attachments', function(){

        var admissionId = ''

        cy.request('GET', 'http://localhost:1080/email').then((emails) => {

            const parts = emails.body[1].text.split('/')
            const id_from_email = parts[parts.length-1].replace('\n','').replace('123thl_id:','').replace(/['"]+/g,'').trim()
            localStorage.setItem('admission_id', JSON.stringify(id_from_email))
            admissionId = localStorage.admission_id.replace(/['"]+/g,'')
        }).then(() => {

            cy.request('POST', 'http://localhost:3000/api/admissions/upload_form', {
                email: 'pasi.polliisi@poliisi.fi',
                value: admissionId

            }).then(() => {

                cy.wait(2000)

                cy.request('GET', 'http://localhost:1080/email').then((emails) => {

                    assert.equal(emails.body[2].headers.to, 'pasi.polliisi@poliisi.fi')
                    assert.equal(emails.body[2].subject, 'Liitteiden lisäämisen linkki')

                    expect(emails.body[2].text.includes('Tutkimuspyyntö vastaanotettu'))
                    expect(emails.body[2].text.includes(admissionId))
                    expect(emails.body[2].text.includes('voit lähettää liitteitä koskien tapausta ( THL-id: ', admissionId, ')'))
                    const email_id = emails.body[1].id

                    cy.request('DELETE', `http://localhost:1080/email/${email_id}`).then((res) => {
                        expect(res.status).equal(200)
                    })
                })
            })
        })
    })


    it('police adding attachments', function(){

        var admissionId = ''

        cy.request('GET', 'http://localhost:1080/email').then((emails) => {
            const parts = emails.body[1].text.split('/')
            const id_from_email = parts[parts.length-1].replace('\n','').replace('123thl_id:','').replace(/['"]+/g,'').trim()
            localStorage.setItem('admission_id', JSON.stringify(id_from_email))
            admissionId = localStorage.admission_id.replace(/['"]+/g,'')
        }).then(() => {

            cy.visit(`http://localhost:3000/upload_form/${admissionId}`)
            cy.wait(1000)
            cy.contains('Lataa liitteitä')

            const attachments = ['valituomio', 'poytakirja', 'haastehakemus', 'rikosrekisteriote', 'esitutkintapoytakirja', 'vangitsemispaatos']

            for (const i in attachments) {

                var testFile = `testfile${i}.pdf`
                var filePath = 'testfiles/' + testFile

                cy.get(`input[name="${attachments[i]}"]`).attachFile(filePath)
            }
            cy.contains('Lähetä').click()
            cy.wait(1000)
            cy.contains('Liitteiden lähetys onnistui')
        })
    })

    it('police will not receive email if the THL-id  does not exist', function(){


        cy.request({ failOnStatusCode: false, method: 'POST', url: 'http://localhost:3000/api/admissions/upload_form' }, {
            email: 'pasi.polliisi@poliisi.fi',
            value: 'ABCDE 123'
        }).then((res) => {
            expect(res.status).equal(500)
            cy.wait(1000)

            cy.request('GET', 'http://localhost:1080/email').then((emails) => {
                expect(emails.body[2]).to.be.undefined
            })
        })
    })

    it('if the senders domain is not @poliisi.fi, email is not received even though THL-id exists', function(){

        var admissionId = ''

        cy.request('GET', 'http://localhost:1080/email').then((emails) => {
            const parts = emails.body[1].text.split('/')
            const id_from_email = parts[parts.length-1].replace('\n','').replace('123thl_id:','').replace(/['"]+/g,'').trim()
            localStorage.setItem('admission_id', JSON.stringify(id_from_email))
            admissionId = localStorage.admission_id.replace(/['"]+/g,'')
        }).then(() => {

            cy.request('DELETE', 'http://localhost:1080/email/all').then((res) => {
                expect(res.status).equal(200)

                cy.visit('http://localhost:3000/mielentilatutkimus/upload_form')

                cy.get('#email').type('pasi.feikkipolliisi@feikkipoliisi.fi')
                cy.get('#value').type(admissionId)
                cy.get('#sendButton').click()

                cy.wait(1000)

                cy.request('GET', 'http://localhost:1080/email').then((emails) => {
                    expect(emails.body[0]).to.be.undefined
                })
            })
        })
    })
})


