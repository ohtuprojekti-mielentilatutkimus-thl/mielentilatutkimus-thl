import React from 'react'


const BasicInformation = ( { sender } ) => {
    //sender = sender[0]
    console.log(sender)
    return (
        <div>
            <h4>Lähettäjän tiedot</h4>
            <p>
                {sender.admissionNoteSenderOrganization} {sender.admissionNoteSender} {sender.sendersEmail} {sender.sendersPhonenumber}
            </p>
        </div>
    )
}

export default BasicInformation