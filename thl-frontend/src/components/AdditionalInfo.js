import React, { useState } from 'react'
import { Grid, DialogTitle, DialogActions, Button, TextField, } from '@mui/material'
import formService from '../services/formService'
import useMessage from '../utils/messageHook'
import Messages from './Messages'

const AdditionalInfo = ({ form, updateForms, handleClose }) => {

    const [additionalInfo, setAdditionalInfo] = useState ('')

    const msg = useMessage()

    const requestAdditionalInfo = () => {
        const infoObject= {
            sender: form.basicInformation.email,
            id: form.id,
            additional_info : additionalInfo
        }

        msg.clear()

        const updateFormState = { ...form, formState: 'Pyydetty lisätietoja' }

        var error = false

        formService
            .askForInfo(infoObject)
            .then(() => {
                setAdditionalInfo('')
                msg.setMsg('Muokkauspyyntö lähetetty', 7, handleClose)
            }
            )
            .catch(() => {
                error = true
                msg.setErrorMsg('Muokkauspyynnön lähettämisessä tapahtui virhe!', 7)
            })

        if(!error) {
            formService.update(updateFormState.id, updateFormState)
                .then(() => {
                    updateForms()
                })
        }
    }

    return (
        <DialogTitle>
            {form.thlRequestId}
            <Grid>
                <TextField
                    id='inputForAdditionalInfo'
                    onChange= {(event) => setAdditionalInfo(event.target.value)}
                    multiline rows={10}
                    fullWidth label='Pyydä lisätietoja...'
                />
            </Grid>
            <DialogActions>
                <Button variant='outlined' color='primary' type='submit' onClick={requestAdditionalInfo} id='sendAdditionalInfo'>Lähetä</Button>
                <Button variant='contained' color='primary' align='right' onClick={handleClose}>Sulje</Button>
            </DialogActions>

            {(msg.messagesNotEmpty && <Messages msgArray={msg.messages} severity='success' />)}
            {(msg.errorMessagesNotEmpty && <Messages msgArray={msg.errorMessages} severity='error' />)}
        </DialogTitle>
    )
}

export default AdditionalInfo