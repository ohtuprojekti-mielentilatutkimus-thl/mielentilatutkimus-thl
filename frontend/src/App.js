import React from 'react'
import { Component } from 'react'
import AddmissionForm from './components/AddmissionForm'
import basicInformationForm from './components/BasicInformationForm'
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
                <Route path='/admission_form/:id' component={AddmissionForm}>
                </Route>
                <Route path='/admission_form/:id/edit' component={AddmissionForm}>
                </Route>
            </Switch>
        </div>
    )
}

export default App; Component