import React, { useState } from 'react'
import formService from '../services/formService'
import { Grid, Dialog, DialogTitle, DialogActions, Button, TextField } from '@material-ui/core'
//import { Alert } from '@material-ui/lab'
import useMessage from '../utils/messageHook'
import Messages from './Messages'


const AdditionalInfo = ({ form, updateForms }) => {

    const [showAdditionalInfo, setShowAdditionalInfo] = useState(false)
    const [additionalInfo, setAdditionalInfo] = useState ('')
    /*
    const [message, setMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    */
    const msg = useMessage()

    const handleCloseAdditionalInfo = () => {
        setShowAdditionalInfo(false)
    }

    const handleShowAdditionalInfo = () => {
        setShowAdditionalInfo(true)
    }

    const handleAdditionalInfoChange = (event) => {
        setAdditionalInfo(event.target.value)
    }

    const requestAdditionalInfoFromSender = () => {
        const infoObject= {
            sender: form.sendersEmail,
            id: form.id,
            additional_info : additionalInfo
        }

        //setErrorMessage('')
        msg.clear()

        const updateFormState = { ...form, formState: 'Pyydetty lisätietoja' }

        var error = Boolean(false)

        formService
            .askForInfo(infoObject)
            .then(response => {
                console.log(response.data)
                setAdditionalInfo('')
                msg.setMsg('Muokkauspyyntö lähetetty', 7)
                /*
                setMessage('Muokkauspyyntö lähetetty')
                setTimeout(() => {
                    setMessage(null)
                    setShowAdditionalInfo(false)
                }, 1000*7)
                */
            }
            )
            .catch(error => {
                error = true
                console.log(error)
                msg.setErrorMsg('Muokkauspyynnön lähettämisessä tapahtui virhe!', 7)
                /*
                setErrorMessage('Muokkauspyynnön lähettämisessä tapahtui virhe!')
                setTimeout(() => {
                    setErrorMessage(null)
                }, 1000 * 7)
                */
            })


        if(!error) {
            formService.update(updateFormState.id, updateFormState)
                .then(response => {
                    updateForms(response.data)
                })
        }
    }


    if (showAdditionalInfo) {
        return (
            <Dialog open={showAdditionalInfo} onClose={handleCloseAdditionalInfo} maxWidth="md"  PaperProps={{
                style: {
                    backgroundColor: 'white',
                    boxShadow: 'none',
                    elevation:'3',
                    square:'false',
                    align:'left'
                },
            }} fullWidth>
                <DialogTitle disableTypography>
                    <h4>{form.thlRequestId}</h4>
                    <form onSubmit = {requestAdditionalInfoFromSender}>
                        <Grid>
                            <TextField id='inputForAdditionalInfo' value={additionalInfo} onChange= {handleAdditionalInfoChange} multiline rows={10} fullWidth label='Pyydä lisätietoja...'/>
                        </Grid>
                        <Grid>
                            {(msg.messagesNotEmpty && <Messages msgArray={msg.messages} severity='success' />)}
                        </Grid>
                        <Grid>
                            {(msg.errorMessagesNotEmpty && <Messages msgArray={msg.errorMessages} severity='error' />)}
                        </Grid>
                        <Grid>
                            <Button variant='outlined' color='primary' type='submit' id='sendAdditionalInfo'>Lähetä</Button>
                        </Grid>
                        <DialogActions>
                            <Button variant = 'contained' color='primary' align='right' id='closeAdditionalInfo' onClick = {handleCloseAdditionalInfo}>Sulje</Button>
                        </DialogActions>
                    </form>
                </DialogTitle>
            </Dialog>
        )
    }

    return (
        <Button variant='outlined' color='primary' id='askAdditionalInfo' onClick={handleShowAdditionalInfo}> Pyydä lisätietoja</Button>

    )

}
/*
<Grid>
    <div>
        {(message && <Alert severity="success">
            {message} </Alert>
        )}

    </div>
</Grid>
<Grid>
    <div>
        {(errorMessage && <Alert severity="error">
            {errorMessage} </Alert>
        )}

    </div>
</Grid>
*/

export default AdditionalInfo