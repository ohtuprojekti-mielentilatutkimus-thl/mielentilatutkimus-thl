import React, { useState } from 'react'
import policeInformationService from '../services/policeInformationService'
import { Paper, Grid, Button, TextField, Typography } from '@material-ui/core'
import { useStyles } from '../styles'

const PoliceViewForm = () => {

    const [email, setEmail] = useState('')
    const [value, setValue] = useState('')

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }
    const handleValueChange = (event) => {
        setValue(event.target.value)
    }

    const addPoliceInformations = (event) => {
        event.preventDefault()

        const infoObject= {
            email: email,
            value: value,
        }
        policeInformationService
            .askForAddingAttachmentLink(infoObject)
            .then(response => {
                console.log(response.data)
                setEmail('')
                setValue('')
            }
            )
            .catch(error => {
                console.log(error)
                setEmail('')
                setValue('')
            })
    }
    const classes = useStyles()

    return (

        <div className={classes.page}>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
            }}>

                <Typography variant={'h4'}>Liitteiden lisääminen: </Typography>
            </div>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
            }}>
                <Typography variant={'h6'}>Syötä sähköposti, jonne haluat vastaanottaa linkin, sekä tapauksen THL-id:n</Typography>
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
                    <form onSubmit={addPoliceInformations}>
                        <Grid
                            container spacing={1}
                        >
                            <Grid item xs={6}>
                                <TextField value={email} id='email' onChange={handleEmailChange}
                                    label='Sähköposti' variant='standard' margin='normal'
                                />
                            </Grid>
                            <Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField value={value} id='value' onChange={handleValueChange}
                                    label='THL-id' variant='standard' margin='normal'
                                />
                            </Grid>
                            <br></br>
                            <br></br>
                            <Grid item xs={12}>
                                <Button type='submit' id='sendButton' variant='outlined'>lähetä</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </div>
        </div>
    )
}

export default PoliceViewForm