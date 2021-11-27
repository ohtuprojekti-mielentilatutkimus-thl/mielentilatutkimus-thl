import React, { useState } from 'react'
import formService from '../services/formService'
import { Button, Select, FormControl } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'

const FormState = ( { form, updateForms } ) => {

    const [selectedOption, setSelectedOption] = useState('')

    const changeFormState = (event) => {

        event.preventDefault()

        if(selectedOption !== ''){

            const updateFormState = { ...form, formState: selectedOption }
            formService.update(updateFormState.id, updateFormState)
                .then(response => {
                    updateForms(response.data)
                })
        }
    }

    const handleChange = (event) => {
        setSelectedOption(event.target.value)
    }

    return (
        <form onSubmit={changeFormState}>
            <div>
                <FormControl>
                    <Select
                        onChange={handleChange}
                        defaultValue= {form.formState ? form.formState : ' ' }
                        value={selectedOption || form.formState}
                        disableUnderline
                        id='selectState'>
                        <MenuItem id='0' value={'Pyyntö saapunut'}> Pyyntö saapunut</MenuItem>
                        <MenuItem id='1' value={'Pyyntö tarkastelussa'}>Pyyntö tarkastelussa</MenuItem>
                        <MenuItem id='2' value={'Pyydetty lisätietoja'}>Pyydetty lisätietoja</MenuItem>
                        <MenuItem id='3' value={'Saatu lisätietoja'}>Saatu lisätietoja</MenuItem>
                        <MenuItem id='4' value={'Tutkimuspaikka pyydetty'}>Tutkimuspaikka pyydetty</MenuItem>
                        <MenuItem id='5' value={'Odottaa tarkistusta'}>Odottaa tarkistusta</MenuItem>
                        <MenuItem id='6' value={'Lausunto saapunut'}>Lausunto saapunut</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <Button variant="outlined" color='primary' id='updateFormState' type='submit'>Päivitä</Button>
        </form>
    )
}

export default FormState