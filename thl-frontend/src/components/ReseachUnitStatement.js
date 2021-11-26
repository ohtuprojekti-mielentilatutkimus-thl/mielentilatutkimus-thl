import { React, useState } from 'react'
import { Grid, TextField, Button, Typography, Dialog, DialogContentText, DialogActions, DialogTitle, DialogContent } from '@material-ui/core'
import formService from '../services/formService'

const ReseachUnitStatement = ({ form, formState, updateForms }) => {

    const [title1, setTitle1] = useState('')
    const [title2, setTitle2] = useState('')
    const [title3, setTitle3] = useState('')
    const [openConfirm, setConfirmOpen] = useState(false)

    const handleTitle1Change = (event) => {
        console.log(form)
        setTitle1(event.target.value)
    }

    const handleTitle2Change = (event) => {
        setTitle2(event.target.value)
    }

    const handleTitle3Change = (event) => {
        setTitle3(event.target.value)
    }

    const getStatus = () => {
        if (formState !== 'Lausunto saapunut') {
            return (
                <Typography variant="h4" color="error" > LUONNOS </Typography>
            )
        }
    }
    const state = {
        button: 1
    }

    const save = event => {
        event.preventDefault()

        if(state.button === 1) {
            console.log('tallennetaan luonnos')
            // luonnoksen tallennuksen
        } else {
            handleClickOpen()
        }
    }

    const handleClickOpen = () => {
        setConfirmOpen(true)
    }
    const handleClose = () => {
        setConfirmOpen(false)
    }
    const handleCloseAndSend = () => {
        setConfirmOpen(false)
        console.log('lähetetään lausunto')
        const updateFormState = { ...form, formState: 'Lausunto saapunut' }
        formService.update(updateFormState.id, updateFormState)
            .then(response => {
                updateForms(response.data)
            })
        // lausunnon lähettäminen
    }

    return (
        <div>
            <h2>
           Mielentilalausunto:
            </h2>
            {getStatus()}
            <p></p>
            <p>Pohditaan tän ulkoasua/toteutusta enemmän, kun saadaan tähän se pohja</p>
            <form onSubmit={save}>
                <Grid item xs={10}>
                    <h3>Tähän esim väliotsikko 1?</h3>
                    <TextField fullWidth value={title1} multiline minRows={4} onChange={handleTitle1Change}
                        variant='outlined' margin='normal'></TextField>
                </Grid>
                <Grid item xs={10}>
                    <h3>tähän väliotsikko 2?</h3>
                    <TextField fullWidth value={title2} multiline minRows={4} onChange={handleTitle2Change}
                        variant='outlined' margin='normal'></TextField>
                </Grid>
                <Grid item xs={10}>
                    <h3>tähän väliotsikko 3?</h3>
                    <TextField fullWidth value={title3} multiline minRows={4}onChange={handleTitle3Change}
                        variant='outlined' margin='normal'></TextField>
                </Grid>
                <Grid item xs={10}>
                    <Button variant='outlined' color='primary' onClick={() => (state.button = 1)} type="submit">Tallenna luonnos</Button>
                    &nbsp;
                    <Button variant='contained' color='primary' onClick={() => (state.button = 2)} type="submit">Lähetä lausunto</Button>
                </Grid>
            </form>
            <div>
                <Dialog
                    open={openConfirm}
                    onClose={handleClose}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Haluatko varmasti lähettää mielentilalausunnon?
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
            Kun lähetät mielentilalausunnon, et voi enää muokata sitä
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus color='primary' onClick={handleCloseAndSend}>Lähetä</Button>
                        <Button color='secondary' onClick={handleClose}>Kumoa</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}

export default ReseachUnitStatement