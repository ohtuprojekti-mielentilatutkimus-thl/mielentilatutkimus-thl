import React from 'react'
import { useState, useEffect } from 'react'
import addmissionService from './services/addmissionService'
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

        addmissionService
            .create(addmissionObject)
            .then(response => {
                setAddmissions(addmissions.concat(response.data))
                console.log('App filen addnewaddmission funktiossa')
            })

        /*try {
        const newAddmission = await addmissionService.create(addmissionObject)
        setAddmissions(addmissions.concat(newAddmission))
        console.log('Lisäys onnistui')
        /*}
        catch (exception){
            console.log('Virhe')
        }*/
    }

    return (
        <div>
            {addmissionForm()}
            <p></p>
        </div>
    )
}

export default App