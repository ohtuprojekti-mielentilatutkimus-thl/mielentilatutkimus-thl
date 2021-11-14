/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Grid, Dialog, DialogTitle, DialogActions, Button, TextField } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import formService from '../services/formService'

const SendToResearchUnit = ({ form, handleClose, updateForms }) => {

    const [message, setMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [researchUnit, setResearchUnit] = useState('')
    const [researchUnitInformation, setResearchUnitInformation] = useState('')


    const handleSend = (event) => {
        event.preventDefault()
        formService.updateResearchUnit( form.id, {
            researchUnit: researchUnit,
            researchUnitInformation: researchUnitInformation,
            formState: 'Tutkimuspaikka pyydetty'
        }).then(
            ( newForm ) => {
                setResearchUnit('')
                setResearchUnitInformation('')
                setMessage('Tutkimuspaikkapyyntö lähetetty onnistuneesti')
                updateForms(newForm.data)
                setTimeout(() => {
                    setMessage(null)
                    handleClose()
                }, 1000*5)
            })
            .catch(error => {
                setErrorMessage('Tutkimuspaikkapyynnön lähettämisessä tapahtui virhe!')
                setTimeout(() => {
                    setErrorMessage(null)
                }, 1000 * 5)
            })
    }



    return (
        <DialogTitle disableTypography>
            <h4>{form.thlRequestId}</h4>
            <form onSubmit = {handleSend}>
                <Grid>
                    <TextField id='inputForResearchUnit'value={researchUnit} onChange= {(event) => setResearchUnit(event.target.value)}
                        multiline rows={1} fullWidth label='Tutkimuspaikkayksikkö'/>
                </Grid>
                <Grid>
                    <TextField id= 'inputForInfoForResearchUnit'value={researchUnitInformation} onChange= {(event) => setResearchUnitInformation(event.target.value)}
                        multiline rows={10} fullWidth label='Lisätietoja...'/>
                </Grid>
                <Grid>
                    <Button id= 'buttonSendToResearchUnit'variant='outlined' color='primary' type='submit'>Lähetä</Button>
                </Grid>
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
                <DialogActions>
                    <Button variant='contained' color='primary' align='right' onClick={handleClose}>Sulje</Button>
                </DialogActions>

            </form>
        </DialogTitle>
    )

}

export default SendToResearchUnit