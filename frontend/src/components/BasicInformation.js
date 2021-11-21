import React from 'react'
import { Button } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Popover from '@material-ui/core/Popover'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'


const BasicInformation = ( { sender } ) => {

    return (
        <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
                <div>
                    <Button variant="contained" color="primary" {...bindTrigger(popupState)}>
                        <h5>Tutkimuspyynnön lähettäjän tiedot</h5>
                    </Button>
                    <Popover
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <Box m={1}>
                            <Typography>
                                <p>Nimi: {sender.admissionNoteSender}</p>
                                <p>Organisaatio: {sender.admissionNoteSenderOrganization}</p>
                                <p>Sähköposti: {sender.sendersEmail}</p>
                                <p>Puhelinnumero: {sender.sendersPhoneNumber}</p>
                            </Typography>
                        </Box>
                    </Popover>
                </div>
            )}
        </PopupState>
    )
}
export default BasicInformation