import React, { useState } from 'react'
import admissionService from '../services/admissionService'
import { useParams } from 'react-router-dom'
import { Paper, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const UploadForm = () => {

    const [filesInfo, setFilesInfo] = useState([])
    const [selectedFiles, setSelectedFiles] = useState([])

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
            // tässä voisi tapahtua jokin virheilmoitus joka kertoo käyttäjälle:
            // tiedostoa ei hyväksytty uploadattavaksi koska samanniminen tiedosto oli jo valittu
            console.log('duplikaatti')
            return
        }

        setSelectedFiles(selectedFiles.concat(file))
        setFilesInfo(filesInfo.concat({ name: file.name, whichFile: event.target.id }))
    }

    const duplicateFileName = name => filesInfo.find(fileInfo => fileInfo.name === name)

    const upload = async () => {
        await admissionService.upload(selectedFiles, AdmissionFormId, filesInfo)

        // täällä käyttäjälle palautetta onnistuneesta / epäonnistuneesta uploadauksesta?
        // pitäisikö redirectaa jonnekin, käyttäjällä ei kuitenkaan syytä jäädä upload-sivulle jos onnistui
        setSelectedFiles(null)
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

