import React from 'react'
import ThlAdmissions from './components/ThlAdmissions'

import {
    Switch, Route
} from 'react-router-dom'

const App = () => {

    return (
        <div>
            <Switch>
                <Route path='/thl-admissions'>
                    <ThlAdmissions />
                </Route>
            </Switch>
        </div>
    )
}


export default App
