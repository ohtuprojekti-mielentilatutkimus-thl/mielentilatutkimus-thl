import React from 'react'
import ThlAdmissions from './components/ThlAdmissions'
import { useStyles, theme } from './styles'

import {
    Switch, Route
} from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core'

const App = () => {
    const classes = useStyles()

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.app}>
                <Switch>
                    <Route path='/thl-admissions'>
                        <ThlAdmissions />
                    </Route>
                </Switch>
            </div>
        </ThemeProvider>
    )
}


export default App
