import { React, useState } from 'react'
import { Grid, TextField, Button, Typography, Dialog, DialogContentText, DialogActions, DialogTitle, DialogContent } from '@material-ui/core'
import formService from '../services/formService'

const ReseachUnitStatement = ({ form, formState, updateForms }) => {

    const [field1, setField1] = useState('')
    const [field2, setField2] = useState('')
    const [field3, setField3] = useState('')
    const [field4, setField4] = useState('')
    const [field5, setField5] = useState('')
    const [field6, setField6] = useState('')
    const [field7, setField7] = useState('')
    const [field8, setField8] = useState('')
    const [field9, setField9] = useState('')
    const [field10, setField10] = useState('')
    const [field11, setField11] = useState('')
    const [field12, setField12] = useState('')
    const [field13, setField13] = useState('')
    const [field14, setField14] = useState('')

    const [openConfirm, setConfirmOpen] = useState(false)

    const handleField1Change = (event) => {
        setField1(event.target.value)
    }

    const handleField2Change = (event) => {
        setField2(event.target.value)
    }
    const handleField3Change = (event) => {
        setField3(event.target.value)
    }
    const handleField4Change = (event) => {
        setField4(event.target.value)
    }
    const handleField5Change = (event) => {
        setField5(event.target.value)
    }
    const handleField6Change = (event) => {
        setField6(event.target.value)
    }
    const handleField7Change = (event) => {
        setField7(event.target.value)
    }
    const handleField8Change = (event) => {
        setField8(event.target.value)
    }
    const handleField9Change = (event) => {
        setField9(event.target.value)
    }
    const handleField10Change = (event) => {
        setField10(event.target.value)
    }
    const handleField11Change = (event) => {
        setField11(event.target.value)
    }
    const handleField12Change = (event) => {
        setField12(event.target.value)
    }
    const handleField13Change = (event) => {
        setField13(event.target.value)
    }
    const handleField14Change = (event) => {
        setField14(event.target.value)
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

            const statement = []
            statement.push(field1)
            statement.push(field2)
            statement.push(field3)
            statement.push(field4)
            statement.push(field5)
            statement.push(field6)
            statement.push(field7)
            statement.push(field8)
            statement.push(field9)
            statement.push(field10)
            statement.push(field11)
            statement.push(field12)
            statement.push(field13)
            statement.push(field14)

            formService.addStatement(form.id, statement)
                .then(response => {
                    console.log(response.data)
                })
            // lausunnon lähettäminen


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

        const statement = []
        statement.push(field1)
        statement.push(field2)
        statement.push(field3)
        statement.push(field4)
        statement.push(field5)
        statement.push(field6)
        statement.push(field7)
        statement.push(field8)
        statement.push(field9)
        statement.push(field10)
        statement.push(field11)
        statement.push(field12)
        statement.push(field13)
        statement.push(field14)

        formService.addStatement(updateFormState.id, statement)
            .then(response => {
                console.log(response.data)
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
            <form onSubmit={save}>
                <Grid item xs={12}>
                    <TextField fullWidth value={field1} multiline minRows={1} onChange={handleField1Change} label="Diagnoosikoodi"
                        variant='outlined' margin='normal'></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth value={field2} multiline minRows={3} onChange={handleField2Change} label="Oikeuden asiakirjatiedot"
                        variant='outlined' margin='normal'></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth value={field3} multiline minRows={4}onChange={handleField3Change} label="Syytteenalainen teko"
                        variant='outlined' margin='normal'></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth value={field4} multiline minRows={4}onChange={handleField4Change} label="Esitutkintatiedot"
                        variant='outlined' margin='normal'></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth value={field5} multiline minRows={4}onChange={handleField5Change} label="Muualta saadut tiedot"
                        variant='outlined' margin='normal'></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth value={field6} multiline minRows={4}onChange={handleField6Change} label="Tutkittavan antamat tiedot (sosiaalityöntekijä ja tutkiva lääkäri)"
                        variant='outlined' margin='normal'></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth value={field7} multiline minRows={4}onChange={handleField7Change} label="Somaattinen tutkimus"
                        variant='outlined' margin='normal'></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth value={field8} multiline minRows={4}onChange={handleField8Change} label="Psykiatrinen tutkimus"
                        variant='outlined' margin='normal'></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth value={field9} multiline minRows={4}onChange={handleField9Change} label="Psykologinen ja neuropsykologinen tutkimusveto"
                        variant='outlined' margin='normal'></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth value={field10} multiline minRows={4}onChange={handleField10Change} label="Osastohavainnot"
                        variant='outlined' margin='normal'></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth value={field11} multiline minRows={4}onChange={handleField11Change} label="Toimintaterapeutti"
                        variant='outlined' margin='normal'></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth value={field12} multiline minRows={4}onChange={handleField12Change} label="Yhteenveto"
                        variant='outlined' margin='normal'></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth value={field13} multiline minRows={4}onChange={handleField13Change} label="Johtopäätökset"
                        variant='outlined' margin='normal'></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth value={field14} multiline minRows={4}onChange={handleField14Change} label="Ponnet"
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