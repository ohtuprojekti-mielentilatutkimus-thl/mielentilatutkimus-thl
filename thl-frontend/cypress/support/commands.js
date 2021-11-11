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

import 'cypress-file-upload'
const testPdfName = 'test_pdf.pdf'

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
    return cy.request({
        url: 'http://localhost:3001/api/admissions/admission_form',
        method: 'POST',
        body: { ...admissionFormData, formState: data.formState }
    }).then(response => {
        localStorage.setItem('createdAt', dayjs(response.body.createdAt).format('DD.MM.YYYY HH:mm:ss'))
        const createdAt = localStorage.createdAt
        created_at = createdAt.replace(/['"]+/g,'')
        return response
    }
    )
})

Cypress.Commands.add('form_request', (url, formData) => {
    return cy
        .server()
        .route('POST', url)
        .as('formRequest')
        .window()
        .then(win => {
            var xhr = new win.XMLHttpRequest()
            xhr.open('POST', url)
            xhr.send(formData)
        })
        .wait('@formRequest')
})

Cypress.Commands.add('sendAttachment', ( { id, whichFile } ) => {
    const fileName = testPdfName

    cy.fixture(fileName, 'binary')
        .then(Cypress.Blob.binaryStringToBlob)
        .then((blob) => {

            // Build up the form
            const formData = new FormData()

            const filesInfo = [{ name: fileName, whichFile: whichFile }]

            formData.append('filesInfo', JSON.stringify(filesInfo))
            formData.append('files', blob, fileName)

            // Perform the request
            cy.form_request('http://localhost:3001/api/admissions/admission_form_attachment/'+id, formData)
        })


})
