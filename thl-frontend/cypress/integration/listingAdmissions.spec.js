/* eslint-disable no-undef */
import dayjs from 'dayjs'


var created_at = ''

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

        cy.request('POST', 'http://localhost:3001/api/admissions/admission_form', {
            admissionNoteSender: 'Sampo2',
            diaariNumber: '123456789',
            formState: 'AAAAAA'
        }).then(response => {

            localStorage.setItem('createdAt', dayjs(response.body.createdAt).format('DD.MM.YYYY HH:mm:ss'))
            const createdAt = localStorage.createdAt
            created_at = createdAt.replace(/['"]+/g,'')
        }
        )}
    )
})


describe('All admissions can be viewed', () => {

    it('New admission can be viewed', function () {

        cy.visit('http://localhost:3002/thl/thl-admissions')
        cy.contains('Lomakkeet')

        cy.get('a').last().click()
        cy.contains('Yleiset tutkittavan henkilön tiedot')
        cy.contains('Pyyntö saapunut')
        cy.contains('Sampo2')
        cy.contains('123456789')

        cy.get('#handleShowLessInfo').click()
        cy.contains('Lomakkeet')
    }
    )

    it('The state of the form can be changed', function () {

        cy.visit('http://localhost:3002/thl/thl-admissions')

        cy.contains('Lomakkeet')

        cy.get('a').last().click()
        cy.contains('Yleiset tutkittavan henkilön tiedot')
        cy.contains('Pyyntö saapunut')
        cy.contains('Sampo2')
        cy.contains('123456789')
        cy.get('[type="radio"]').eq(1).check()
        cy.contains('Päivitä lomakkeen tila').click()
        cy.contains('Lomakkeen tila: Pyyntö tarkastelussa')

        cy.get('#handleShowLessInfo').click()
        cy.contains('Lomakkeet')

        cy.get('a').last().click()
        cy.contains('Lomakkeen tila: Pyyntö tarkastelussa')

    })

    it('Listing view shows states correctly', function () {

        cy.visit('http://localhost:3002/thl/thl-admissions')

        cy.get('a').first().click()
        cy.get('[type="radio"]').eq(2).check()
        cy.contains('Päivitä lomakkeen tila').click()
        cy.get('#handleShowLessInfo').click()
        cy.get('#formState').first().contains('Pyydetty lisätietoja')

        cy.get('a').first().click()
        cy.get('[type="radio"]').eq(3).check()
        cy.contains('Päivitä lomakkeen tila').click()
        cy.get('#handleShowLessInfo').click()

        cy.get('#formState').first().contains('Saatu lisätietoja')
    })

    it('Sort by state sorts correctly', function () {

        cy.visit('http://localhost:3002/thl/thl-admissions')

        cy.contains('AAAAAA')
        cy.get('#sortState').click()
        cy.wait(200)

        cy.get('#admissionsListRow').first().contains('AAAAAA')
        cy.get('#sortState').click()
        cy.wait(200)

        cy.get('#admissionsListRow').first().contains('AAAAAA').should('not.exist')
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
}
)
