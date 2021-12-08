import React from 'react'
import { useStyles } from '../styles'
import { Grid } from '@mui/material'
import dayjs from 'dayjs'

const NotProsecuted = ({ form }) => {
    const classes = useStyles ()
    if (form.prosecuted)
        return (
            <br></br>
        )
    else {
        return (
            <div>
                <Grid item xs={4}>
                    <div className = {classes.textLabel} id='prosecutionDeadLine'>Jos syytettä ei ole nostettu, syytteen nostamisen määräaika:</div>
                    <div className = {classes.text}>{dayjs(form.deadlineForProsecution).format('DD.MM.YYYY')}</div>
                </Grid>
                <Grid item xs={4}>
                    <div className={classes.textLabel} id='preTrialPoliceDepartment'>Jos syytettä ei ole nostettu, esitutkinnan suorittava poliisilaitos:</div>
                    <div className = {classes.text}>{form.preTrialPoliceDepartment}</div>
                </Grid>
            </div>
        )
    }
}

const DisplayProsecuted = ({ form }) => {
    if (form.prosecuted) {
        return (
            <div>Kyllä</div>
        )
    }else {
        return (
            <div> Ei</div>
        )
    }
}
const DisplayHazard = ({ form }) => {
    if (form.hazardAssesment) {
        return (
            <div>Kyllä</div>
        )
    }else {
        return (
            <div>Ei</div>
        )
    }
}

export { NotProsecuted, DisplayHazard, DisplayProsecuted }