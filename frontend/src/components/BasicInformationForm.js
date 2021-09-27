import React, { useState } from 'react'
import basicInformationService from '../services/basicInformationService'

const BasicInformationForm = () => {

    const [admissionNoteSenderOrganization, setAdmissionNoteSenderOrganization] = useState('')
    const [admissionNoteSender, setAdmissionNoteSender] = useState('')
    const [sendersEmail, setSendersEmail] = useState('')
    const [sendersPhoneNumber, setSendersPhoneNumber] = useState('')

    const handleAdmissionNoteSenderOrganizationChange = (event) => {
        setAdmissionNoteSenderOrganization(event.target.value)
    }
    const handleAdmissionNoteSenderChange = (event) => {
        setAdmissionNoteSender(event.target.value)
    }
    const handleSendersEmailChange = (event) => {
        setSendersEmail(event.target.value)
    }
    const handleSendersPhoneNumberChange = (event) => {
        setSendersPhoneNumber(event.target.value)
    }

    const addBasicInformations = (event) => {
        event.preventDefault()

        const basicInformations = {
            admissionNoteSenderOrganization: admissionNoteSenderOrganization,
            admissionNoteSender: admissionNoteSender,
            sendersEmail: sendersEmail,
            sendersPhoneNumber: sendersPhoneNumber,
        }
        basicInformationService
            .create(basicInformations)
            .then(response => {
                console.log(response.data)
            }
            )
        setAdmissionNoteSenderOrganization('')
        setAdmissionNoteSender('')
        setSendersEmail('')
        setSendersPhoneNumber('')

    }
    return (

        <div>
            <h2>Lähettäjän perustiedot:</h2>
            <p></p>

            <form onSubmit={addBasicInformations}>
                <div>
                Nimi:
                    <input id='setAdmissionNoteSender' value={admissionNoteSender} onChange={handleAdmissionNoteSenderChange} />
                </div>
                <div>
                Taho:
                    <input id='admissionNoteSendingOrganization' value={admissionNoteSenderOrganization} onChange={handleAdmissionNoteSenderOrganizationChange} />
                </div>
                <div>
                Sähköposti:
                    <input id='setSendersEmail' value={sendersEmail} onChange={handleSendersEmailChange} />
                </div>
                <div>
                Puhelinnumero:
                    <input id='setSendersPhonenumber' value={sendersPhoneNumber} onChange={handleSendersPhoneNumberChange} />
                </div>
                <button id='createBasicInformationsButton' type="submit">lisää</button>
            </form>
        </div>
    )
}

export default BasicInformationForm