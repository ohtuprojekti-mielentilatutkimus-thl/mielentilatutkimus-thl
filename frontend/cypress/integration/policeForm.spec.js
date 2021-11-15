/* eslint-disable no-undef */
const helper = require('./test_helper')


describe('From posting basic informations to police getting email for adding attachments', function() {

    it('adding admission', function(){

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
                    const parts = emails.body[0].text.split('/')
                    const id_from_email = parts[parts.length-1].replace('\n','')
                    localStorage.setItem('sender_id', JSON.stringify(id_from_email))
                    const sender_id = localStorage.sender_id
                    const senders_id = sender_id.replace(/['"]+/g,'')

                    cy.visit(`http://localhost:3000/admission_form/${senders_id}`)

                    cy.get('#date-picker')
                        .clear()
                        .type('\'22/02/2022\'{enter}')

                    cy.get('#deadlineDate')
                        .clear()
                        .type('\'11/11/2021\'{enter}')

                    var whichboolean = 0
                    for (const i in helper.admission_form_input) {
                        if (['basicInformationId', 'formSender', 'datePrescribedForPsychiatricAssesment', 'deadlineForProsecution'].includes(i) ||
                        i.includes('Ready')) {
                            continue
                        }
                        if (typeof(helper.admission_form_input[i]) === 'boolean') {
                            if (whichboolean === 0){
                                cy.get('#selectHazardAssesment').click()
                                cy.get('#0')
                                    .contains('Kyllä')
                                    .click()
                                whichboolean= +1
                                continue
                            } else {
                                cy.get('#selectIfProsecuted').click()
                                cy.get('#1')
                                    .contains('Ei')
                                    .click()
                                continue
                            }
                        }
                        cy.get('#' + i).type(helper.admission_form_input[i])
                    }
                    cy.get('#createPersonButton').click()
                })
            })
        })
    })

    it('police getting email for adding attachments', function(){

        cy.request('DELETE', 'http://127.0.0.1:1080/email/all').then((res) => {
            expect(res.status).equal(200)

            cy.request('POST', 'http://localhost:3000/api/admissions/upload_form', {
                email: 'pasi.polliisi@poliisi.fi',
                value: helper.admission_form_input.diaariNumber
            }).then(() => {
                cy.wait(1000)

                cy.request('GET', 'http://127.0.0.1:1080/email').then((emails) => {
                    expect(emails.status).equal(200)

                    assert.equal(emails.body[0].headers.to, 'pasi.polliisi@poliisi.fi')
                    assert.equal(emails.body[0].subject, 'Liitteiden lisäämisen linkki')

                    expect(emails.body[0].text.includes('Tutkimuspyyntö vastaanotettu'))
                    expect(emails.body[0].text.includes(helper.admission_form_input.diaariNumber))
                    expect(emails.body[0].text.includes('voit lähettää liitteitä koskien tapausta (', helper.admission_form_input.diaariNumber,')'))
                    const email_id = emails.body[0].id

                    cy.request('DELETE', `http://127.0.0.1:1080/email/${email_id}`).then((res) => {
                        expect(res.status).equal(200)
                    })
                })
            })
        })
    })

    it('police will not receive email if the diaari number does not exist', function(){

        cy.request('DELETE', 'http://127.0.0.1:1080/email/all').then((res) => {
            expect(res.status).equal(200)

            cy.request('POST', 'http://localhost:3000/api/admissions/upload_form', {
                email: 'pasi.polliisi@poliisi.fi',
                value: 'ABCDE 123'
            }).then(() => {
                cy.wait(1000)

                cy.request('GET', 'http://127.0.0.1:1080/email').then((emails) => {
                    expect(emails.body[0]).to.be.undefined
                })
            })
        })
    })

    it('if the senders domain is not @poliisi.fi, email is not received even though diaari number exists', function(){

        cy.request('DELETE', 'http://127.0.0.1:1080/email/all').then((res) => {
            expect(res.status).equal(200)

            cy.visit('http://localhost:3000/mielentilatutkimus/upload_form')

            cy.get('#email').type('pasi.feikkipolliisi@feikkipoliisi.fi')
            cy.get('#value').type(helper.admission_form_input.diaariNumber)
            cy.get('#sendButton').click()

            cy.wait(1000)

            cy.request('GET', 'http://127.0.0.1:1080/email').then((emails) => {
                expect(emails.body[0]).to.be.undefined
            })
        })
    })
})


