import React, { useState } from 'react'
import admissionService from '../services/admissionService'
import { useParams } from 'react-router-dom'
import { Paper, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const UploadForm = () => {

    const [selectedFiles, setSelectedFiles] = useState(null)
    const [whichFile, setWhichFile] = useState('')
    const AdmissionFormId = useParams().id

    console.log(AdmissionFormId)

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
        const inputTarget = event.target
        setSelectedFiles(inputTarget.files[0])
        setWhichFile(inputTarget.id)
        console.log(selectedFiles)
        console.log(whichFile)
    }

    const upload = async () => {
        console.log(AdmissionFormId)
        const currFile = selectedFiles
        console.log(typeof(currFile))
        await admissionService.upload(currFile, AdmissionFormId, whichFile)
        setSelectedFiles(null)
        setWhichFile(null)
    }

    return (

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
                        color='primary'
                        variant='contained'
                        component='span'
                        disabled={!selectedFiles}
                        onClick={upload}>
                            Lataa valittu tiedosto
                    </Button>
                </Paper>
            </div>
        </div>
    )

}

export default UploadForm

