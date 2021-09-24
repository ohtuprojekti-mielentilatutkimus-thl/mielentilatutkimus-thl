import React, { useState, useEffect } from 'react'
import AdmissionForm from './components/AdmissionForm'
import formService from './services/formService'
import {
    Switch, Route
} from 'react-router-dom'

const App = () => {
    const [forms, setForms] = useState([])

    useEffect(() => {
        fetchForms()
    }, [])

    const fetchForms = async () => {
        const forms = await formService.getAll()
        setForms( forms )
    }

    return (
        <div>
            <Switch>
                <Route path='/thl-admissions'>
                    <div>
                        <h2>Lomakkeet:</h2>
                        {forms.map(form =>
                            <AdmissionForm key={form.id}
                                form={form}
                            />
                        )}
                    </div>
                </Route>
            </Switch>
        </div>
    )
}

export default App
