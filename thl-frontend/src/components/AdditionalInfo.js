import React, { useState } from 'react'
import { Grid, DialogTitle, DialogActions, Button, TextField, } from '@material-ui/core'
import formService from '../services/formService'
import useMessage from '../utils/messageHook'
import Messages from './Messages'

const AdditionalInfo = ({ form, updateForms, handleClose }) => {

    const [additionalInfo, setAdditionalInfo] = useState ('')

    const msg = useMessage()

    const requestAdditionalInfo = () => {
        const infoObject= {
            sender: form.sendersEmail,
            id: form.id,
            additional_info : additionalInfo
        }

        msg.clear()

        const updateFormState = { ...form, formState: 'Pyydetty lisätietoja' }

        var err = false

        formService
            .askForInfo(infoObject)
            .then(response => {
                console.log(response.data)
                setAdditionalInfo('')
                msg.setMsg('Muokkauspyyntö lähetetty', 7, handleClose)
            }
            )
            .catch(error => {
                err = true
                console.log(error)
                msg.setErrorMsg('Muokkauspyynnön lähettämisessä tapahtui virhe!', 7)
            })

        if(!err) {
            formService.update(updateFormState.id, updateFormState)
                .then(response => {
                    updateForms(response.data)
                })
        }
    }

    return (
        <DialogTitle disableTypography>
            <h4>{form.thlRequestId}</h4>
            <Grid>
                <TextField
                    id='inputForAdditionalInfo'
                    onChange= {(event) => setAdditionalInfo(event.target.value)}
                    multiline rows={10}
                    fullWidth label='Pyydä lisätietoja...'
                />
            </Grid>
            <Grid>
                <Button variant='outlined' color='primary' type='submit' onClick={requestAdditionalInfo} id='sendAdditionalInfo'>Lähetä</Button>
            </Grid>
            <DialogActions>
                <Button variant='contained' color='primary' align='right' onClick={handleClose}>Sulje</Button>
            </DialogActions>

            {(msg.messagesNotEmpty && <Messages msgArray={msg.messages} severity='success' />)}
            {(msg.errorMessagesNotEmpty && <Messages msgArray={msg.errorMessages} severity='error' />)}
        </DialogTitle>
    )
}

export default AdditionalInfo