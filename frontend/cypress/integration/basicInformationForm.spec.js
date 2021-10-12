/* eslint-disable no-undef */

describe('Basic Information View', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000/mielentilatutkimus/basic_information_form')
    })

    it('Basic information page can be opened', function() {
        cy.contains('Lähettäjän perustiedot')
    })

    it('Basic information page has fillable forms', function() {
        cy.get('#setAdmissionNoteSender').type('Testi lähettäjä')
        cy.get('#setadmissionNoteSendingOrganization').type('Organisaatio')
        cy.get('#setSendersEmail').type('polizia@yes.fi')
        cy.get('#setSendersPhoneNumber').type('0452572355')

        cy.get('#createBasicInformationsButton').click()

        cy.contains('Perustietojen lähettäminen onnistui!')


    })
})