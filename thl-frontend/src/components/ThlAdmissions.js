
import React, { useState, useEffect } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import AdmissionForm from './AdmissionForm'
import formService from '../services/formService'

const ThlAdmissions = () => {
    const [forms, setForms] = useState([])

    useEffect(() => {
        fetchForms()
    }, [])

    const fetchForms = async () => {
        const forms = await formService.getAll()
        setForms( forms )
    }

    const updateForms = async ( updateFormState ) => {
        setForms(forms.map(form => form.id !== updateFormState.id ? form : updateFormState))
    }

    return (
        <div>
            <h2>Lomakkeet:</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id:</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {forms.map(form =>
                            <AdmissionForm key={form.id}
                                form={form} updateForms={updateForms}
                            />
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default ThlAdmissions