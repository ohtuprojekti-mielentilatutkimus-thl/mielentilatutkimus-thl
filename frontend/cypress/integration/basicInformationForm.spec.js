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
        cy.get('#setAdmissionNoteSender').type(helper.basic_information_input.admissionNoteSender)
        cy.get('#setadmissionNoteSendingOrganization').type(helper.basic_information_input.admissionNoteSenderOrganization)
        cy.get('#setSendersEmail').type(helper.basic_information_input.sendersEmail)
        cy.get('#setSendersPhoneNumber').type(helper.basic_information_input.sendersPhoneNumber)

        cy.get('#createBasicInformationsButton').click()

        cy.contains('Perustietojen lähettäminen onnistui!')


    })
})