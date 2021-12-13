import React, { useState } from 'react'
import loginUserService from '../services/loginUserService'
import { Paper, Grid, Button, TextField, FormControl, RadioGroup, FormControlLabel, Radio, Select, MenuItem } from '@mui/material'
import { useStyles } from '../styles'
import Typography from '@mui/material/Typography'
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
            .login(loginUser)
            .then(response => {
                if (response){
                    history.push('/thl-admissions')
                }

            })
    }

    const setResearchUnit = () => {

        var researchUnitRole = Boolean(false)

        const reseachUnits = ['Niuvanniemen sairaala', 'Vanhan Vaasan sairaala', 'Psykiatrinen vankisairaala, Turun yksikkö',
            'Psykiatrinen vankisairaala, Vantaan yksikkö', 'HUS Kellokosken sairaala', 'OYS/Psykiatrian tulosalue, Oikeuspsykiatria',
            'Tays Pitkäniemen sairaala, Tehostetun psykoosihoidon vastuuyksikkö (PTHP), Talo 14', 'Tampereen yliopistollinen sairaala, EVA-yksikkö']

        if(role === 'Tutkimusyksikkö') {
            setRole(reseachUnits[0])
        }

        if(reseachUnits.includes(role)){
            researchUnitRole = Boolean(true)
        }

        if (researchUnitRole) {
            return (<FormControl fullWidth variant="standard">
                <Select
                    value={role}
                    onChange={handleRoleChange}>
                    <MenuItem value={reseachUnits[0]}>Niuvanniemen sairaala</MenuItem>
                    <MenuItem value={reseachUnits[1]}>Vanhan Vaasan sairaala</MenuItem>
                    <MenuItem value={reseachUnits[2]}>Psykiatrinen vankisairaala, Turun yksikkö</MenuItem>
                    <MenuItem value={reseachUnits[3]}>Psykiatrinen vankisairaala, Vantaan yksikkö</MenuItem>
                    <MenuItem value={reseachUnits[4]}>HUS Kellokosken sairaala</MenuItem>
                    <MenuItem value={reseachUnits[5]}>OYS/Psykiatrian tulosalue, Oikeuspsykiatria</MenuItem>
                    <MenuItem value={reseachUnits[6]}>Tays Pitkäniemen sairaala, Tehostetun psykoosihoidon vastuuyksikkö (PTHP), Talo 14</MenuItem>
                    <MenuItem value={reseachUnits[7]}>Tampereen yliopistollinen sairaala, EVA-yksikkö</MenuItem>
                </Select>
            </FormControl>)
        }
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
                                        <FormControlLabel value="Tutkimusyksikkö" control={<Radio />} label="Tutkimusyksikkö:" />
                                        {setResearchUnit()}
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