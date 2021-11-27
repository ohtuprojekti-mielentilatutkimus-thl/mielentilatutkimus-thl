/*eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react'
import admissionService from '../services/admissionService'
import { useParams } from 'react-router-dom'
import { Alert } from '@material-ui/lab'
import { Button, Grid, List, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Divider, Stack } from '@mui/material'

import useMessage from '../utils/messageHook'

import FileChip from './FileChip'
import Messages from './Messages'

const UploadForm = () => {

    const [filesInfo, setFilesInfo] = useState([])
    const [selectedFiles, setSelectedFiles] = useState([])

    const msg = useMessage()

    useEffect(() => {
        let filesInfoArray = sessionStorage.getItem('filesInfo')
        let parsed = JSON.parse(filesInfoArray)

        if (parsed) {
            setFilesInfo(parsed)
        }
    }, [])

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
            window.scrollTo(0, 0)
            msg.setErrorMsg(`Tiedosto nimellä ${file.name} on jo valittu lähetettäväksi tai lähetetty, ei samannimisiä tiedostoja kahdesti`)
            return
        }

        setSelectedFiles(selectedFiles.concat(file))
        setFilesInfo(filesInfo.concat({ name: file.name, whichFile: event.target.id, disabled: false }))
    }

    const disableSentChips = () => filesInfo.forEach(fileInfo => fileInfo.disabled = true)
    const updateSessionStorage = () => sessionStorage.setItem('filesInfo', JSON.stringify(filesInfo))

    const removeFile = fileName => {
        setSelectedFiles(selectedFiles.filter(file => file.name !== fileName))
        setFilesInfo(filesInfo.filter(fileInfo => fileInfo.name !== fileName))
    }

    const ChipList = ({ attachmentType }) => {
        let filteredFilesInfo = filesInfo.filter(fileInfo => fileInfo.whichFile === attachmentType)

        return (
            <List component={Stack} direction='row' justifyContent='center'>
                {filteredFilesInfo.map(fileInfo =>
                    <FileChip key={fileInfo.name} fileInfo={fileInfo} removeFile={removeFile} />
                )}
            </List>
        )
    }

    const duplicateFileName = name => filesInfo.find(fileInfo => fileInfo.name === name)

    const upload = async (event) => {
        event.preventDefault()

        msg.clear()

        const filesInfoToSend = filesInfo.filter(fileInfo => fileInfo.disabled === false)
        const filesInfoDisabledPropRemoved = filesInfoToSend.map(({ disabled, ...fileInfo }) => fileInfo)

        const res = await admissionService.upload(selectedFiles, AdmissionFormId, filesInfoDisabledPropRemoved)

        window.scrollTo(0, 0)

        if (res.status === 200) {
            msg.setMsg('Liitteiden lähetys onnistui! Voit sulkea välilehden tai lähettää lisää liitteitä. Aiemmin lähettämäsi liitteet näkyvät häivytettynä eivätkä lähety uudestaan')
        } else {
            msg.setErrorMsg('Liitteiden lähetys epäonnistui!')
        }

        disableSentChips()
        // disableSentChips() sets disabled = true so these two need to be called in this order
        updateSessionStorage()
        setSelectedFiles([])
    }

    return (
        <div className={classes.page}>

            {(msg.messagesNotEmpty && <Messages msgArray={msg.messages} severity='success' />)}
            {(msg.errorMessagesNotEmpty && <Messages msgArray={msg.errorMessages} severity='error' />)}

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
                    spacing={30}
                >
                    <h2>Lataa liitteitä</h2>
                    <br />
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
                    <Grid container>
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
                    <Grid container>
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
                    <Grid container>
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
                    <Grid container>
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
                    <Grid container>
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
                    <br />
                    <Button
                        className='btn-upload'
                        color='primary'
                        variant='contained'
                        component='span'
                        disabled={selectedFiles.length === 0}
                        onClick={upload}>
                            Lähetä
                    </Button>
                </Paper>
            </div>
        </div>
    )

}

export default UploadForm