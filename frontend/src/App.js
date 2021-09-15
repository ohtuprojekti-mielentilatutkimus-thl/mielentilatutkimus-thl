import React from 'react'
//import { useState, useEffect } from 'react'
//import PersonService from './services/personService.js'
import AddmissionForm from './components/AddmissionForm'

const App = () => {

    // const [addmissions, setAddmissions] = useState([])

    /*
    useEffect(() => {
        AddmissionService.getAll().then(addmission =>
            setAddmissions(addmission)
        )
    }, [])
*/
    const addmissionForm = () => (

        <AddmissionForm createAddmission={addNewAddmission} />
    )


    const addNewAddmission = async (addmissionObject) => {

        console.log(addmissionObject.name)
    }

    return (

        <div>
            <h2>Lisää henkilö:</h2>
            {addmissionForm()}
            <p></p>
        </div>
    )
}

export default App