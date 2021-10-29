/* eslint-disable no-undef */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import dayjs from 'dayjs'
const testData = require('./test_data.json')

var senders_id = ''
var created_at = ''

const admissionFormData = testData.admission_forms[0]
let basicInfoFormTestData = testData.basic_info_forms[0]



Cypress.Commands.add('emptyDatabase', () => {
    cy.request({
        url: 'http://localhost:3001/tests/reset',
        method: 'POST',
    })
})


Cypress.Commands.add('sendBasicInformation', () => {
    cy.request({
        url: 'http://localhost:3001/api/admissions/basic_information_form',
        method: 'POST',
        body: {
            ...basicInfoFormTestData
        },
    }).then(response => {

        localStorage.setItem('sender_id', JSON.stringify(response.body.id))
        const sender_id = localStorage.sender_id
        senders_id = sender_id.replace(/['"]+/g,'')
        console.log(senders_id)}
    )
})

Cypress.Commands.add('sendAdmissionForm', ( data ) => {
    cy.request({
        url: 'http://localhost:3001/api/admissions/admission_form',
        method: 'POST',
        body: { ...admissionFormData, formState: data.formState, prosecuted: data.prosecuted }
    }).then(response => {
        localStorage.setItem('createdAt', dayjs(response.body.createdAt).format('DD.MM.YYYY HH:mm:ss'))
        const createdAt = localStorage.createdAt
        created_at = createdAt.replace(/['"]+/g,'')
        console.log(created_at)
    }
    )
})

