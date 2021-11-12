/* eslint-disable no-undef */

describe('Police View', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000/mielentilatutkimus/upload_form')
    })

    it('Police view page can be opened', function() {
        cy.contains('Liitteiden lisääminen:')
    })

    it('Police view page has fillable forms', function() {
        cy.get('#email').type('pasi.polliisi@poliisi.fi')
        cy.get('#value').type('R 20 / 123')

        cy.get('#sendButton').click()
    })
})