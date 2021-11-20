import React, { useState } from 'react'
import admissionService from '../services/admissionService'
import { useParams } from 'react-router-dom'
import { Alert } from '@material-ui/lab'
import { Button, Grid, List, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Divider, Stack } from '@mui/material'

import FileChip from './FileChip'
import { Box } from '@mui/system'

const UploadForm = () => {

    const [errorMessage, setErrorMessage] = useState(null)
    const [filesInfo, setFilesInfo] = useState([])
    const [message, setMessage] = useState(null)
    const [selectedFiles, setSelectedFiles] = useState([])

    const [fileChips, setFileChips] = useState([])

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

        clearMessages()

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
        addNewFileChip(file.name, event.target.id)
    }

    const addNewFileChip = (fileName, attachmentType) => {
        setFileChips(fileChips.concat({ key: fileName, label: fileName, attachmentType: attachmentType }))
    }

    const removeFile = fileName => {
        setFileChips(fileChips.filter(chip => chip.key !== fileName))
        setSelectedFiles(selectedFiles.filter(file => file.name !== fileName))
        setFilesInfo(filesInfo.filter(fileInfo => fileInfo.name !== fileName))
    }

    const ChipList = ({ attachmentType }) => {
        let filteredChips = fileChips.filter(chip => chip.attachmentType === attachmentType)

        return (
            <List component={Stack} direction='row' justifyContent='center'>
                {filteredChips.map(chip =>
                    <FileChip key={chip.label} fileName={chip.label} attachmentType={chip.attachmentType} removeFile={removeFile} />
                )}
            </List>
        )
    }

    const clearMessages = () => {
        setErrorMessage(null)
        setMessage(null)
    }

    const duplicateFileName = name => filesInfo.find(fileInfo => fileInfo.name === name)

    const upload = async (event) => {
        event.preventDefault()

        clearMessages()

        const res = await admissionService.upload(selectedFiles, AdmissionFormId, filesInfo)

        if (res.status === 200) {
            setMessage('Liitteiden lähetys onnistui! Voit sulkea välilehden')
        } else {
            setErrorMessage('Liitteiden lähetys epäonnistui!')
            setTimeout(() => {
                setErrorMessage(null)
            }, 1000*7)
        }

        setFilesInfo(null)
        setSelectedFiles([])
    }

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
                    spacing={3}
                >
                    <h2>Lataa liitteitä</h2>
                    <br />
                    <Box justifyContent='center' alignItems='center'>
                        <Grid container>
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
                            </Grid>
                            <Grid item xs={12}>
                                <ChipList attachmentType='valituomio' />
                            </Grid>
                        </Grid>
                        <Divider  variant='middle' style={{ width: '75%', borderBottomWidth: 2, margin: 10 }}/>
                        <Grid container rowSpacing={1} alignItems='center'>
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
                            </Grid>
                            <Grid item xs={12}>
                                <ChipList attachmentType='poytakirja' />
                            </Grid>
                        </Grid>
                        <Divider  variant='middle' style={{ width: '75%', borderBottomWidth: 2, margin: 10 }}/>
                        <Grid container rowSpacing={1} alignItems='center'>
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
                            </Grid>
                            <Grid item xs={12}>
                                <ChipList attachmentType='haastehakemus' />
                            </Grid>
                        </Grid>
                        <Divider  variant='middle' style={{ width: '75%', borderBottomWidth: 2, margin: 10 }}/>
                        <Grid container rowSpacing={1} alignItems='center'>
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
                            </Grid>
                            <Grid item xs={12}>
                                <ChipList attachmentType='rikosrekisteriote' />
                            </Grid>
                        </Grid>
                        <Divider  variant='middle' style={{ width: '75%', borderBottomWidth: 2, margin: 10 }}/>
                        <Grid container rowSpacing={1} alignItems='center'>
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
                            </Grid>
                            <Grid item xs={12}>
                                <ChipList attachmentType='esitutkintapoytakirja' />
                            </Grid>
                        </Grid>
                        <Divider  variant='middle' style={{ width: '75%', borderBottomWidth: 2, margin: 10 }}/>
                        <Grid container rowSpacing={1} alignItems='center'>
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
                            </Grid>
                            <Grid item xs={12}>
                                <ChipList attachmentType='vangitsemispaatos' />
                            </Grid>
                        </Grid>
                    </Box>
                    <br />
                    <Button
                        className='btn-upload'
                        color='primary'
                        variant='contained'
                        component='span'
                        disabled={!selectedFiles}
                        onClick={upload}>
                            Lähetä
                    </Button>
                </Paper>
            </div>
        </div>
    )

}
export default UploadForm