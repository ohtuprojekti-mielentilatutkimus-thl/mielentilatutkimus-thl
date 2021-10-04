/* eslint-disable no-undef */

describe('when db is initialized with data', () => {

    var id = ''

    it('New admission is added to list page', function () {

        cy.visit('http://localhost:3001/api/admissions/basic_information_form')
        cy.request('POST', 'http://localhost:3001/api/admissions/basic_information_form', {
            admissionNoteSender: 'Sampo',
            admissionNoteSenderOrganization: 'Organisaatio',
            sendersEmail: 'postia@sampolle.fi',
            sendersPhoneNumber: '060606606060'
        }).then(response => {
            localStorage.setItem('sender_id', JSON.stringify(response.body.id))
            const sender_id = localStorage.sender_id
            const senders_id = sender_id.replace(/['"]+/g,'')

            cy.visit(`http://localhost:3001/admission_form/${senders_id}`)
            cy.contains('Tutkimuspyynnön lähettäjän tiedot')

            cy.get('#name').type('Hellou')
            cy.get('#diaariNumber').type('838383838')

            cy.get('#createPersonButton').click()
            cy.contains('Pyyntö lähetettiin onnistuneesti')

            id = sender_id
            console.log(id)

        })
    }
    )
}
)