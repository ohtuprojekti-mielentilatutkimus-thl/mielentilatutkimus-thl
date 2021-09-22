import React from 'react'
import { useEffect } from 'react'
//import basicInformationService from './services/basicInformationService'
import addmissionForm from './components/AddmissionForm'
import basicInformationForm from './components/BasicInformationForm'

import {
    Switch, Route, Redirect
} from 'react-router-dom'


const App = () => {


    useEffect(() => {
        /* not in use atm
        addmissionService
            .getAll().then(response => {
                setAddmissions(response.data)
            })*/
    }, [])


        const [addmissions, setAddmissions] = useState([])

    /*try {
        const newAddmission = await addmissionService.create(addmissionObject)
        setAddmissions(addmissions.concat(newAddmission))
        console.log('Lisäys onnistui')
        /*}
        catch (exception){
            console.log('Virhe')
        }*/

    return (
        <div>
            <Switch>
                <Route path='/basic_information_form'>
                    <div>
                        {basicInformationForm()}
                    </div>
                </Route>
                <Route path='/admission_form/:id'>
                    {addmissionForm()}
                </Route>
                <Route path='/'>
                    <Redirect to="/basic_information_form" />
                </Route>
            </Switch>

        </div>
    )
}

export default App