/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Grid, DialogTitle, DialogActions, Button, TextField, FormControl, Select, MenuItem } from '@material-ui/core'
import formService from '../services/formService'
import Messages from './Messages'
import useMessage from '../utils/messageHook'

const SendToResearchUnit = ({ form, handleClose, updateForms }) => {

    const [researchUnit, setResearchUnit] = useState('Niuvanniemen sairaala')
    const [researchUnitInformation, setResearchUnitInformation] = useState('')

    const msg = useMessage()

    const handleSend = (event) => {
        event.preventDefault()
        formService.updateResearchUnit( form.id, {
            researchUnit: researchUnit,
            researchUnitInformation: researchUnitInformation,
            formState: 'Tutkimuspaikka pyydetty'
        }).then(
            ( newForm ) => {
                setResearchUnit('')
                setResearchUnitInformation('')
                msg.setMsg('Tutkimuspaikkapyyntö lähetetty onnistuneesti', 5, handleClose)
                updateForms(newForm.data)
            })
            .catch(error => {
                msg.setErrorMsg('Tutkimuspaikkapyynnön lähettämisessä tapahtui virhe!', 5)
            })
    }

    const selectResearchUnit = (event) => {
        setResearchUnit(event.target.value)
    }

    return (
        <DialogTitle disableTypography>
            <h4>{form.thlRequestId}</h4>
            <form onSubmit = {handleSend}>
                <Grid>
                    <FormControl fullWidth label='Tutkimuspaikkayksikkö'>
                        <Select
                            value = {researchUnit}
                            onChange={selectResearchUnit}
                            id='selectResearchUnit'>
                            <MenuItem id='0' value={'Niuvanniemen sairaala'}>Niuvanniemen sairaala</MenuItem>
                            <MenuItem id='1' value={'Vanhan Vaasan sairaala'}>Vanhan Vaasan sairaala</MenuItem>
                            <MenuItem id='2' value={'Psykiatrinen vankisairaala, Turun yksikkö'}>Psykiatrinen vankisairaala, Turun yksikkö</MenuItem>
                            <MenuItem id='3' value={'Psykiatrinen vankisairaala, Vantaan yksikkö'}>Psykiatrinen vankisairaala, Vantaan yksikkö</MenuItem>
                            <MenuItem id='4' value={'HUS Kellokosken sairaala'}>HUS Kellokosken sairaala</MenuItem>
                            <MenuItem id='5' value={'OYS/Psykiatrian tulosalue, Oikeuspsykiatria'}>OYS/Psykiatrian tulosalue, Oikeuspsykiatria</MenuItem>
                            <MenuItem id='6' value={'Tays Pitkäniemen sairaala, Tehostetun psykoosihoidon vastuuyksikkö (PTHP), Talo 14'}>Tays Pitkäniemen sairaala,
                             Tehostetun psykoosihoidon vastuuyksikkö (PTHP), Talo 14</MenuItem>
                            <MenuItem id='7' value={'Tampereen yliopistollinen sairaala, EVA-yksikkö'}>Tampereen yliopistollinen sairaala, EVA-yksikkö</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid>
                    <TextField id= 'inputForInfoForResearchUnit'value={researchUnitInformation} onChange= {(event) => setResearchUnitInformation(event.target.value)}
                        multiline rows={10} fullWidth label='Lisätietoja...'/>
                </Grid>
                <Grid>
                    <Button id= 'buttonSendToResearchUnit'variant='outlined' color='primary' type='submit'>Lähetä</Button>
                </Grid>

                {(msg.messagesNotEmpty && <Messages msgArray={msg.messages} severity='success' />)}
                {(msg.errorMessagesNotEmpty && <Messages msgArray={msg.errorMessages} severity='error' />)}

                <DialogActions>
                    <Button variant='contained' color='primary' align='right' onClick={handleClose}>Sulje</Button>
                </DialogActions>

            </form>
        </DialogTitle>
    )

}

export default SendToResearchUnit