import React, { useState, useEffect } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import AdmissionForm from './AdmissionForm'
import formService from '../services/formService'
import loginUserService from '../services/loginUserService'
import { useStyles } from '../styles'
import dayjs from 'dayjs'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import IconButton from '@mui/material/IconButton'

const ThlAdmissions = () => {
    const [formHeaders, setFormHeaders] = useState([])
    const [ascending, setAscending] = useState(true)
    const [ascendingDate, setAscendingDate] = useState (false)
    const [showInfo, setShowInfo] = useState(false)
    const [form, setForm] = useState([])

    const classes = useStyles()

    useEffect(() => {
        fetchFormHeaders()
    }, [])

    const fetchFormHeaders = async () => {

        const user = await loginUserService.getUser()
        const role = user.role
        var formHeaders = ''

        const reseachUnits = ['Niuvanniemen sairaala', 'Vanhan Vaasan sairaala', 'Psykiatrinen vankisairaala, Turun yksikkö',
            'Psykiatrinen vankisairaala, Vantaan yksikkö', 'HUS Kellokosken sairaala', 'OYS/Psykiatrian tulosalue, Oikeuspsykiatria',
            'Tays Pitkäniemen sairaala, Tehostetun psykoosihoidon vastuuyksikkö (PTHP), Talo 14', 'Tampereen yliopistollinen sairaala, EVA-yksikkö']
        if(role === 'THL') {
            formHeaders = await formService.getAll()
        }
        else if (reseachUnits.includes(role)) {
            formHeaders = await formService.getByResearchUnit(role)
        }
        setFormHeaders( formHeaders )
    }


    const fetchForm = async ( id ) => {
        const form = await formService.getOne(id)
        setForm(form)
    }

    const updateForm = async () => {
        fetchForm(form.id)
        fetchFormHeaders()
    }

    const sortFormsByState = async () => {
        const forms = await formService.getAll()

        if (ascending) {
            setFormHeaders(forms.sort((a,b) => a.formState > b.formState ? 1 : -1))
            setAscending(false)
        } else {
            setFormHeaders(forms.sort((a,b) => b.formState > a.formState ? 1 : -1))
            setAscending(true)
        }
    }

    const sortFormsByDate= async () => {
        const forms = await formService.getAll()

        if (ascendingDate) {
            setFormHeaders(forms.sort((a,b) => a.createdAt > b.createdAt ? 1 : -1))
            setAscendingDate(false)
        } else {
            setFormHeaders(forms.sort((a,b) => b.createdAt > a.createdAt ? 1 : -1))
            setAscendingDate(true)
        }
    }


    return (
        <div className={classes.page}  style={{ maxHeight: '100%',overflow: 'auto' }} >
            <div>
                <Typography variant={'h4'}>Mielentilatutkimuspyynnöt</Typography>
            </div>
            <div>
                <TableContainer component={Paper} className={classes.form}>
                    <Table sx={{ minWidth: 700 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Pyynnön tunniste</TableCell>
                                <TableCell align="left">Luotu
                                    <IconButton id="sortTime" onClick={sortFormsByDate} color="primary" size="large">
                                        <ArrowDropDownIcon />
                                    </IconButton>

                                </TableCell>
                                <TableCell align="left">Päivitetty
                                </TableCell>
                                <TableCell align="left">Tila
                                    <IconButton id="sortState" onClick={sortFormsByState} color="primary" size="large">
                                        <ArrowDropDownIcon fontSize="small"/>
                                    </IconButton>

                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {formHeaders.slice().map(formHeaders => {
                                return (
                                    <TableRow id='admissionsListRow' key={formHeaders.id}>
                                        <TableCell>
                                            <div>
                                                <a href='#' id='handleShowMoreInfo' onClick={async () =>  {
                                                    await fetchForm(formHeaders.id)
                                                    setShowInfo(true)
                                                }}>
                                                    {formHeaders.thlRequestId}
                                                </a>
                                            </div>
                                            {showInfo &&
                                                <AdmissionForm key={formHeaders.id} form={form} updateForm={updateForm} fetchForm={fetchForm} showInfo={showInfo} handleShowLessInfo={() => setShowInfo(false)}></AdmissionForm>
                                            }
                                        </TableCell>
                                        <TableCell align="left" id='createdAt'>{dayjs(formHeaders.createdAt).format('DD.MM.YYYY HH:mm:ss')}</TableCell>
                                        <TableCell align="left" id='updatedAt'>{dayjs(formHeaders.updatedAt).format('DD.MM.YYYY HH:mm:ss')}</TableCell>
                                        <TableCell align="left" id='formState'>{formHeaders.formState}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default ThlAdmissions