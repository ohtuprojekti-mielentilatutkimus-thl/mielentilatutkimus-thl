import React, { /*useEffect,*/ useState } from 'react'
import admissionService from '../services/admissionService'
import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import BasicInformation from './BasicInformation'
import basicInformationService from '../services/basicInformationService'
import { Paper, Grid, Button, TextField, FormControl, Select, MenuItem, Typography, FormHelperText } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import DateAdapter from '@mui/lab/AdapterDayjs'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import validator from 'validator'
import { useStyles } from '../styles'

const NotProsecuted = (props) => {
    if (props.prosecuted === false){
        return (
            <span>
                <Grid item xs={5,5}>
                    <TextField fullWidth
                        helperText='Jos syytettä ei ole nostettu, esitutkinnan suorittava poliisilaitos' id='preTrialPoliceDepartment' value={props.preTrialPoliceDepartment}
                        onChange={props.handlePreTrialPoliceDepartmentChange} variant='outlined' margin='normal' />
                </Grid>
                <Grid item xs={5,5}>
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <DesktopDatePicker
                            inputFormat="DD/MM/YYYY"
                            value={props.deadlineForProsecution}
                            onChange={props.handleDeadlineForProsecutionChange}
                            renderInput={(params) => <TextField id='deadlineDate' {...params} />}
                        />
                        <FormHelperText>Syytteen nostamisen määräaika</FormHelperText>
                    </LocalizationProvider>
                </Grid>
            </span>
        )
    }
    else {
        return (
            <div>
            </div>
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
    const [validateError, setValidateError] = useState(false)

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
        if (!validator.isEmail(assistantsEmail) && assistantsEmail.length>0) {
            console.log('virheellinen email')
            setValidateError(Boolean(true))
            setErrorMessage('Avustajan sähköpostiosoite on virheellinen!')
            setTimeout(() => {
                setErrorMessage(null)
            }, 1000*7)
        }
    }

    const validateLegalGuardianEmail = () => {
        if (!validator.isEmail(legalGuardianEmail) && legalGuardianEmail.length>0) {
            console.log('virheellinen email')
            setValidateError(Boolean(true))
            setErrorMessage('Edunvalvojan sähköpostiosoite on virheellinen!')
            setTimeout(() => {
                setErrorMessage(null)
            }, 1000*7)
        }
    }


    const updatePerson = (event) => {

        event.preventDefault()

        if(formState === 'Pyydetty lisätietoja') {

            validateAssistantsEmail()
            validateLegalGuardianEmail()

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

            if (errorMessage === null) {
                admissionService
                    .update(paramFormId, updateAdmission)
                    .then(response => {
                        console.log(response.data)
                        setFormId(response.data.id)
                        toggleVisibility()
                    })
                    .catch(error => {
                        console.log(error)
                        if(validateError===false){
                            setErrorMessage('Mielentilatutkimuspyynnön muokkaamisessa tapahtui virhe!')
                            setTimeout(() => {
                                setErrorMessage(null)
                            }, 1000 * 7)
                        }
                    })
            }
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
                        if(validateError===false){
                            setErrorMessage('Mielentilatutkimuspyynnön lähettämisessä tapahtui virhe!')
                            setTimeout(() => {
                                setErrorMessage(null)
                            }, 1000 * 7)

                        }
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


    const validateEmail = ( email ) => {
        return email
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
                        align='left'
                        justify='center'
                    >
                        <br></br>
                        <br></br>
                        <Typography variant={'h4'}>Mielentilatutkimuspyyntö</Typography>
                        <br></br>
                        <div>
                          Lomake on tarkoitettu mielentilatutkimuspyynnön lähettämiseen Terveyden- ja hyvinvoinnin laitokselle (THL).
                        </div>
                        <br></br>
                        <br></br>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'left' }}>
                            {(sender && <BasicInformation sender={sender} />)} </div>
                        <br></br>
                        <br></br>

                        <Typography variant={'h5'}>Tutkittavan henkilön yleistiedot:</Typography>
                        <p></p>
                        <form onSubmit={addPerson}>
                            <Grid
                                container
                                rowSpacing={2}
                            >
                                <Grid item xs={5,5} >

                                    <TextField fullWidth
                                        helperText='Etunimet' id='name' value={name}
                                        onChange={handleNameChange}  variant='outlined' margin='normal'/>
                                </Grid>
                                <Grid item xs={1}/>
                                <Grid item xs={5,5}>

                                    <TextField fullWidth
                                        helperText='Sukunimi' id='lastname' value={lastname}
                                        onChange={handleLastnameChange} variant='outlined' margin='normal' />
                                </Grid>
                                <Grid item xs={5,5}>
                                    <TextField fullWidth
                                        helperText='Henkilötunnus' id='identificationNumber' value={identificationNumber}
                                        onChange={handleIdentificationNumberChange} variant='outlined' margin='normal' />
                                </Grid>
                                <Grid item xs={1}/>
                                <Grid item xs={5,5}>
                                    <TextField fullWidth
                                        helperText='Kotiosoite' id='address' value={address}
                                        onChange={handleAddressChange} variant='outlined' margin='normal' />
                                </Grid>
                                <Grid item xs={5,5}>
                                    <TextField fullWidth
                                        helperText='Sijainti' id='location' value={location}
                                        onChange={handleLocationChange} variant='outlined' margin='normal' />
                                </Grid>
                                <Grid item xs={1}/>
                                <Grid item xs={5,5}>
                                    <TextField fullWidth
                                        helperText='Prosessiosoite' id='processAddress' value={processAddress}
                                        onChange={handleProcessAddressChange} variant='outlined' margin='normal' />
                                </Grid>
                                <Grid item xs={5,5}>
                                    <TextField fullWidth
                                        helperText='Edunvalvoja' id='trustee' value={trustee}
                                        onChange={handleTrusteeChange} variant='outlined' margin='normal' />
                                </Grid>
                                <Grid item xs={1}/>
                                <Grid item xs={5,5}>
                                    <TextField fullWidth
                                        helperText='Kansalaisuus' id='citizenship' value={citizenship}
                                        onChange={handleCitizenshipChange} variant='outlined' margin='normal' />
                                </Grid>
                            </Grid>
                            <br></br>
                            <Typography variant={'h5'}>Mielentilatutkimuslomake:</Typography>
                            <p></p>
                            <Grid
                                container rowSpacing={2}
                                columnSpacing={{ xs: 2 }}
                            >
                                <Grid item xs={5,5}>
                                    <FormControl>
                                        <Select
                                            onChange={handleHazardAssesmentChange}
                                            value={hazardAssesment}
                                            variant = 'outlined'
                                            id='selectHazardAssesment'>
                                            <MenuItem id='0' value={true}> Kyllä</MenuItem>
                                            <MenuItem id='1' value={false}>Ei</MenuItem>
                                        </Select>
                                        <FormHelperText>Halutaanko lisäksi vaarallisuusarvio?</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={1}/>
                                <Grid item xs={5,5}>
                                    <LocalizationProvider dateAdapter={DateAdapter}>
                                        <DesktopDatePicker
                                            inputFormat="DD/MM/YYYY"
                                            value={datePrescribedForPsychiatricAssesment}
                                            onChange={handleDatePrescribedForPsychiatricAssesmentChange}
                                            renderInput={(params) => <TextField id='date-picker' {...params} />}
                                        />
                                        <FormHelperText>Päivämäärä, jolla oikeus on määrännyt tutkittavan mielentilatutkimukseen</FormHelperText>
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={5,5}>
                                    <TextField fullWidth
                                        helperText='Diaarinumero' id='diaariNumber' value={diaariNumber}
                                        onChange={handleDiaariNumberChange} variant='outlined' margin='normal' />
                                </Grid>
                                <Grid item xs={1}/>
                                <Grid item xs={5,5}>
                                    <TextField fullWidth
                                        helperText='Tutkittavan äidinkieli'id='nativeLanguage' value={nativeLanguage}
                                        onChange={handleNativeLanguageChange} variant='outlined' margin='normal' />
                                </Grid>
                                <Grid item xs={5,5}>
                                    <TextField fullWidth
                                        helperText='Tutkittavan toivoma asiointikieli' id='desiredLanguageOfBusiness'
                                        onChange={handleDesiredLanguageOfBusinessChange} variant='outlined' margin='normal' />
                                </Grid>
                                <Grid item xs={1}/>
                                <Grid item xs={5,5}>
                                    <TextField fullWidth
                                        helperText='Tutkittavan kotikunta' id='municipalityOfResidence' value={municipalityOfResidence}
                                        onChange={handleMunicipalityOfResidenceChange} variant='outlined' margin='normal' />
                                </Grid>
                                <Grid item xs={5,5}>
                                    <FormControl >
                                        <Select
                                            onChange={handleProsecutedChange}
                                            value={prosecuted}
                                            variant = 'outlined'
                                            id='selectIfProsecuted'>
                                            <MenuItem id='0' value={true}> Kyllä</MenuItem>
                                            <MenuItem id='1' value={false}>Ei</MenuItem>
                                        </Select>
                                        <FormHelperText>Onko syyte nostettu</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={1}/>
                                <Grid item xs={12} >
                                    <NotProsecuted
                                        prosecuted ={prosecuted}
                                        deadlineForProsecution = {deadlineForProsecution}
                                        handleDeadlineForProsecutionChange = {handleDeadlineForProsecutionChange}
                                        preTrialPoliceDepartment = {preTrialPoliceDepartment}
                                        handlePreTrialPoliceDepartmentChange = {handlePreTrialPoliceDepartmentChange}
                                    />
                                </Grid>
                                <Grid item xs={5,5}>
                                    <TextField fullWidth
                                        helperText='Vakavin teko (päätös tai välituomio)'id='crime' value={crime}
                                        onChange={handleCrimeChange} variant='outlined' margin='normal' />
                                </Grid>
                                <Grid item xs={1}/>
                                <Grid item xs={5,5}>
                                    <TextField fullWidth
                                        helperText='Muut kyseessä olevat teot, joista mielentilatutkimusta pyydetään' id='crimes' value={crimes}
                                        onChange={handleCrimesChange} variant='outlined' margin='normal' />
                                </Grid>
                                <Grid item xs={1}/>
                                <Grid item xs={5,5}>
                                    <TextField fullWidth
                                        helperText='Tutkittavan avustajan sähköposti' id='assistantsEmail' value={assistantsEmail}
                                        onChange={handleAssistantsEmailChange} variant='outlined' margin='normal'
                                    />
                                </Grid>
                                <Grid item xs={1}/>
                                <Grid item xs={5,5}>
                                    <TextField fullWidth
                                        helperText='Tutkittavan avustajan puhelinnumero' id='assistantsPhonenumber' value={assistantsPhonenumber}
                                        onChange={handleAssistantsPhonenumberChange} variant='outlined' margin='normal' />
                                </Grid>
                                <Grid item xs={1}/>
                                <Grid item xs={5,5}>
                                    <TextField fullWidth
                                        helperText='Tutkittavan avustajan osoite' id='assistantsAddress' value={assistantsAddress}
                                        onChange={handleAssistantsAddressChange} variant='outlined' margin='normal' />
                                </Grid>
                                <Grid item xs={1}/>
                                <Grid item xs={5,5}>
                                    <TextField fullWidth
                                        helperText= 'Alaikäisen tutkittavan huoltajan/sosiaalitoimen sähköposti' id='legalGuardianEmail'
                                        value={legalGuardianEmail} onChange={handleLegalGuardianEmailChange} variant='outlined' margin='normal'
                                        required error={validateEmail(legalGuardianEmail)}/>
                                </Grid>
                                <Grid item xs={1}/>
                                <Grid item xs={5,5}>
                                    <TextField fullWidth
                                        helperText='Alaikäisen tutkittavan huoltajan/sosiaalitoimen puhelinnumero' id='legalGuardianPhonenumber' value={legalGuardianPhonenumber}
                                        onChange={handleLegalGuardianPhonenumberChange} variant='outlined' margin='normal' />
                                </Grid>
                                <Grid item xs={1}/>
                                <Grid item xs={5,5}>
                                    <TextField fullWidth
                                        helperText='Alaikäisen tutkittavan huoltajan/sosiaalitoimen osoite' id='legalGuardianAddress' value={legalGuardianAddress}
                                        onChange={handleLegalGuardianAddressChange} variant='outlined' margin='normal' />
                                </Grid>
                                <Grid item xs={1}/>
                                <Grid item xs={5,5}>
                                    <TextField fullWidth
                                        helperText='Alaikäisen tutkittavan huoltajan/sosiaalitoimen mahdollinen laitos' id='legalGuardianInstitute' value={legalGuardianInstitute}
                                        onChange={handleLegalGuardianInstituteChange} variant='outlined' margin='normal' />
                                </Grid>
                                <Grid item xs={1}/>
                                <Grid item xs={5,5}>
                                    <TextField fullWidth
                                        helperText='Mikäli lähettäjä hovioikeus/korkein oikeus, mihin päätökseen haettu muutosta' id='appealedDecision' value={appealedDecision}
                                        onChange={handleAppealedDecisionChange} variant='outlined' margin='normal' />
                                </Grid>
                            </Grid>
                            {(errorMessage && <Alert severity="error">
                                {errorMessage}</Alert>
                            )}
                            <Button variant='contained' color='primary' id='createPersonButton' type="submit">Lähetä</Button>
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
                                    <Link to={`/upload_form/${formId}`} id="addAttachments">Lisää liitteitä</Link>
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