import React from 'react'
import ThlAdmissions from './components/ThlAdmissions'
import LoginForm from './components/LoginView'

import { useStyles, theme } from './styles'

import {
    Switch, Route
} from 'react-router-dom'
import { ThemeProvider, StyledEngineProvider } from '@mui/material'

const App = () => {
    const classes = useStyles()

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <div className={classes.app}>
                    <Switch>
                        <Route path='/thl-admissions'>
                            <ThlAdmissions />
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
