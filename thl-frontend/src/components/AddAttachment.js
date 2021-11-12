/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Grid, DialogTitle, Button, Paper, DialogActions } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import attachmentService from '../services/attachmentService'
import { Alert } from '@material-ui/lab'


const addAttachment = ({ form, fetchForms, handleClose }) => {

    const [message, setMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const [filesInfo, setFilesInfo] = useState([])
    const [selectedFiles, setSelectedFiles] = useState([])

    const AdmissionFormId = form.id

    const useStyles = makeStyles({
        form: {
            display: 'center',
            background: 'white',
            padding: '10px',
            borderWidth: '1px',
            width: '50%',
            height: '50%',
            align: 'center',
            justifyContent: 'center'
        }
    })

    const classes = useStyles()

    const selectFile = (event) => {
        const file = event.target.files[0]

        if (duplicateFileName(file.name)) {
            setErrorMessage(`Samannimisiä tiedostoja ei voi ladata. Vaihda toisen tiedoston "${file.name}" nimeä`)
            setTimeout(() => {
                setErrorMessage(null)

            }, 1000*5)
            console.log('duplikaatti')
        } else {
            setSelectedFiles(selectedFiles.concat(file))

            setFilesInfo(filesInfo.concat({ name: file.name, whichFile: event.target.id }))
        }

    }

    const duplicateFileName = name => filesInfo.find(fileInfo => fileInfo.name === name)

    const upload = async () => {
        await attachmentService.upload(selectedFiles, AdmissionFormId, filesInfo)
            .then(response => {
                console.log(response.data)
                setMessage('Liitteet lisätty')
                setTimeout(() => {
                    setMessage(null)
                    fetchForms()
                    handleClose()

                }, 1000*5)
            }
            )
            .catch(error => {
                setErrorMessage('Liitteiden lisäämisessä tapahtui virhe!')
                setTimeout(() => {
                    setErrorMessage(null)
                }, 1000 * 5)
            })

        // täällä käyttäjälle palautetta onnistuneesta / epäonnistuneesta uploadauksesta?
        // pitäisikö redirectaa jonnekin, käyttäjällä ei kuitenkaan syytä jäädä upload-sivulle jos onnistui
        setSelectedFiles(null)    }


    return (
        <DialogTitle disableTypography>
            <h4>{form.thlRequestId}</h4>
            <div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Paper
                        className={classes.form}
                        variant='outlined'
                        elevation={3}
                        square={false}
                        align='center'
                        justify='center'
                    >
                        <h2>Lataa liitteitä</h2>
                        <br />
                    Välituomio tai päätös mielentilatutkimukseen määräämisestä
                        <br />
                        <label htmlFor='valituomio'>
                            <input
                                id='valituomio'
                                name='valituomio'
                                style={{ display: 'none' }}
                                type='file'
                                onChange={selectFile}
                                accept='image/*,.pdf'
                            />
                            <Button
                                className='btn-choose'
                                variant='outlined'
                                component='span'>
                                Valitse tiedosto
                            </Button>
                        </label>
                        <br />
                    Pöytäkirja
                        <br />
                        <label htmlFor='poytakirja'>
                            <input
                                id='poytakirja'
                                name='poytakirja'
                                style={{ display: 'none' }}
                                type='file'
                                onChange={selectFile}
                                accept='image/*,.pdf'
                            />
                            <Button
                                className='btn-choose'
                                variant='outlined'
                                component='span'>
                                Valitse tiedosto
                            </Button>
                        </label>
                        <br />
                    Haastehakemus
                        <br />
                        <label htmlFor='haastehakemus'>
                            <input
                                id='haastehakemus'
                                name='haastehakemus'
                                style={{ display: 'none' }}
                                type='file'
                                onChange={selectFile}
                                accept='image/*,.pdf'
                            />
                            <Button
                                className='btn-choose'
                                variant='outlined'
                                component='span'>
                                Valitse tiedosto
                            </Button>
                        </label>
                        <br />
                    Rikosrekisteriote
                        <br />
                        <label htmlFor='rikosrekisteriote'>
                            <input
                                id='rikosrekisteriote'
                                name='rikosrekisteriote'
                                style={{ display: 'none' }}
                                type='file'
                                onChange={selectFile}
                                accept='image/*,.pdf'
                            />
                            <Button
                                className='btn-choose'
                                variant='outlined'
                                component='span'>
                                Valitse tiedosto
                            </Button>
                        </label>
                        <br />
                    Esitutkintapöytäkirja liitteineen
                        <br />
                        <label htmlFor='esitutkintapoytakirja'>
                            <input
                                id='esitutkintapoytakirja'
                                name='esitutkintapoytakirja'
                                style={{ display: 'none' }}
                                type='file'
                                onChange={selectFile}
                                accept='image/*,.pdf'
                            />
                            <Button
                                className='btn-choose'
                                variant='outlined'
                                component='span'>
                                Valitse tiedosto
                            </Button>
                        </label>
                        <br />
                    Esitutkintavaiheessa: vangitsemispäätös ja vaatimus vangitsemisesta
                        <br/>
                        <label htmlFor='vangitsemispaatos'>
                            <input
                                id='vangitsemispaatos'
                                name='vangitsemispaatos'
                                style={{ display: 'none' }}
                                type='file'
                                onChange={selectFile}
                                accept='image/*,.pdf'
                            />
                            <Button
                                className='btn-choose'
                                variant='outlined'
                                component='span'>
                                Valitse tiedosto
                            </Button>
                        </label>
                        <br />
                        <br />
                        <Button
                            className='btn-upload'
                            id='uploadFiles'
                            color='primary'
                            variant='contained'
                            component='span'
                            disabled={!selectedFiles}
                            onClick={upload}>
                            Lataa valitut tiedostot
                        </Button>
                    </Paper>
                </div>
            </div>
            <Grid>
                <div>
                    {(message && <Alert severity="success">
                        {message} </Alert>
                    )}

                </div>
            </Grid>
            <Grid>
                <div>
                    {(errorMessage && <Alert severity="error">
                        {errorMessage} </Alert>
                    )}

                </div>
            </Grid>
            <DialogActions>
                <Button variant='contained' color='primary' align='right' onClick={handleClose}>Sulje</Button>
            </DialogActions>

        </DialogTitle>
    )

}

export default addAttachment