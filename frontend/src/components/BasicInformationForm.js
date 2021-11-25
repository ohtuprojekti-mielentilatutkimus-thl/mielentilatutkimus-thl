import React, { useState } from 'react'
import basicInformationService from '../services/basicInformationService'
import { Paper, Grid, Button, TextField, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import validator from 'validator'
import { useStyles } from '../styles'

const BasicInformationForm = () => {

    const [admissionNoteSenderOrganization, setAdmissionNoteSenderOrganization] = useState('')
    const [admissionNoteSender, setAdmissionNoteSender] = useState('')
    const [sendersEmail, setSendersEmail] = useState('')
    const [sendersPhoneNumber, setSendersPhoneNumber] = useState('')
    const [message, setMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

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

    const validateSendersEmail = () => {
        if (!validator.isEmail(sendersEmail)) {
            console.log('virheellinen email')
            setErrorMessage('Virheellinen sähköpostiosoite!')
            setTimeout(() => {
                setErrorMessage(null)
            }, 1000*7)
            return false
        }
        return true
    }

    const validateEmail = ( email ) => {
        return !validator.isEmail(email)
    }

    const validateField = ( field ) => {
        return validator.isEmpty(field)
    }

    const addBasicInformations = (event) => {
        event.preventDefault()

        const basicInformations = {
            admissionNoteSenderOrganization: admissionNoteSenderOrganization,
            admissionNoteSender: admissionNoteSender,
            sendersEmail: sendersEmail,
            sendersPhoneNumber: sendersPhoneNumber,
        }

        if (!validateSendersEmail()) {
            return
        }

        if (errorMessage === null) {
            basicInformationService
                .create(basicInformations)
                .then(response => {
                    console.log(response.data)
                    setMessage(`Perustietojen lähettäminen onnistui! Linkki mielentilatutkimuspyynnön luomiseen lähetetty osoitteeseen: ${basicInformations.sendersEmail}`)
                    setTimeout(() => {
                        setMessage(null)
                    }, 1000*7)
                })
                .catch(error => {
                    console.log(error)
                    setErrorMessage('Perustietojen lähettämisessä tapahtui virhe!')
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 1000*7)
                })
        }
        setAdmissionNoteSenderOrganization('')
        setAdmissionNoteSender('')
        setSendersEmail('')
        setSendersPhoneNumber('')
    }

    const classes = useStyles()

    return (

        <div className={classes.page}>
            {(message && <Alert severity="success">
                {message} </Alert>
            )}

            {(errorMessage && <Alert severity="error">
                {errorMessage}</Alert>
            )}


            <div style={{
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '5px'
            }}>
                <Typography variant={'h4'}>Lähettäjän perustiedot</Typography>
                <Typography variant={'body2'}>Lähetä perustiedot niin saat sähköpostiosoitteeseen linkin, jonka kautta pääset täyttämään mielentilatutkimuspyynnön.</Typography>

            </div>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>

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
                            container spacing={1}
                        >
                            <Grid item xs={6}>
                                <TextField id='setAdmissionNoteSender' value={admissionNoteSender} onChange={handleAdmissionNoteSenderChange}
                                    label='Nimi' variant='standard' margin='normal'
                                    required error={validateField(admissionNoteSender)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id='setadmissionNoteSendingOrganization' value={admissionNoteSenderOrganization} onChange={handleAdmissionNoteSenderOrganizationChange}
                                    label='Taho' variant='standard' margin='normal'
                                    required error={validateField(admissionNoteSenderOrganization)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id='setSendersEmail' value={sendersEmail} onChange={handleSendersEmailChange}
                                    label='Sähköposti' variant='standard' margin='normal'
                                    required error={validateEmail(sendersEmail)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id='setSendersPhoneNumber' value={sendersPhoneNumber} onChange={handleSendersPhoneNumberChange}
                                    label='Puhelinnumero' variant='standard' margin='normal'
                                    required error={validateField(sendersPhoneNumber)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button id='createBasicInformationsButton' type='submit' variant='outlined'>lähetä</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </div>
        </div>
    )
}

export default BasicInformationForm