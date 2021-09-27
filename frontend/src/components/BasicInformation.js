import React from 'react'


const BasicInformation = ( { sender } ) => {
    return (
        <div>
            <h4>Tutkimuspyynnön lähettäjän tiedot:</h4>
            <div>
                Nimi: {sender.admissionNoteSender}
            </div>
            <div>
                Organisaatio: {sender.admissionNoteSenderOrganization}
            </div>
            <div>
                Sähköposti: {sender.sendersEmail}
            </div>
            <div>
                Puhelinnumero: {sender.sendersPhoneNumber}
            </div>
        </div>
    )
}
export default BasicInformation