import React from 'react'
import { useState, useEffect } from 'react'
import addmissionService from './services/addmissionService.js'
import AddmissionForm from './components/AddmissionForm'

const App = () => {

    const [addmissions, setAddmissions] = useState([])


    useEffect(() => {
        addmissionService
            .getAll().then(response => {
                setAddmissions(response.data)
            })
    }, [])

    const addmissionForm = () => (

        <AddmissionForm createAddmission={addNewAddmission} />
    )


    const addNewAddmission = async (addmissionObject) => {

        try {
            const newAddmission = await addmissionService.create(addmissionObject)
            setAddmissions(addmissions.concat(newAddmission))
            console.log('Lisäys onnistui')
        }
        catch (exception){
            console.log(exception)
        }
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