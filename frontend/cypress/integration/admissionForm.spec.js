/* eslint-disable no-undef */
describe('Send Admission Form', function() {

    it('Post basic information form to get the id', function(){
        cy.request('DELETE', 'http://127.0.0.1:1080/email/all').then((res) => {
            expect(res.status).equal(200)
            cy.request('POST', 'http://localhost:3000/api/admissions/basic_information_form', {
                admissionNoteSender: 'Sampo',
                admissionNoteSenderOrganization: 'Organisaatio',
                sendersEmail: 'postia@sampolle.fi',
                sendersPhoneNumber: '060606606060'
            }).then(response => {
                cy.wait(1000)
                cy.request('GET', 'http://127.0.0.1:1080/email').then((emails) => {
                    expect(emails.status).equal(200)
                    expect(emails.body.length).equal(1)
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


                    cy.get('#name').type('Outi')
                    cy.get('#diaariNumber').type('666')

                    cy.get('#createPersonButton').click()
                    cy.contains('Pyyntö lähetettiin onnistuneesti')
                })
            })

        })

    })

})



