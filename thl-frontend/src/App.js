/* eslint-disable no-unused-vars */
import React from 'react'
import ThlAdmissions from './components/ThlAdmissions'
import LoginForm from './components/LoginView'

import { useStyles, theme } from './styles'

import {
    Switch, Route, Redirect
} from 'react-router-dom'
import { ThemeProvider, StyledEngineProvider } from '@mui/material'

const App = () => {
    const classes = useStyles()

    const loggedIn = () => localStorage.getItem('user') === null ? false : true

    const AdmissionsRoute = () => (
        <div>
            { loggedIn() ? <ThlAdmissions/> : <Redirect to='/login'/> }
        </div>
    )

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <div className={classes.app}>
                    <Switch>
                        <Route path='/thl-admissions'>
                            <AdmissionsRoute/>
                        </Route>
                        <Route path='/login'>
                            <LoginForm/>
                        </Route>
                    </Switch>
                </div>
            </ThemeProvider>
        </StyledEngineProvider>
    )
}


export default App
