import React, { useState, useEffect } from 'react'
import AdmissionForm from './components/AdmissionForm'
import formService from './services/formService'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'

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
                                        form={form}
                                    />
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Route>
            </Switch>
        </div>
    )
}

export default App
