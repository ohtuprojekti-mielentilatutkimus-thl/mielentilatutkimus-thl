import React, { useState, useEffect } from 'react'
import AdmissionForm from './components/AdmissionForm'
import formService from './services/formService'

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
        <h2>Lomakkeet:</h2>
          {forms.map(form =>
            <AdmissionForm key={form.id}
              form={form}
            />
          )}
      </div>
    )
  }

export default App
