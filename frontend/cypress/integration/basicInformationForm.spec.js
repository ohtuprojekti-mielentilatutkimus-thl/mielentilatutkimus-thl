/* eslint-disable no-undef */
const helper = require('./test_helper')

describe('Basic Information View', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000/mielentilatutkimus/basic_information_form')
    })

    it('Basic information page can be opened', function() {
        cy.contains('Lähettäjän perustiedot')
    })

    it('Basic information page has fillable forms', function() {
        cy.get('#setAdmissionNoteSender').type(helper.basic_information_input.sender)
        cy.get('#setadmissionNoteSendingOrganization').type(helper.basic_information_input.organization)
        cy.get('#setSendersEmail').type(helper.basic_information_input.email)
        cy.get('#setSendersPhoneNumber').type(helper.basic_information_input.phoneNumber)

        cy.get('#createBasicInformationsButton').click()

        cy.contains('Perustietojen lähettäminen onnistui!')
    })

    it('Basic information form validates email address', function () {
        cy.get('#setAdmissionNoteSender').type(helper.basic_information_input.sender)
        cy.get('#setadmissionNoteSendingOrganization').type(helper.basic_information_input.organization)
        cy.get('#setSendersEmail').type('tomi.tuomari@vaaramuoto.fi')
        cy.get('#setSendersPhoneNumber').type(helper.basic_information_input.phoneNumber)

        cy.get('#createBasicInformationsButton').click()

        cy.contains('Perustietojen lähettämisessä tapahtui virhe!')
    })

    it('Basic information form cannot be send if a field is empty', function () {
        cy.get('#setAdmissionNoteSender').type(helper.basic_information_input.sender)
        cy.get('#setadmissionNoteSendingOrganization').type(helper.basic_information_input.organization)
        cy.get('#setSendersEmail').type(helper.basic_information_input.email)

        cy.get('#createBasicInformationsButton').click()
        cy.get('input:invalid').should('have.length',1)
    })
})