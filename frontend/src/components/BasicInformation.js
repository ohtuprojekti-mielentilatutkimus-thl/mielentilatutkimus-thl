import React from 'react'
import { Button } from '@mui/material'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Popover from '@mui/material/Popover'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'


const BasicInformation = ( { basicInformation } ) => {
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
                            <Typography component={'span'}>
                                <p>Nimi: {basicInformation.sender}</p>
                                <p>Organisaatio: {basicInformation.organization}</p>
                                <p>Sähköposti: {basicInformation.email}</p>
                                <p>Puhelinnumero: {basicInformation.phoneNumber}</p>
                            </Typography>
                        </Box>
                    </Popover>
                </div>
            )}
        </PopupState>
    )
}
export default BasicInformation