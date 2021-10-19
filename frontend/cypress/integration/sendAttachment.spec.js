/* eslint-disable no-undef */

const helper = require('./test_helper')
import 'cypress-file-upload'

describe('Attach files in  Admission Form', function() {

    it('Post basic information form to get the id', function(){
        cy.request('DELETE', 'http://127.0.0.1:1080/email/all').then((res) => {
            expect(res.status).equal(200)
            cy.request('POST', 'http://localhost:3000/api/admissions/basic_information_form', {
                admissionNoteSender: helper.basic_information_input.admissionNoteSender,
                admissionNoteSenderOrganization: helper.basic_information_input.admissionNoteSenderOrganization,
                sendersEmail: helper.basic_information_input.sendersEmail,
                sendersPhoneNumber: helper.basic_information_input.sendersPhoneNumber
            }).then(() => {
                cy.wait(1000)
                cy.request('GET', 'http://127.0.0.1:1080/email').then((emails) => {
                    expect(emails.status).equal(200)
                    //expect(emails.body.length).equal(1)
                    const email_id = emails.body[0].id
                    const parts = emails.body[0].text.split('/')
                    const id_from_email = parts[parts.length-1].replace('\n','')
                    localStorage.setItem('sender_id', JSON.stringify(id_from_email))
                    const sender_id = localStorage.sender_id
                    const senders_id = sender_id.replace(/['"]+/g,'')

                    cy.request('DELETE', `http://127.0.0.1:1080/email/${email_id}`).then((res) => {
                        expect(res.status).equal(200)
                    })

                    cy.visit(`http://localhost:3000/admission_form/${senders_id}`)
                    cy.contains('Tutkimuspyynnön lähettäjän tiedot')

                    cy.intercept({
                        method: 'POST',
                        url: `/api/admissions/admission_form_attachment/${senders_id}`,
                    }).as('uploadApi')

                    cy.get('#name').type(helper.admission_form_input.name)
                    cy.get('#diaariNumber').type(helper.admission_form_input.diaariNumber)


                    const testFile = 'testfile.pdf'
                    const filePath = 'testfiles/' + testFile

                    const attachments = ['valituomio', 'poytakirja', 'haastehakemus', 'rikosrekisteriote', 'esitutkintapoytakirja', 'vangitsemispaatos']

                    for (const i in attachments) {
                        cy.get(`input[name="${attachments[i]}"]`).attachFile(filePath)
                        cy.contains('Lataa valittu tiedosto').click()
                        cy.wait('@uploadApi').then((interception) => {
                            assert.equal(testFile, interception.response.body.originalname)
                            assert.equal(attachments[i], interception.response.body.whichFile)
                            assert.equal('ok', interception.response.body.message)
                        })
                    }

                    cy.get('#createPersonButton').click()
                    cy.contains('Pyyntö lähetettiin onnistuneesti')
                })
            })
        })

    })
})
