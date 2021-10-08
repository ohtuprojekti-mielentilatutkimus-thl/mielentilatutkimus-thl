/* eslint-disable no-undef */
/*
describe('Admissions can be viewed', () => {

    beforeEach(function() {

        var senders_id = ''

        cy.request('POST', 'http://localhost:3001/api/admissions/basic_information_form', {
            admissionNoteSender: 'Sampo',
            admissionNoteSenderOrganization: 'Organisaatio',
            sendersEmail: 'postia@sampolle.fi',
            sendersPhoneNumber: '060606606060'
        }).then(response => {

            localStorage.setItem('sender_id', JSON.stringify(response.body.id))
            const sender_id = localStorage.sender_id
            senders_id = sender_id.replace(/['"]+/g,'')
            console.log(senders_id)

            //   cy.request('POST', `http://localhost:3001/api/admissions/admission_form/${senders_id}`, {
            cy.request('POST', 'http://localhost:3001/api/admissions/admission_form', {
                admissionNoteSender: 'Sampo2',
                diaariNumber: '123456789',
            })
        })
    })


    it('Admission can be viewed', function () {

        cy.visit('http://localhost:3002/mielentilatutkimus/thl-admissions')
        cy.contains('Lomakkeet')

        cy.get('a').last().click()
        cy.contains('Yleiset tutkittavan henkilön tiedot')
        cy.contains('123456789')

        cy.get('#handleShowLessInfo').click()
        cy.contains('Lomakkeet')
    }
    )
}
)
*/

