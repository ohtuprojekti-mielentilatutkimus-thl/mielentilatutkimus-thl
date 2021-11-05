import React from 'react'
import { Component } from 'react'
import AdmissionForm from './components/AdmissionForm'
import basicInformationForm from './components/BasicInformationForm'
import UploadForm from './components/UploadForm'
import './App.css'
import { useStyles } from './styles'


import {
    Switch, Route
} from 'react-router-dom'


const App = () => {

    const classes = useStyles()

    return (
        <div className={classes.app}>
            <Switch>
                <Route path='/basic_information_form'>
                    <div>
                        {basicInformationForm()}
                    </div>
                </Route>
                <Route path='/admission_form/:id' component={AdmissionForm}>
                </Route>
                <Route path='/admission_form/:id/edit' component={AdmissionForm}>
                </Route>
                <Route path='/upload_form/:id' component={UploadForm}>
                </Route>
            </Switch>
        </div>
    )
}

export default App; Component