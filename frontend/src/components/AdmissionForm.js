import React, { /*useEffect,*/ useState } from 'react'
import admissionService from '../services/admissionService'
import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import BasicInformation from './BasicInformation'
import basicInformationService from '../services/basicInformationService'
import { Paper, Grid, Button, TextField, FormControl, Select, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Alert } from '@material-ui/lab'
import DateAdapter from '@mui/lab/AdapterDayjs'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import validator from 'validator'

const NotProsecuted = (props) => {
    if (props.prosecuted === false){
        return (
            <div>
                <Grid item xs={12}>
                    <div>Jos syytettä ei ole nostettu, syytteen nostamisen määräaika:</div>
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <DesktopDatePicker
                            label="Kalenteri"
                            inputFormat="DD/MM/YYYY"
                            value={props.deadlineForProsecution}
                            onChange={props.handleDeadlineForProsecutionChange}
                            renderInput={(params) => <TextField id='deadlineDate' {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                    <div>Jos syytettä ei ole nostettu, esitutkinnan suorittava poliisilaitos:</div>
                    <TextField fullWidth id='preTrialPoliceDepartment' value={props.preTrialPoliceDepartment} onChange={props.handlePreTrialPoliceDepartmentChange} label='Esitutkinnan suorittava poliisilaitos' variant='outlined' margin='normal' />
                </Grid>
            </div>
        )
    }
    else {
        return (
            <br></br>
        )
    }
}

const Form = () => {
    const basicInformationId = useParams().id
    const paramFormId = useParams().id
    const [senderInfo, setSenderInfo] = useState([])
    const [formVisible, setFormVisible] = useState(true)
    const [formId, setFormId] = useState('')
    const [formState, setFormState] = useState(null)


    const hideWhenVisible = { display: formVisible ? 'none' : '' }
    const showWhenVisible = { display: formVisible ? '' : 'none' }

    const toggleVisibility = () => {
        if(errorMessage === null){
            setFormVisible(!formVisible)
        }
    }

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
        },
        labelText: {
            fontSize: '12px',
            fontWeight: 'bold'
        }
    })

    const classes = useStyles()
    var sender = ''

    if (window.location.toString().includes('edit')){

        useEffect(() => {
            admissionService.get(paramFormId).then(res => {
                setSenderInfo(res[0])
                setFormState(res[0].formState)
            })
            console.log('senderInfo on: ', senderInfo)
        }, [])

    } else {
        useEffect(() => {
            basicInformationService.get(basicInformationId).then(res => {
                setSenderInfo(res[0])
            })
            console.log('senderInfo on: ', senderInfo)
        }, [])
    }
    sender = {
        admissionNoteSenderOrganization: senderInfo.admissionNoteSenderOrganization,
        admissionNoteSender: senderInfo.admissionNoteSender,
        sendersEmail: senderInfo.sendersEmail,
        sendersPhoneNumber: senderInfo.sendersPhoneNumber
    }



    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [identificationNumber, setIdentificationNumber] = useState('')
    const [address, setAddress] = useState('')
    const [location, setLocation] = useState('')
    const [processAddress, setProcessAddress] = useState('')
    const [trustee, setTrustee] = useState('')
    const [citizenship, setCitizenship] = useState('')
    const [hazardAssesment, setHazardAssesment] = useState(false)
    const [diaariNumber, setDiaariNumber] = useState('')
    const [datePrescribedForPsychiatricAssesment, setDatePrescribedForPsychiatricAssesment] = useState('')
    const [nativeLanguage, setNativeLanguage] = useState('')
    const [desiredLanguageOfBusiness, setDesiredLanguageOfBusiness] = useState('')
    const [municipalityOfResidence, setMunicipalityOfResidence] = useState('')
    const [prosecuted, setProsecuted] = useState(false)
    const [deadlineForProsecution, setDeadlineForProsecution] = useState('')
    const [preTrialPoliceDepartment, setPreTrialPoliceDepartment] = useState('')
    const [crime, setCrime] = useState('')
    const [crimes, setCrimes] = useState('')
    const [assistantsEmail, setAssistantsEmail] = useState('')
    const [assistantsPhonenumber, setAssistantsPhonenumber] = useState('')
    const [assistantsAddress, setAssistantsAddress] = useState('')
    const [legalGuardianEmail, setLegalGuardianEmail] = useState('')
    const [legalGuardianPhonenumber, setLegalGuardianPhonenumber] = useState('')
    const [legalGuardianAddress, setLegalGuardianAddress] = useState('')
    const [legalGuardianInstitute, setLegalGuardianInstitute] = useState('')
    const [appealedDecision, setAppealedDecision] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handleLastnameChange = (event) => {
        setLastname(event.target.value)
    }
    const handleIdentificationNumberChange = (event) => {
        setIdentificationNumber(event.target.value)
    }
    const handleAddressChange = (event) => {
        setAddress(event.target.value)
    }
    const handleLocationChange = (event) => {
        setLocation(event.target.value)
    }
    const handleProcessAddressChange = (event) => {
        setProcessAddress(event.target.value)
    }
    const handleTrusteeChange = (event) => {
        setTrustee(event.target.value)
    }
    const handleCitizenshipChange = (event) => {
        setCitizenship(event.target.value)
    }
    const handleHazardAssesmentChange = (event) => {
        setHazardAssesment(event.target.value)
    }
    const handleDiaariNumberChange = (event) => {
        setDiaariNumber(event.target.value)
    }
    const handleDatePrescribedForPsychiatricAssesmentChange = (newValue) => {
        setDatePrescribedForPsychiatricAssesment(newValue)
    }
    const handleNativeLanguageChange = (event) => {
        setNativeLanguage(event.target.value)
    }
    const handleDesiredLanguageOfBusinessChange = (event) => {
        setDesiredLanguageOfBusiness(event.target.value)
    }
    const handleMunicipalityOfResidenceChange = (event) => {
        setMunicipalityOfResidence(event.target.value)
    }
    const handleProsecutedChange = (event) => {
        setProsecuted(event.target.value)
    }
    const handleDeadlineForProsecutionChange = (newValue) => {
        setDeadlineForProsecution(newValue)
    }
    const handlePreTrialPoliceDepartmentChange = (event) => {
        setPreTrialPoliceDepartment(event.target.value)
    }
    const handleCrimeChange = (event) => {
        setCrime(event.target.value)
    }
    const handleCrimesChange = (event) => {
        setCrimes(event.target.value)
    }
    const handleAssistantsEmailChange = (event) => {
        setAssistantsEmail(event.target.value)
    }
    const handleAssistantsPhonenumberChange = (event) => {
        setAssistantsPhonenumber(event.target.value)
    }
    const handleAssistantsAddressChange = (event) => {
        setAssistantsAddress(event.target.value)
    }
    const handleLegalGuardianEmailChange = (event) => {
        setLegalGuardianEmail(event.target.value)
    }
    const handleLegalGuardianPhonenumberChange = (event) => {
        setLegalGuardianPhonenumber(event.target.value)
    }
    const handleLegalGuardianAddressChange = (event) => {
        setLegalGuardianAddress(event.target.value)
    }
    const handleLegalGuardianInstituteChange = (event) => {
        setLegalGuardianInstitute(event.target.value)
    }
    const handleAppealedDecisionChange = (event) => {
        setAppealedDecision(event.target.value)
    }

    const validateAssistantsEmail = () => {
        if (!validator.isEmail(assistantsEmail)) {
            console.log('virheellinen email')
            setErrorMessage('Avustajan sähköpostiosoite on virheellinen!')
            setTimeout(() => {
                setErrorMessage(null)
            }, 1000*7)
        }
    }

    const validateLegalGuardianEmail = () => {
        if (!validator.isEmail(legalGuardianEmail)) {
            console.log('virheellinen email')
            setErrorMessage('Edunvalvojan sähköpostiosoite on virheellinen!')
            setTimeout(() => {
                setErrorMessage(null)
            }, 1000*7)
        }
    }

    const validateEmail = ( email ) => {
        return !validator.isEmail(email)
    }

    const updatePerson = (event) => {

        event.preventDefault()

        if(formState === 'Pyydetty lisätietoja') {

            const updateAdmission = {
                formState : 'Saatu lisätietoja',
                name: name,
                lastname: lastname,
                identificationNumber: identificationNumber,
                address: address,
                location: location,
                processAddress: processAddress,
                trustee: trustee,
                citizenship: citizenship,
                hazardAssesment: hazardAssesment,
                diaariNumber: diaariNumber,
                datePrescribedForPsychiatricAssesment: datePrescribedForPsychiatricAssesment,
                nativeLanguage: nativeLanguage,
                desiredLanguageOfBusiness: desiredLanguageOfBusiness,
                municipalityOfResidence: municipalityOfResidence,
                prosecuted: prosecuted,
                deadlineForProsecution: deadlineForProsecution,
                preTrialPoliceDepartment: preTrialPoliceDepartment,
                crime: crime,
                crimes: crimes,
                assistantsEmail: assistantsEmail,
                assistantsPhonenumber: assistantsPhonenumber,
                assistantsAddress: assistantsAddress,
                legalGuardianEmail: legalGuardianEmail,
                legalGuardianPhonenumber: legalGuardianPhonenumber,
                legalGuardianAddress: legalGuardianAddress,
                legalGuardianInstitute: legalGuardianInstitute,
                appealedDecision: appealedDecision,
                researchUnit: '',
                researchUnitInformation: ''
            }
            for (const value in updateAdmission) {

                if (
                    updateAdmission[value] === null ||
                updateAdmission[value] === undefined ||
                updateAdmission[value] === ''
                ) {
                    delete updateAdmission[value]
                }
            }
            admissionService
                .update(paramFormId, updateAdmission)
                .then(response => {
                    console.log(response.data)
                    setFormId(response.data.id)
                    toggleVisibility()
                })
                .catch(error => {
                    console.log(error)
                    setErrorMessage('Mielentilatutkimuspyynnön muokkaamisessa tapahtui virhe!')
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 1000 * 7)
                })

        } else {
            setErrorMessage('Lisätietoja ei olla pyydetty')
            setTimeout(() => {
                setErrorMessage(null)
            }, 1000 * 7)
        }
    }



    const addPerson = (event) => {


        if (window.location.toString().includes('edit')){
            updatePerson(event)
        }
        else {

            event.preventDefault()

            const createAdmission = {
                //  oldId: old_id,
                formState : 'Odottaa tarkistusta',
                formSender: sender.sendersEmail,
                name: name,
                lastname: lastname,
                identificationNumber: identificationNumber,
                address: address,
                location: location,
                processAddress: processAddress,
                trustee: trustee,
                citizenship: citizenship,
                admissionNoteSenderOrganization: sender.admissionNoteSenderOrganization,
                admissionNoteSender: sender.admissionNoteSender,
                sendersEmail: sender.sendersEmail,
                sendersPhoneNumber: sender.sendersPhoneNumber,
                hazardAssesment: hazardAssesment,
                diaariNumber: diaariNumber,
                datePrescribedForPsychiatricAssesment: datePrescribedForPsychiatricAssesment,
                nativeLanguage: nativeLanguage,
                desiredLanguageOfBusiness: desiredLanguageOfBusiness,
                municipalityOfResidence: municipalityOfResidence,
                prosecuted: prosecuted,
                deadlineForProsecution: deadlineForProsecution,
                preTrialPoliceDepartment: preTrialPoliceDepartment,
                crime: crime,
                crimes: crimes,
                assistantsEmail: assistantsEmail,
                assistantsPhonenumber: assistantsPhonenumber,
                assistantsAddress: assistantsAddress,
                legalGuardianEmail: legalGuardianEmail,
                legalGuardianPhonenumber: legalGuardianPhonenumber,
                legalGuardianAddress: legalGuardianAddress,
                legalGuardianInstitute: legalGuardianInstitute,
                appealedDecision: appealedDecision,
            }

            console.log('Createadmission olio on:', createAdmission)


            validateAssistantsEmail()
            validateLegalGuardianEmail()

            if (errorMessage === null) {
                admissionService
                    .create(createAdmission)
                    .then(response => {
                        console.log(response.data)
                        setFormId(response.data.id)
                        toggleVisibility()
                    })
                    .catch(error => {
                        console.log(error)
                        setErrorMessage('Mielentilatutkimuspyynnön lähettämisessä tapahtui virhe!')
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 1000 * 7)
                    })

                setName('')
                setLastname('')
                setIdentificationNumber('')
                setAddress('')
                setLocation('')
                setProcessAddress('')
                setTrustee('')
                setCitizenship('')
                setHazardAssesment(false)
                setDiaariNumber('')
                setDatePrescribedForPsychiatricAssesment('')
                setNativeLanguage('')
                setDesiredLanguageOfBusiness('')
                setMunicipalityOfResidence('')
                setProsecuted(false)
                setDeadlineForProsecution('')
                setPreTrialPoliceDepartment('')
                setCrime('')
                setCrimes('')
                setAssistantsEmail('')
                setAssistantsPhonenumber('')
                setAssistantsAddress('')
                setLegalGuardianEmail('')
                setLegalGuardianPhonenumber('')
                setLegalGuardianAddress('')
                setLegalGuardianInstitute('')
                setAppealedDecision('')
            }
        }
    }

    const getSubmittedMessage = () => {

        var message = 'Pyyntö lähetettiin onnistuneesti!'

        if (formState !== null){
            message = 'Muokatut tiedot lähetetty!'
        }
        return (<p>{message}</p>)
    }


    return (

        <div>
            <div style={showWhenVisible}>

                <br></br>
                <br></br>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center' }}>
                    {(sender && <BasicInformation sender={sender} />)} </div>
                <br></br>
                <br></br>
                <br></br>


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
                        <h2>Tutkittavan henkilön yleistiedot:</h2>
                        <p></p>
                        <form onSubmit={addPerson}>
                            <Grid
                                container rowSpacing={2}
                                columnSpacing={{ xs: 2 }}
                            >
                                <Grid item xs={6}>
                                    <div className={classes.labelText}>Etunimet:</div>
                                    <TextField id='name' value={name} onChange={handleNameChange} label='Nimi' variant='outlined' margin='normal' />
                                </Grid>
                                <Grid item xs={6}>
                                    <div className={classes.labelText}>Sukunimi:</div>
                                    <TextField id='lastname' value={lastname} onChange={handleLastnameChange} label='Sukunimi' variant='outlined' margin='normal' />
                                </Grid>
                                <Grid item xs={6}>
                                    <div className={classes.labelText}>Henkilötunnus:</div>
                                    <TextField id='identificationNumber' value={identificationNumber} onChange={handleIdentificationNumberChange} label='Henkilötunnus' variant='outlined' margin='normal' />
                                </Grid>
                                <Grid item xs={6}>
                                    <div className={classes.labelText}>Kotiosoite:</div>
                                    <TextField id='address' value={address} onChange={handleAddressChange} label='Kotiosoite' variant='outlined' margin='normal' />
                                </Grid>
                                <Grid item xs={6}>
                                    <div className={classes.labelText}>Sijainti:</div>
                                    <TextField id='location' value={location} onChange={handleLocationChange} label='Sijainti' variant='outlined' margin='normal' />
                                </Grid>
                                <Grid item xs={6}>
                                    <div className={classes.labelText}>Prosessiosoite:</div>
                                    <TextField id='processAddress' value={processAddress} onChange={handleProcessAddressChange} label='Prosessiosoite' variant='outlined' margin='normal' />
                                </Grid>
                                <Grid item xs={6}>
                                    <div className={classes.labelText}>Edunvalvoja:</div>
                                    <TextField id='trustee' value={trustee} onChange={handleTrusteeChange} label='Edunvalvoja' variant='outlined' margin='normal' />
                                </Grid>
                                <Grid item xs={6}>
                                    <div className={classes.labelText}>Kansalaisuus:</div>
                                    <TextField id='citizenship' value={citizenship} onChange={handleCitizenshipChange} label='Kansalaisuus' variant='outlined' margin='normal' />
                                </Grid>
                            </Grid>

                            <h2>Mielentilatutkimuslomake:</h2>
                            <p></p>
                            <Grid
                                container rowSpacing={2}
                                columnSpacing={{ xs: 2 }}
                            >
                                <Grid item xs={6}>
                                    <div className={classes.labelText}>Halutaanko lisäksi vaarallisuusarvio:</div>
                                    <FormControl>
                                        <Select
                                            onChange={handleHazardAssesmentChange}
                                            value={hazardAssesment}
                                            disableUnderline
                                            id='selectHazardAssesment'>
                                            <MenuItem id='0' value={true}> Kyllä</MenuItem>
                                            <MenuItem id='1' value={false}>Ei</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className={classes.labelText}>Diaarinumero:</div>
                                    <TextField id='diaariNumber' value={diaariNumber} onChange={handleDiaariNumberChange} label='Diaarinumero' variant='outlined' margin='normal' />
                                </Grid>
                                <Grid item xs={12}>
                                    <div className={classes.labelText}>Päivämäärä, jolla oikeus on määrännyt tutkittavan mielentilatutkimukseen:</div>
                                    <LocalizationProvider dateAdapter={DateAdapter}>
                                        <DesktopDatePicker
                                            label="Kalenteri"
                                            inputFormat="DD/MM/YYYY"
                                            value={datePrescribedForPsychiatricAssesment}
                                            onChange={handleDatePrescribedForPsychiatricAssesmentChange}
                                            renderInput={(params) => <TextField id='date-picker' {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className={classes.labelText}>Tutkittavan äidinkieli:</div>
                                    <TextField id='nativeLanguage' value={nativeLanguage} onChange={handleNativeLanguageChange} label='Tutkittavan äidinkieli' variant='outlined' margin='normal' />
                                </Grid>
                                <Grid item xs={6}>
                                    <div className={classes.labelText}>Tutkittavan toivoma asiointikieli:</div>
                                    <TextField id='desiredLanguageOfBusiness' value={desiredLanguageOfBusiness} onChange={handleDesiredLanguageOfBusinessChange} label='Tutkittavan toivoma asiointikieli' variant='outlined' margin='normal' />
                                </Grid>
                                <Grid item xs={6}>
                                    <div className={classes.labelText}>Tutkittavan kotikunta:</div>
                                    <TextField id='municipalityOfResidence' value={municipalityOfResidence} onChange={handleMunicipalityOfResidenceChange} label='Tutkittavan kotikunta' variant='outlined' margin='normal' />
                                </Grid>
                                <Grid item xs={6}>
                                    <div className={classes.labelText}>Onko syyte nostettu:</div>
                                    <FormControl>
                                        <Select
                                            onChange={handleProsecutedChange}
                                            value={prosecuted}
                                            disableUnderline
                                            id='selectIfProsecuted'>
                                            <MenuItem id='0' value={true}> Kyllä</MenuItem>
                                            <MenuItem id='1' value={false}>Ei</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <NotProsecuted
                                    prosecuted ={prosecuted}
                                    deadlineForProsecution = {deadlineForProsecution}
                                    handleDeadlineForProsecutionChange = {handleDeadlineForProsecutionChange}
                                    preTrialPoliceDepartment = {preTrialPoliceDepartment}
                                    handlePreTrialPoliceDepartmentChange = {handlePreTrialPoliceDepartmentChange}
                                />
                                <Grid item xs={12}>
                                    <div className={classes.labelText}>Mielentilatutkimuksen määräämiseen johtanut vakavin teko (päätös tai välituomio):</div>
                                    <TextField fullWidth id='crime' value={crime} onChange={handleCrimeChange} label='Vakavin teko (päätös tai välituomio)' variant='outlined' margin='normal' />
                                </Grid>
                                <Grid item xs={12}>
                                    <div className={classes.labelText}>Muut kyseessä olevat teot, joista mielentilatutkimusta pyydetään:</div>
                                    <TextField fullWidth id='crimes' value={crimes} onChange={handleCrimesChange} label='Muut kyseessä olevat teot' variant='outlined' margin='normal' />
                                </Grid>
                                <Grid item xs={6}>
                                    <div className={classes.labelText}>Tutkittavan avustajan sähköposti:</div>
                                    <TextField id='assistantsEmail' value={assistantsEmail} onChange={handleAssistantsEmailChange} label='Avustajan sähköposti' variant='outlined' margin='normal'
                                        required error={validateEmail(assistantsEmail)}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className={classes.labelText}>Tutkittavan avustajan puhelinnumero:</div>
                                    <TextField id='assistantsPhonenumber' value={assistantsPhonenumber} onChange={handleAssistantsPhonenumberChange} label='Avustajan puhelinnumero' variant='outlined' margin='normal' />
                                </Grid>
                                <Grid item xs={6}>
                                    <div className={classes.labelText}>Tutkittavan avustajan osoite:</div>
                                    <TextField id='assistantsAddress' value={assistantsAddress} onChange={handleAssistantsAddressChange} label='Avustajan osoite' variant='outlined' margin='normal' />
                                </Grid>
                                <Grid item xs={6}>
                                    <div className={classes.labelText}>Alaikäisen tutkittavan huoltajan/sosiaalitoimen sähköposti:</div>
                                    <TextField fullWidth id='legalGuardianEmail' value={legalGuardianEmail} onChange={handleLegalGuardianEmailChange} label='Huoltajan/sosiaalitoimen sähköposti' variant='outlined' margin='normal'
                                        required error={validateEmail(assistantsEmail)}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className={classes.labelText}>Alaikäisen tutkittavan huoltajan/sosiaalitoimen puhelinnumero:</div>
                                    <TextField fullWidth id='legalGuardianPhonenumber' value={legalGuardianPhonenumber} onChange={handleLegalGuardianPhonenumberChange} label='Huoltajan/sosiaalitoimen puhelinnumero' variant='outlined' margin='normal' />
                                </Grid>
                                <Grid item xs={12}>
                                    <div className={classes.labelText}>Alaikäisen tutkittavan huoltajan/sosiaalitoimen osoite:</div>
                                    <TextField fullWidth id='legalGuardianAddress' value={legalGuardianAddress} onChange={handleLegalGuardianAddressChange} label='Huoltajan/sosiaalitoimen osoite' variant='outlined' margin='normal' />
                                </Grid>
                                <Grid item xs={12}>
                                    <div className={classes.labelText}>Alaikäisen tutkittavan huoltajan/sosiaalitoimen mahdollinen laitos:</div>
                                    <TextField fullWidth id='legalGuardianInstitute' value={legalGuardianInstitute} onChange={handleLegalGuardianInstituteChange} label='Huoltajan/sosiaalitoimen mahdollinen laitos' variant='outlined' margin='normal' />
                                </Grid>
                                <Grid item xs={12}>
                                    <div className={classes.labelText}>Mikäli lähettäjä hovioikeus/korkein oikeus, mihin päätökseen haettu muutosta:</div>
                                    <TextField fullWidth id='appealedDecision' value={appealedDecision} onChange={handleAppealedDecisionChange} label='Mihin päätökseen haettu muutosta' variant='outlined' margin='normal' />
                                </Grid>
                            </Grid>
                            {(errorMessage && <Alert severity="error">
                                {errorMessage}</Alert>
                            )}
                            <Button id='createPersonButton' type="submit">Lähetä</Button>
                            <p></p>
                            <p></p>
                        </form>
                    </Paper>
                </div>
            </div>

            <div style={hideWhenVisible}>
                <p></p>
                <p></p>
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
                        <h2>{getSubmittedMessage()}</h2>
                        <p></p>
                        <Grid
                            container rowSpacing={2}
                            columnSpacing={{ xs: 1 }}
                        >
                            <Grid item xs={6}>
                                <Button onClick={toggleVisibility} type="submit" style={{ color: '#228B22', bordercolor: '#228B22' }} >Lähetä uusi pyyntö</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button style={{ color: '#228B22', bordercolor: '#228B22' }}>
                                    <Link to={`/upload_form/${formId}`}>Lisää liitteitä</Link>
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            </div>
        </div>
    )
}

export default Form