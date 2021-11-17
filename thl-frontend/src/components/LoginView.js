import React, { useState } from 'react'
import loginUserService from '../services/loginUserService'
import { Paper, Grid, Button, TextField, FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import { useStyles } from '../styles'
import Typography from '@material-ui/core/Typography'
import validator from 'validator'
import { useHistory } from 'react-router-dom'

const LoginForm = () => {

    const [username, setUsername] = useState('')
    const [role, setRole] = useState('THL')
    let history = useHistory()

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }
    const handleRoleChange = (event) => {
        setRole(event.target.value)
    }
    const validateField = ( field ) => {
        return validator.isEmpty(field)
    }

    const addLoginUser = (event) => {
        event.preventDefault()

        const loginUser = {
            username: username,
            role: role,
        }

        loginUserService
            .create(loginUser)
        history.push('/thl-admissions')
    }

    const classes = useStyles()

    return (
        <div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '5px'
            }}>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Typography variant={'h4'}>Kirjaudu sisään</Typography>
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
                    <form onSubmit={addLoginUser}>
                        <Grid
                            container spacing={3}
                        >
                            <Grid item xs={6}>
                                <TextField id='setUsername' value={username} onChange={handleUsernameChange}
                                    label='käyttäjänimi' variant='standard' margin='normal'
                                    required error={validateField(username)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl>
                                    <RadioGroup
                                        aria-label="Rooli:"
                                        defaultValue="THL"
                                        name="controlled-radio-buttons-group"
                                        onChange={handleRoleChange}>
                                        <FormControlLabel value="THL" control={<Radio />} label="THL" />
                                        <FormControlLabel value="Tutkimusyksikkö" control={<Radio />} label="Tutkimusyksikkö" />
                                        <FormControlLabel value="Poliisi" control={<Radio />} label="Poliisi" />
                                        <FormControlLabel value="Oikeuslaitos" control={<Radio />} label="Oikeuslaitos" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Button id='createLoginUserButton' type='submit' variant='outlined'>Kirjaudu</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </div>
        </div>
    )
}

export default LoginForm