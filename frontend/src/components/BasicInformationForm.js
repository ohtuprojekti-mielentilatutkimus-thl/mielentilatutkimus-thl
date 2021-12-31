import React, { useState } from 'react'
import basicInformationService from '../services/basicInformationService'
import { Paper, Grid, Button, TextField, Typography } from '@mui/material'
import validator from 'validator'
import { useStyles } from '../styles'

import useMessage from '../utils/messageHook'
import Messages from './Messages'

const BasicInformationForm = () => {

    const [organization, setOrganization] = useState('')
    const [sender, setSender] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setSendersPhoneNumber] = useState('')

    const msg = useMessage()

    document.title = 'Perustietolomake'

    const handleOrganizationChange = (event) => {
        setOrganization(event.target.value)
    }
    const handleSenderChange = (event) => {
        setSender(event.target.value)
    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }
    const handlePhoneNumberChange = (event) => {
        setSendersPhoneNumber(event.target.value)
    }

    const validateSendersEmail = () => {
        if (!validator.isEmail(email)) {
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
            organization: organization,
            sender: sender,
            email: email,
            phoneNumber: phoneNumber,
        }

        if (!validateSendersEmail()) {
            return
        }

        if (!msg.errorMessagesNotEmpty()) {
            basicInformationService
                .create(basicInformations)
                .then(response => {
                    console.log(response.data)
                    msg.setMsg(`Perustietojen lähettäminen onnistui! Linkki mielentilatutkimuspyynnön luomiseen lähetetty osoitteeseen: ${basicInformations.email}`, 7)
                })
                .catch(() => {
                    msg.setErrorMsg('Perustietojen lähettämisessä tapahtui virhe!', 7)
                })
        }
        setOrganization('')
        setSender('')
        setEmail('')
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
                    square={false}
                    align='center'
                    justify='center'
                >
                    <form onSubmit={addBasicInformations}>
                        <Grid
                            container spacing={1}
                        >
                            <Grid item xs={6}>
                                <TextField id='setAdmissionNoteSender' value={sender} onChange={handleSenderChange}
                                    label='Nimi' variant='standard' margin='normal'
                                    required error={validateField(sender)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id='setadmissionNoteSendingOrganization' value={organization} onChange={handleOrganizationChange}
                                    label='Taho' variant='standard' margin='normal'
                                    required error={validateField(organization)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id='setSendersEmail' value={email} onChange={handleEmailChange}
                                    label='Sähköposti' variant='standard' margin='normal'
                                    required error={validateEmail(email)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id='setSendersPhoneNumber' value={phoneNumber} onChange={handlePhoneNumberChange}
                                    label='Puhelinnumero' variant='standard' margin='normal'
                                    required error={validateField(phoneNumber)}
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