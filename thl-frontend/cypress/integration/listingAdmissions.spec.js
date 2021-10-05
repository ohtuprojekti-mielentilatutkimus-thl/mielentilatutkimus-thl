/* eslint-disable no-undef */

describe('when db is initialized with data', () => {

    it('Admission can be viewed', function () {

        cy.visit('http://localhost:3002/thl-admissions')
        cy.contains('Lomakkeet')

        cy.get('a').last().click()
        cy.contains('Yleiset tutkittavan henkilön tiedot')

        cy.contains('Outi')
        cy.contains('666')

        cy.get('#handleShowLessInfo').click()
        cy.contains('Lomakkeet')

    })
}
)

