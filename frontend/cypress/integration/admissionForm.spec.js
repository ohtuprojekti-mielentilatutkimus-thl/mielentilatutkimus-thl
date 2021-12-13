/* eslint-disable no-undef */
const helper = require('./test_helper')
describe('Send Admission Form', function() {

    it('Post basic information form to get the id', function(){
        cy.request('DELETE', 'http://localhost:1080/email/all').then((res) => {
            expect(res.status).equal(200)
            cy.request('POST', 'http://localhost:3000/api/admissions/basic_information_form', {
                admissionNoteSender: helper.basic_information_input.admissionNoteSender,
                admissionNoteSenderOrganization: helper.basic_information_input.admissionNoteSenderOrganization,
                sendersEmail: helper.basic_information_input.sendersEmail,
                sendersPhoneNumber: helper.basic_information_input.sendersPhoneNumber
            }).then(() => {
                cy.wait(1000)
                cy.request('GET', 'http://localhost:1080/email').then((emails) => {
                    expect(emails.status).equal(200)
                    expect(emails.body.length).equal(1)
                    const email_id = emails.body[0].id
                    const parts = emails.body[0].text.split('/')
                    const id_from_email = parts[parts.length-1].replace('\n','')
                    localStorage.setItem('sender_id', JSON.stringify(id_from_email))
                    const sender_id = localStorage.sender_id
                    const senders_id = sender_id.replace(/['"]+/g,'')

                    cy.request('DELETE', `http://localhost:1080/email/${email_id}`).then((res) => {
                        expect(res.status).equal(200)
                    })

                    cy.visit(`http://localhost:3000/admission_form/${senders_id}`)
                    cy.contains('Tutkimuspyynnön lähettäjän tiedot')

                    cy.get('#date-picker')
                        .clear()
                        .type('\'22/02/2022\'')

                    cy.get('#deadlineDate')
                        .type('\'11/11/2021\'')

                    var whichboolean = 0
                    for (const i in helper.admission_form_input) {
                        if (['basicInformationId', 'formSender', 'sendersEmail', 'statement', 'statement_draft', 'datePrescribedForPsychiatricAssesment', 'deadlineForProsecution', 'researchUnit', 'researchUnitInformation'].includes(i) ||
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
                    cy.contains('Pyyntö lähetettiin onnistuneesti')

                })
            })

        })

    })

})



