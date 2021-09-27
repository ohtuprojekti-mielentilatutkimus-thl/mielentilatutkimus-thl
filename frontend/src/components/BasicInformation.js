import React from 'react'


const BasicInformation = ( { sender } ) => {
    //sender = sender[0]
    console.log(sender)
    return (
        <div>
            <h4>Tutkimuspyynnön lähettäjän tiedot:</h4>
            <p>
                Nimi: {sender.admissionNoteSender}
                Organisaatio: {sender.admissionNoteSenderOrganization}
                Sähköpsoti: {sender.sendersEmail}
                Puhelinnumero: {sender.sendersPhonenumber}
            </p>
        </div>
    )
}
export default BasicInformation