import React from 'react'
import { useState, useEffect } from 'react'
import addmissionService from './services/addmissionService'
import AddmissionForm from './components/AddmissionForm'
import THLForm from './components/THLForm'

const App = () => {

  const isTHL = process.env.ENV_THL

    if (isTHL) {

      const [forms, setForms] = useState([])

      useEffect(() => {
        addmissionService.getAll().then(response => {
          setForms(response.data)
        })
      })

      return (
        <div>
          <h2>Lomakkeet:</h2>
            {forms.map(form =>
              <THLForm key={form.id}
                form={form}
              />
            )}
        </div>
      )

    } else {
      
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
        <h2>Lisää henkilö:</h2>
          {addmissionForm()}
        <p></p>
      </div>
    )
  }

}

export default App