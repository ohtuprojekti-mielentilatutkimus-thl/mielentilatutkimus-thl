import React from 'react'


const BasicInformation = ( { sender } ) => {

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