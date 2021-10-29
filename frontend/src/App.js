import React from 'react'
import { Component } from 'react'
import AdmissionForm from './components/AdmissionForm'
import basicInformationForm from './components/BasicInformationForm'
import UploadForm from './components/UploadForm'
import './App.css'

import {
    Switch, Route
} from 'react-router-dom'


const App = () => {
    return (
        <div className='app'>
            <Switch>
                <Route path='/basic_information_form'>
                    <div>
                        {basicInformationForm()}
                    </div>
                </Route>
                <Route path='/admission_form/:id' component={AdmissionForm}>
                </Route>
                <Route path='/upload_form/:id' component={UploadForm}>
                </Route>
            </Switch>
        </div>
    )
}

export default App; Component