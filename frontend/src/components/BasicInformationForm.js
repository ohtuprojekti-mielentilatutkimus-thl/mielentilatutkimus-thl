import React, { useState } from 'react'
import basicInformationService from '../services/basicInformationService'
import { Paper, Grid, Button, TextField, Typography } from '@material-ui/core'
import validator from 'validator'
import { useStyles } from '../styles'

import useMessage from '../utils/messageHook'
import Messages from './Messages'

const BasicInformationForm = () => {

    const [admissionNoteSenderOrganization, setAdmissionNoteSenderOrganization] = useState('')
    const [admissionNoteSender, setAdmissionNoteSender] = useState('')
    const [sendersEmail, setSendersEmail] = useState('')
    const [sendersPhoneNumber, setSendersPhoneNumber] = useState('')

    const msg = useMessage()

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
            msg.setErrorMsg('Virheellinen sähköpostiosoite!', 7)
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

        if (!msg.errorMessagesNotEmpty()) {
            basicInformationService
                .create(basicInformations)
                .then(response => {
                    console.log(response.data)
                    msg.setMsg(`Perustietojen lähettäminen onnistui! Linkki mielentilatutkimuspyynnön luomiseen lähetetty osoitteeseen: ${basicInformations.sendersEmail}`, 7)
                })
                .catch(error => {
                    console.log(error)
                    msg.setErrorMsg('Perustietojen lähettämisessä tapahtui virhe!', 7)
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

            {(msg.messagesNotEmpty && <Messages msgArray={msg.messages} severity='success' />)}
            {(msg.errorMessagesNotEmpty && <Messages msgArray={msg.errorMessages} severity='error' />)}

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