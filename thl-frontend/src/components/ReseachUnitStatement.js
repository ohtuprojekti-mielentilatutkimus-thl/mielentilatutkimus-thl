import { React, useState } from 'react'
import { Grid, TextField, Button, Typography, Dialog, DialogContentText, DialogActions, DialogTitle, DialogContent } from '@mui/material'
import formService from '../services/formService'
import Messages from './Messages'
import useMessage from '../utils/messageHook'

const ReseachUnitStatement = ({ form, formState, updateForms }) => {

    const [field1, setField1] = useState(form.statement_draft[0])
    const [field2, setField2] = useState(form.statement_draft[1])
    const [field3, setField3] = useState(form.statement_draft[2])
    const [field4, setField4] = useState(form.statement_draft[3])
    const [field5, setField5] = useState(form.statement_draft[4])
    const [field6, setField6] = useState(form.statement_draft[5])
    const [field7, setField7] = useState(form.statement_draft[6])
    const [field8, setField8] = useState(form.statement_draft[7])
    const [field9, setField9] = useState(form.statement_draft[8])
    const [field10, setField10] = useState(form.statement_draft[9])
    const [field11, setField11] = useState(form.statement_draft[10])
    const [field12, setField12] = useState(form.statement_draft[11])
    const [field13, setField13] = useState(form.statement_draft[12])
    const [field14, setField14] = useState(form.statement_draft[13])

    const [openConfirm, setConfirmOpen] = useState(false)
    const [previewWindow, setPreviewWindowOpen] = useState(false)

    const msg = useMessage()

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
                <Typography variant="h5" color="error" > LUONNOS </Typography>
            )
        }
    }
    const state = {
        button: 1
    }

    const save = event => {
        event.preventDefault()

        if(state.button === 1) {

            const statement_draft = []
            statement_draft.push(field1)
            statement_draft.push(field2)
            statement_draft.push(field3)
            statement_draft.push(field4)
            statement_draft.push(field5)
            statement_draft.push(field6)
            statement_draft.push(field7)
            statement_draft.push(field8)
            statement_draft.push(field9)
            statement_draft.push(field10)
            statement_draft.push(field11)
            statement_draft.push(field12)
            statement_draft.push(field13)
            statement_draft.push(field14)

            formService.addStatementDraft(form.id, statement_draft)
                .then(response => {
                    console.log(response.data)
                    msg.setMsg('Luonnos lähetetty onnistuneesti', 5, handleClose)
                })
                .catch(error => {
                    console.log(error)
                    msg.setErrorMsg('Luonnoksen tallentamisessa tapahtui virhe!', 5)
                })

        } if(state.button === 2) {
            handleClickOpen()
        }
        if (state.button === 3) {
            handleClickOpenPreview()
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

        const statement = { statement : `  
        Diagnoosikoodi: ${field1}\n\n
        Oikeuden asiakirjatiedot: ${field2}\n\n
        Syytteenalainen teko: ${field3}\n\n
        Esitutkintatiedot: ${field4}\n\n
        Muualta saadut tiedot: ${field5}\n\n
        Tutkittavan antamat tiedot (sosiaalityöntekijä ja tutkiva lääkäri): ${field6}\n\n
        Somaattinen tutkimus: ${field7}\n\n
        Psykiatrinen tutkimus: ${field8}\n\n
        Psykologinen ja neuropsykologinen tutkimusveto: ${field9}\n\n
        Osastohavainnot: ${field10}\n\n
        Toimintaterapeutti: ${field11}\n\n
        Yhteenveto: ${field12}\n\n
        Johtopäätökset: ${field13}\n\n
        Ponnet: ${field14}` }

        const updateFormState = { ...form, formState: 'Lausunto saapunut' }

        formService
            .addStatement(updateFormState.id, statement)

        formService
            .update(updateFormState.id, updateFormState)
            .then(response => {
                updateForms(response.data)
            })
    }

    const handleClickOpenPreview = () => {
        setPreviewWindowOpen(true)
    }
    const handleClosePreview = () => {
        setPreviewWindowOpen(false)
    }

    return (
        <div>
            <h1>
           Mielentilalausunto:
            </h1>
            {getStatus()}
            <p></p>
            <form onSubmit={save}>
                <Grid item xs={12}>
                    <TextField id='1' fullWidth value={field1} multiline minRows={1} onChange={handleField1Change} label="Diagnoosikoodi"
                        variant='outlined' margin='normal'></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField id='2' fullWidth value={field2} multiline minRows={3} onChange={handleField2Change} label="Oikeuden asiakirjatiedot"
                        variant='outlined' margin='normal'></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField id='3' fullWidth value={field3} multiline minRows={4}onChange={handleField3Change} label="Syytteenalainen teko"
                        variant='outlined' margin='normal'></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField id='4' fullWidth value={field4} multiline minRows={4}onChange={handleField4Change} label="Esitutkintatiedot"
                        variant='outlined' margin='normal'></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField id='5' fullWidth value={field5} multiline minRows={4}onChange={handleField5Change} label="Muualta saadut tiedot"
                        variant='outlined' margin='normal'></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField id='6' fullWidth value={field6} multiline minRows={4}onChange={handleField6Change} label="Tutkittavan antamat tiedot (sosiaalityöntekijä ja tutkiva lääkäri)"
                        variant='outlined' margin='normal'></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField id='7' fullWidth value={field7} multiline minRows={4}onChange={handleField7Change} label="Somaattinen tutkimus"
                        variant='outlined' margin='normal'></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField id='8' fullWidth value={field8} multiline minRows={4}onChange={handleField8Change} label="Psykiatrinen tutkimus"
                        variant='outlined' margin='normal'></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField id='9'fullWidth value={field9} multiline minRows={4}onChange={handleField9Change} label="Psykologinen ja neuropsykologinen tutkimusveto"
                        variant='outlined' margin='normal'></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField id='10' fullWidth value={field10} multiline minRows={4}onChange={handleField10Change} label="Osastohavainnot"
                        variant='outlined' margin='normal'></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField id='11' fullWidth value={field11} multiline minRows={4}onChange={handleField11Change} label="Toimintaterapeutti"
                        variant='outlined' margin='normal'></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField id='12' fullWidth value={field12} multiline minRows={4}onChange={handleField12Change} label="Yhteenveto"
                        variant='outlined' margin='normal'></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField id='13' fullWidth value={field13} multiline minRows={4}onChange={handleField13Change} label="Johtopäätökset"
                        variant='outlined' margin='normal'></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField id='14' fullWidth value={field14} multiline minRows={4}onChange={handleField14Change} label="Ponnet"
                        variant='outlined' margin='normal'></TextField>
                </Grid>
                <br></br>
                {(msg.messagesNotEmpty && <Messages msgArray={msg.messages} severity='success' />)}
                {(msg.errorMessagesNotEmpty && <Messages msgArray={msg.errorMessages} severity='error' />)}
                <br></br>
                <Grid item xs={10}>  &nbsp;
                    <Button variant='outlined' id='preview' color='primary' onClick={() => (state.button = 3)} type="submit">Esikatsele</Button>
                    &nbsp;
                    <Button variant='outlined' id='saveDraft' color='primary' onClick={() => (state.button = 1)} type="submit">Tallenna luonnos</Button>
                    &nbsp;
                    <Button variant='contained' id='sendStatement' color='primary' onClick={() => (state.button = 2)} type="submit">Lähetä lausunto</Button>
                </Grid>
            </form>
            <div>
                <Dialog
                    open={previewWindow}
                    onClose={handleClosePreview}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Mielentilalausunto:
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <div dangerouslySetInnerHTML={{ __html: `
                                <b> Diagnoosikoodi: </b> ${field1} <br> </br>
                                <b> Oikeuden asiakirjatiedot: </b> ${field2} <br> </br>
                                <b> Syytteenalainen teko: </b> ${field3} <br> </br>
                                <b> Esitutkintatiedot: </b> ${field4} <br> </br>
                                <b> Muualta saadut tiedot: </b> ${field5} <br> </br>
                                <b> Tutkittavan antamat tiedot (sosiaalityöntekijä ja tutkiva lääkäri): </b> ${field6} <br> </br>
                                <b> Somaattinen tutkimus: </b> ${field7} <br> </br>
                                <b> Psykiatrinen tutkimus: </b> ${field8} <br> </br>
                                <b> Psykologinen ja neuropsykologinen tutkimusveto: </b> ${field9} <br> </br>
                                <b> Osastohavainnot: </b> ${field10} <br> </br>
                                <b> Toimintaterapeutti: </b> ${field11} <br> </br>
                                <b> Yhteenveto: </b> ${field12} <br> </br>
                                <b> Johtopäätökset: </b> ${field13} <br> </br>
                                <b> Ponnet: </b> ${field14} <br> </br>
                            ` }} />
                        </DialogContentText>
                    </DialogContent>
                </Dialog>

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
                        <Button autoFocus id='confirmSending' color='primary' onClick={handleCloseAndSend}>Lähetä</Button>
                        <Button color='error' id='abortSending' onClick={handleClose}>Kumoa</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}

export default ReseachUnitStatement