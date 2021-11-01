import React, { useState } from 'react'
import formService from '../services/formService'
import attachmentService from '../services/attachmentService'
import { Grid, Dialog, DialogContent, DialogTitle, DialogActions, Button, Typography, Select, FormControl, TextField } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useStyles } from '../styles'
import dayjs from 'dayjs'
import MenuItem from '@material-ui/core/MenuItem'
import PdfViewer from './PdfViewer'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf'

const FormState = ( { form, updateForms } ) => {

    const [selectedOption, setSelectedOption] = useState('')

    const changeFormState = (event) => {

        event.preventDefault()

        const updateFormState = { ...form, formState: selectedOption }
        formService.update(updateFormState.id, updateFormState)
            .then(response => {
                updateForms(response.data)
            })
    }

    const handleChange = (event) => {
        setSelectedOption(event.target.value)
    }

    return (
        <form onSubmit={changeFormState}>
            <div>
                <FormControl>
                    <Select
                        onChange={handleChange}
                        defaultValue= {form.formState ? form.formState : ' ' }
                        value={selectedOption || form.formState}
                        disableUnderline
                        id='selectState'>
                        <MenuItem id='0' value={'Pyyntö saapunut'}> Pyyntö saapunut</MenuItem>
                        <MenuItem id='1' value={'Pyyntö tarkastelussa'}>Pyyntö tarkastelussa</MenuItem>
                        <MenuItem id='2' value={'Pyydetty lisätietoja'}>Pyydetty lisätietoja</MenuItem>
                        <MenuItem id='3' value={'Saatu lisätietoja'}>Saatu lisätietoja</MenuItem>
                        <MenuItem id='4' value={'Pyyntö hyväksytty'}>Pyyntö hyväksytty</MenuItem>
                        <MenuItem id='5' value={'Odottaa tarkistusta'}>Odottaa tarkistusta</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <Button variant="outlined" color='primary' id='updateFormState' type='submit'>Päivitä</Button>
        </form>
    )
}

const AdditionalInfo = ({ form }) => {

    const [showAdditionalInfo, setShowAdditionalInfo] = useState(false)
    const [additionalInfo, setAdditionalInfo] = useState ('')
    const [message, setMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')


    const handleCloseAdditionalInfo = () => {
        setShowAdditionalInfo(false)
    }

    const handleShowAdditionalInfo = () => {
        setShowAdditionalInfo(true)
    }

    const handleAdditionalInfoChange = (event) => {
        setAdditionalInfo(event.target.value)
    }

    const requestAdditionalInfoFromSender = () => {
        const infoObject= {
            sender: form.sendersEmail,
            id: form.id,
            additional_info : additionalInfo
        }

        setErrorMessage('')

        formService
            .askForInfo(infoObject)
            .then(setAdditionalInfo(''))
        setMessage('Muokkauspyyntö lähetetty')
        setTimeout(() => {
            setMessage(null)
            setShowAdditionalInfo(false)
        }, 1000*7)

        /*  .then jälkeinen osa ei toimi ???
        const updateFormState = { ...form, formState: 'Pyydetty lisätietoja' }

        formService
            .askForInfo(infoObject)
            .update(form.id, updateFormState)
            .then(response => {
                setAdditionalInfo('')
                setMessage('Muokkauspyyntö lähetetty')
                setTimeout(() => {
                    setMessage(null)
                    setShowAdditionalInfo(false)
                }, 1000*7)
            }
            )
            .catch(error => {
                console.log(error)
                setErrorMessage('Muokkauspyynnön lähettämisessä tapahtui virhe!')
                setTimeout(() => {
                    setErrorMessage(null)
                }, 1000 * 7)
            }) */
    }


    if (showAdditionalInfo) {
        return (
            <Dialog open={showAdditionalInfo} onClose={handleCloseAdditionalInfo} maxWidth="md"  PaperProps={{
                style: {
                    backgroundColor: 'white',
                    boxShadow: 'none',
                    elevation:'3',
                    square:'false',
                    align:'left'
                },
            }} fullWidth>
                <DialogTitle disableTypography>
                    <h4> THL_OIKPSYK_{form.createdAt.substring(0,10)}</h4>
                    <form onSubmit = {requestAdditionalInfoFromSender}>
                        <Grid>
                            <TextField value={additionalInfo} onChange= {handleAdditionalInfoChange} multiline rows={10} fullWidth label='Pyydä lisätietoja...'/>
                        </Grid>
                        <Grid>
                            <Button variant='outlined' color='primary' type='submit'>Lähetä</Button>
                        </Grid>
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
                            <Button variant = 'contained' color='primary' align='right' onClick = {handleCloseAdditionalInfo}>Sulje</Button>
                        </DialogActions>

                    </form>
                </DialogTitle>
            </Dialog>
        )
    }

    return (
        <Button variant='outlined' color='primary' id='askAdditionalInfo' onClick={handleShowAdditionalInfo}> Pyydä lisätietoja</Button>

    )

}

const NotProsecuted = (form) => {
    const classes = useStyles ()
    if (form.form.prosecuted)
        return (
            <br></br>
        )
    else {
        return (
            <div>
                <Grid item xs={4}>
                    <div className = {classes.textLabel} id='prosecutionDeadLine'>Jos syytettä ei ole nostettu, syytteen nostamisen määräaika:</div>
                    <div className = {classes.text}>{dayjs(form.deadlineForProsecution).format('DD.MM.YYYY')}</div>
                </Grid>
                <Grid item xs={4}>
                    <div className={classes.textLabel} id='preTrialPoliceDepartment'>Jos syytettä ei ole nostettu, esitutkinnan suorittava poliisilaitos:</div>
                    <div className = {classes.text}>{form.preTrialPoliceDepartment}</div>
                </Grid>
            </div>
        )
    }
}

const DisplayProsecuted = ({ form }) => {
    if (form.prosecuted) {
        return (
            <div>Kyllä</div>
        )
    }else {
        return (
            <div> Ei</div>
        )
    }
}
const DisplayHazard = ({ form }) => {
    if (form.hazardAssesment) {
        return (
            <div>Kyllä</div>
        )
    }else {
        return (
            <div>Ei</div>
        )
    }
}

const AdmissionForm = ({ form, updateForms } ) => {

    const [showInfo, setShowInfo] = useState(false)
    const [attachment, setAttachment] = useState('')
    const [showAttachment, setShowAttachment] = useState(false)

    const handleShowMoreInfo = () => {
        setShowInfo(true)
    }

    const handleShowLessInfo = () => {
        setShowInfo(false)
    }

    const handleAttachment = ( id ) => {
        attachmentService.getOne(id).then(res => {
            var blob = new Blob([res], {
                type: 'application/pdf;chartset=UTF-8'
            })
            setAttachment(blob)
            setShowAttachment(true)
        })
    }

    const handleCloseAttachment = () => {
        setShowAttachment(false)
    }

    const classes = useStyles()

    if (showInfo) {
        return (
            <div>
                <Dialog open={showAttachment} onClose={handleCloseAttachment}>
                    <PdfViewer pdf={attachment} />
                </Dialog>

                <Dialog open={showInfo} onClose={handleShowLessInfo} maxWidth="md"  PaperProps={{
                    style: {
                        backgroundColor: 'white',
                        boxShadow: 'none',
                        elevation:'3',
                        square:'false',
                        align:'left'
                    },
                }} fullWidth>

                    <DialogTitle disableTypography>
                        <h1>THL_OIKPSYK_{form.createdAt.substring(0,10)}</h1>
                        <Grid
                            container
                            spacing={1}
                        >
                            <Grid item xs={4}>
                                <div className={classes.textLabel}>Pyyntö luotu:</div>
                                <div className={classes.text}>{dayjs(form.createdAt).format('DD.MM.YYYY HH:mm:ss')}</div>
                            </Grid>

                            <Grid item xs={4}>
                                <div className={classes.textLabel}>Tila:</div>
                                <div id='showState' className={classes.text}>{form.formState}</div>
                            </Grid>

                            <Grid item xs={4}>
                                <div className={classes.textLabel}>Päivitä lomakkeen tilaa:</div>
                                <FormState form={form} formState={form.formState} updateForms={updateForms} />
                            </Grid>
                        </Grid>
                        <Grid>
                            <AdditionalInfo form={form}/>
                        </Grid>

                    </DialogTitle>
                    <DialogContent>

                        <Grid>
                            <p> </p>
                            <Typography variant={'h4'}>Tutkittavan henkilön yleistiedot</Typography>
                            <br></br>

                            <Grid
                                container
                                spacing={1}
                            >
                                <br />
                                <Grid
                                    container
                                    rowspacing={2}
                                    columnspacing={{ xs: 2 }}
                                >
                                    <Grid item xs={6}>
                                        <div className={classes.textLabel}>Etunimet:</div>
                                        <div className={classes.text}>{form.name}</div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div className={classes.textLabel}>Sukunimi:</div>
                                        <div className={classes.text}>{form.lastname}</div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div className={classes.textLabel}>Henkilötunnus:</div>
                                        <div className={classes.text}>{form.identificationNumber}</div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div className={classes.textLabel}>Kotiosoite:</div>
                                        <div className={classes.text}>{form.address}</div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div className={classes.textLabel}>Sijainti:</div>
                                        <div className={classes.text}>{form.location}</div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div className={classes.textLabel}>Prosessiosoite:</div>
                                        <div className={classes.text}>{form.processAddress}</div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div className={classes.textLabel}>Edunvalvoja:</div>
                                        <div className={classes.text}>{form.trustee}</div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div className={classes.textLabel}>Kansalaisuus:</div>
                                        <div className={classes.text}>{form.citizenship}</div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div className={classes.textLabel}>Tutkimuspyynnön lähettävä taho:</div>
                                        <div className={classes.text}>{form.admissionNoteSendingOrganization}</div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div className={classes.textLabel}>Tutkimuspyynnön lähettävä henkilö:</div>
                                        <div className={classes.text}>{form.admissionNoteSender}</div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div className={classes.textLabel}>Tutkimuspyynnön lähettäjän sähköposti:</div>
                                        <div className={classes.text}>{form.sendersEmail}</div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div className={classes.textLabel}>Tutkimuspyynnön lähettäjän puhelinnumero:</div>
                                        <div className={classes.text}>{form.sendersPhoneNumber}</div>
                                    </Grid>
                                </Grid>
                                <br />
                                <Typography variant={'h4'}>Mielentilatutkimuslomake</Typography>
                                <br></br>

                                <Grid
                                    container
                                    spacing ={1}
                                >
                                    <Grid item xs={4}>
                                        <div className={classes.textLabel}>Halutaanko lisäksi vaarallisuusarvio:</div>
                                        <DisplayHazard form={form}/>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div className={classes.textLabel}>Oikeuden diaarinumero:</div>
                                        <div className={classes.text}>{form.diaariNumber}</div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div className={classes.textLabel}>Päivämäärä, jolla oikeus on määrännyt tutkittavan mielentilatutkimukseen:</div>
                                        <div className={classes.text}>{dayjs(form.datePrescribedForPsychiatricAssesment).format('DD.MM.YYYY')}</div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div className={classes.textLabel}>Tutkittavan äidinkieli:</div>
                                        <div className={classes.text}>{form.nativeLanguage}</div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div className={classes.textLabel}>Tutkittavan toivoma asiointikieli:</div>
                                        <div className={classes.text}>{form.desiredLanguageOfBusiness}</div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div className={classes.textLabel}>Tutkittavan kotikunta:</div>
                                        <div className={classes.text}>{form.municipalityOfResidence}</div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div className={classes.textLabel}>Onko syyte nostettu:</div>
                                        <DisplayProsecuted form={form}/>
                                    </Grid>
                                    <NotProsecuted
                                        form = {form}
                                    />

                                    <Grid item xs={4}>
                                        <div className={classes.textLabel}>Mielentilatutkimuksen määräämiseen johtanut vakavin teko (päätös tai välituomio):</div>
                                        <div className={classes.text}>{form.crime}</div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div className={classes.textLabel}>Muut kyseessä olevat teot, joista mielentilatutkimusta pyydetään:</div>
                                        <div className={classes.text}>{form.crimes}</div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div className={classes.textLabel}>Tutkittavan avustajan sähköposti:</div>
                                        <div className={classes.text}>{form.assistantsEmail}</div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div className={classes.textLabel}>Tutkittavan avustajan puhelinnumero:</div>
                                        <div className={classes.text}>{form.assistantsPhonenumber}</div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div className={classes.textLabel}>Tutkittavan avustajan osoite:</div>
                                        <div className={classes.text}>{form.assistantsAddress}</div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div className={classes.textLabel}>Alaikäisen tutkittavan huoltajan/sosiaalitoimen sähköposti:</div>
                                        <div className={classes.text}>{form.legalGuardianEmail}</div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div className={classes.textLabel}>Alaikäisen tutkittavan huoltajan/sosiaalitoimen puhelinnumero:</div>
                                        <div className={classes.text}>{form.legalGuardianPhonenumber}</div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div className={classes.textLabel}>Alaikäisen tutkittavan huoltajan/sosiaalitoimen osoite:</div>
                                        <div className={classes.text}>{form.legalGuardianAddress}</div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div className={classes.textLabel}>Alaikäisen tutkittavan huoltajan/sosiaalitoimen mahdollinen laitos:</div>
                                        <div className={classes.text}>{form.legalGuardianInstitute}</div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div className={classes.textLabel}>Mikäli lähettäjä hovioikeus/korkein oikeus, mihin päätökseen haettu muutosta:</div>
                                        <div className={classes.text}>{form.appealedDecision}</div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className={classes.textLabel}>Liitteet</div>
                                        {form.attachments.map(attachment => {
                                            return(
                                                <div key={attachment.id} className={classes.text}>
                                                    <Button onClick={() => handleAttachment(attachment.id)}>
                                                        { attachment.fileName.includes('pdf') &&
                                                                <PictureAsPdfIcon />
                                                        }
                                                        {attachment.whichFile}: {attachment.fileName}
                                                    </Button>
                                                </div>
                                            )
                                        })}
                                    </Grid>

                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" id='handleShowLessInfo' variant="contained" onClick={handleShowLessInfo}>
                        Sulje
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )


    } else {
        return (
            <div>
                <a href='#' id='handleShowMoreInfo' onClick={() => handleShowMoreInfo()}>
                    THL_OIKPSYK_{form.createdAt.substring(0,10)}
                </a>
            </div>
        )
    }
}

export default AdmissionForm