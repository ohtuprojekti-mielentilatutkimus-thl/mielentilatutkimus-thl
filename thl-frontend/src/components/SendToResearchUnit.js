/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Grid, Dialog, DialogTitle, DialogActions, Button, TextField } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

const SendToResearchUnit = ({ form, handleClose }) => {

    const [message, setMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [researchUnit, setResearchUnit] = useState('')
    const [additionalInfo, setadditionalInfo] = useState('')


    const handleSend = () => {

    }

    return (
        <DialogTitle disableTypography>
            <h4>{form.thlRequestId}</h4>
            <form onSubmit = {handleSend}>
                <Grid>
                    <TextField value={researchUnit} onChange= {(event) => setResearchUnit(event.target.value)}
                        multiline rows={1} fullWidth label='Tutkimuspaikkayksikkö'/>
                </Grid>
                <Grid>
                    <TextField value={additionalInfo} onChange= {(event) => setadditionalInfo(event.target.value)}
                        multiline rows={10} fullWidth label='Pyydä lisätietoja...'/>
                </Grid>
                <Grid>
                    <Button variant='outlined' color='primary' type='submit'>Lähetä</Button>
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