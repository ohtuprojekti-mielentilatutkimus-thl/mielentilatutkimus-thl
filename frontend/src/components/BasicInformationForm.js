import React, { useState } from 'react'
import basicInformationService from '../services/basicInformationService'
import { Paper, Grid, Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const BasicInformationForm = () => {

    const [admissionNoteSenderOrganization, setAdmissionNoteSenderOrganization] = useState('')
    const [admissionNoteSender, setAdmissionNoteSender] = useState('')
    const [sendersEmail, setSendersEmail] = useState('')
    const [sendersPhoneNumber, setSendersPhoneNumber] = useState('')

    const handleAdmissionNoteSenderOrganizationChange = (event) => {
        setAdmissionNoteSenderOrganization(event.target.value)
    }
    const handleAdmissionNoteSenderChange = (event) => {
        setAdmissionNoteSender(event.target.value)
    }
    const handleSendersEmailChange = (event) => {
        setSendersEmail(event.target.value)
    }
    const handleSendersPhoneNumberChange = (event) => {
        setSendersPhoneNumber(event.target.value)
    }

    const addBasicInformations = (event) => {
        event.preventDefault()

        const basicInformations = {
            admissionNoteSenderOrganization: admissionNoteSenderOrganization,
            admissionNoteSender: admissionNoteSender,
            sendersEmail: sendersEmail,
            sendersPhoneNumber: sendersPhoneNumber,
        }
        basicInformationService
            .create(basicInformations)
            .then(response => {
                console.log(response.data)
            }
            )
        setAdmissionNoteSenderOrganization('')
        setAdmissionNoteSender('')
        setSendersEmail('')
        setSendersPhoneNumber('')

    }

    const useStyles = makeStyles({
        form: {
            display: 'center',
            background: 'white',
            padding: '10px',
            borderWidth: '1px',
            width: '50%',
            height: '50%',
            align: 'center',
            justifyContent: 'center'
        },
        labelText: {
            fontSize: '12px',
            fontWeight: 'bold'
        }
    })

    const classes = useStyles()

    return (

        <div>
            <h2>Lähettäjän perustiedot:</h2>
            <Paper
                className={classes.form}
                variant='outlined'
                elevation={3}
                square={false}
                align='center'
                justify='center'
            >
                <form onSubmit={addBasicInformations}>
                    <Grid
                        container rowSpacing={2}
                        columnSpacing={{ xs: 2 }}
                    >
                        <Grid item xs={6}>
                            <div className={classes.labelText}>Nimi:</div>
                            <TextField id='setAdmissionNoteSender' value={admissionNoteSender} onChange={handleAdmissionNoteSenderChange} label='Nimi' variant='outlined' margin='normal'/>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.labelText}>Taho:</div>
                            <TextField id='admissionNoteSendingOrganization' value={admissionNoteSenderOrganization} onChange={handleAdmissionNoteSenderOrganizationChange} label='Taho' variant='outlined' margin='normal' />
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.labelText}>Sähköposti:</div>
                            <TextField id='setSendersEmail' value={sendersEmail} onChange={handleSendersEmailChange} label='Sähköposti' variant='outlined' margin='normal'/>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.labelText}>Puhelinnumero:</div>
                            <TextField id='setSendersPhoneNumber' value={sendersPhoneNumber} onChange={handleSendersPhonenumberChange} label='Puhelinnumero' variant='outlined' margin='normal'/>
                        </Grid>
                    </Grid>
                    <Button id='createBasicInformationsButton' type='submit' variant='outlined'>lisää</Button>
                </form>
            </Paper>
        </div>
    )
}

export default BasicInformationForm