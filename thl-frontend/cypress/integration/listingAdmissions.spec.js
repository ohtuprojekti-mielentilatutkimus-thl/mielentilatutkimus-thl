/* eslint-disable no-undef */
var created_at = ''

before(function() {
    cy.emptyDatabase()
    cy.wait(1000)

    cy.sendBasicInformation()
    cy.wait(1000)

    cy.sendAdmissionForm({
        formState: 'AAAAAA'
    })
    cy.wait(1000)

    cy.sendAdmissionForm({
        formState: 'BBBBBB'
    })
    cy.wait(1000)

    cy.sendAdmissionForm({
        formState: 'CCCCCC'
    }).then(() => {
        const createdAt = localStorage.createdAt
        created_at = createdAt
    })
})


describe('All admissions can be viewed', () => {

    it('New admission can be viewed', function () {

        cy.visit('http://localhost:3002/thl/thl-admissions')
        cy.contains('Lomakkeet')

        cy.get('a').last().click()

        cy.contains('Yleiset tutkittavan henkilön tiedot')
        cy.contains('Reijo')
        cy.contains('Tomi Tuomari')

        cy.get('#handleShowLessInfo').click()
        cy.contains('Lomakkeet')
    }
    )

    it('Sort by state sorts correctly', function () {

        cy.visit('http://localhost:3002/thl/thl-admissions')

        cy.contains('AAAAAA')
        cy.get('#sortState').click()
        cy.wait(200)

        cy.get('#admissionsListRow').first().contains('AAAAAA')
        cy.get('#sortState').click()
        cy.wait(200)

        cy.get('#admissionsListRow').first().contains('AAAAAA').should('not.exist')
        cy.get('#admissionsListRow').first().contains('CCCCCC')

    })

    it('Sort by time sorts correctly', function () {

        cy.visit('http://localhost:3002/thl/thl-admissions')

        cy.contains(created_at)
        cy.get('#sortTime').click()
        cy.wait(200)

        cy.get('#admissionsListRow').first().contains(created_at)
        cy.get('#sortTime').click()
        cy.wait(200)

        cy.get('#admissionsListRow').first().contains(created_at).should('not.exist')
    })

    it('The state of the form can be changed', function () {

        cy.visit('http://localhost:3002/thl/thl-admissions')

        cy.contains('Lomakkeet')

        cy.get('a').last().click()
        cy.contains('Yleiset tutkittavan henkilön tiedot')

        cy.contains('Reijo')
        cy.contains('Tomi Tuomari')
        cy.get('#selectState').click()
        cy.get('#1')
            .contains('Pyyntö tarkastelussa')
            .click()

        cy.wait(200)

        cy.get('#updateFormState').click()
        cy.contains('Pyyntö tarkastelussa')

        cy.get('#handleShowLessInfo').click()
        cy.contains('Lomakkeet')

        cy.get('a').last().click()
        cy.contains('Pyyntö tarkastelussa')

    })

    it('Listing view shows states correctly', function () {

        cy.visit('http://localhost:3002/thl/thl-admissions')

        cy.get('a').first().click()
        cy.get('#selectState').click()
        cy.get('#2')
            .contains('Pyydetty lisätietoja')
            .click()

        cy.get('#updateFormState').click()
        cy.get('#handleShowLessInfo').click()
        cy.get('#formState').first().contains('Pyydetty lisätietoja')

        cy.get('a').first().click()
        cy.get('#selectState').click()
        cy.get('#3')
            .contains('Saatu lisätietoja')
            .click()

        cy.get('#updateFormState').click()
        cy.get('#handleShowLessInfo').click()

        cy.get('#formState').first().contains('Saatu lisätietoja')
    })

}
)
