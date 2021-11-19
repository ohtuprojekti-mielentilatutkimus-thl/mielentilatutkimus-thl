import React, { useState } from 'react'
import admissionService from '../services/admissionService'
import { useParams } from 'react-router-dom'
import { Alert } from '@material-ui/lab'
//import Stack from '@mui/material/Stack'
//import { styled } from '@material-ui/core'
import { Button, Grid, Paper } from '@material-ui/core'
//import { Delete } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

import FileButton from './FileButton'

const UploadForm = () => {

    const [errorMessage, setErrorMessage] = useState(null)
    const [filesInfo, setFilesInfo] = useState([])
    const [message, setMessage] = useState(null)
    const [selectedFiles, setSelectedFiles] = useState([])

    const [fileButtons, setFileButtons] = useState([])

    const AdmissionFormId = useParams().id

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
            setErrorMessage(`Tiedosto nimellä ${file.name} on jo valittu lähetettäväksi, ei samannimisiä tiedostoja kahdesti`)
            window.scrollTo(0, 0)
            setTimeout(() => {
                setErrorMessage(null)
            }, 1000*7)
            return
        }

        setSelectedFiles(selectedFiles.concat(file))
        setFilesInfo(filesInfo.concat({ name: file.name, whichFile: event.target.id }))
        addNewFileButton(file.name, event.target.id)
    }

    const addNewFileButton = (fileName, attachmentType) => {
        setFileButtons(fileButtons.concat(<FileButton fileName={fileName} attachmentType={attachmentType} removeFile={removeFile}/>))
    }

    const removeFile = fileName => {
        setFileButtons(fileButtons.filter(button => button.props['fileName'] !== fileName))
        setSelectedFiles(selectedFiles.filter(file => file.name !== fileName))
        setFilesInfo(filesInfo.filter(fileInfo => fileInfo.name !== fileName))
    }

    const duplicateFileName = name => filesInfo.find(fileInfo => fileInfo.name === name)

    const upload = async (event) => {
        event.preventDefault()
        const res = await admissionService.upload(selectedFiles, AdmissionFormId, filesInfo)

        if (res.status === 200) {
            setMessage('Liitteiden lähetys onnistui!')
            setTimeout(() => {
                setMessage(null)
            }, 1000*7)
        } else {
            setErrorMessage('Liitteiden lähetys epäonnistui!')
            setTimeout(() => {
                setErrorMessage(null)
            }, 1000*7)
        }

        setFilesInfo(null)
        setSelectedFiles([])
    }

    const filterButtons = attachmentType => {
        return fileButtons.filter(button => button.props['attachmentType'] === attachmentType)
    }

    /*
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }))
    */
    //Button variant="text" endIcon={<Delete/>}>
    return (

        <div className={classes.page}>

            {(message && <Alert severity="success">
                {message} </Alert>
            )}

            {(errorMessage && <Alert severity="error">
                {errorMessage}</Alert>
            )}

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
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
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
                            <div id="valituomioButtons">
                                {filterButtons('valituomio')}
                            </div>
                            <br />
                        </Grid>
                        <Grid item xs={12}>
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
                            <div id="poytakirjaButtons">
                                {filterButtons('poytakirja')}
                            </div>
                            <br />
                        </Grid>
                        <Grid item xs={12}>
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
                            <div id="haastehakemusButtons">
                                {filterButtons('haastehakemus')}
                            </div>
                            <br />
                        </Grid>
                        <Grid item xs={12}>
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
                            <div id="rikosrekisterioteButtons">
                                {filterButtons('rikosrekisteriote')}
                            </div>
                            <br />
                        </Grid>
                        <Grid item xs={12}>
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
                            <div id="esitutkintapoytakirjaButtons">
                                {filterButtons('esitutkintapoytakirja')}
                            </div>
                            <br />
                        </Grid>
                        <Grid item xs={12}>
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
                            <div id="vangitsemispaatosButtons">
                                {filterButtons('vangitsemispaatos')}
                            </div>
                            <br />
                        </Grid>
                    </Grid>
                    <br />
                    <Button
                        className='btn-upload'
                        color='primary'
                        variant='contained'
                        component='span'
                        disabled={!selectedFiles}
                        onClick={upload}>
                            Lähetä tiedostoja
                    </Button>
                </Paper>
            </div>
        </div>
    )

}
export default UploadForm

