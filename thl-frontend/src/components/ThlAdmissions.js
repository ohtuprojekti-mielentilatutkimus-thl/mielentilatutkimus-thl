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
                <Table sx={{ minWidth: 700 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="left">Luotu</TableCell>
                            <TableCell align="left">Päivitetty</TableCell>
                            <TableCell align="left">Tila</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {forms.slice().map(form => {
                            return (
                                <TableRow key={form.id}>
                                    <TableCell>
                                        <AdmissionForm key={form.id} form={form} updateForms={updateForms}> </AdmissionForm>
                                    </TableCell>
                                    <TableCell align="left">{form.createdAt}</TableCell>
                                    <TableCell align="left">{form.updatedAt}</TableCell>
                                    <TableCell align="left" id="formState">{form.formState}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default ThlAdmissions