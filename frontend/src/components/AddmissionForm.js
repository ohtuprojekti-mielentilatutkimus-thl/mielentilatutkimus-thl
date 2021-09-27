import React, { /*useEffect,*/ useState } from 'react'
import addmissionService from '../services/addmissionService'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import BasicInformation from './BasicInformation'
import basicInformationService from '../services/basicInformationService'

/* // toiminnallisuus myöhemmälle
var old_id = ''

const EditingForm = () => {

    const queryParams = new URLSearchParams(window.location.search)
    const change = Boolean(queryParams.get('id'))
    // console.log('old id: ', { old_id } ,' ja change on: ', { change })

    if (change) {
        old_id = queryParams.get('old_id')

        return (
            <h1>Lomakkeen {old_id} muokkaustila</h1>
        )
    } return (
        <h1>Syötä henkilön tiedot:</h1>
    )
} */

const Form = () => {

    const basicInformationId = useParams().id
    const [senderInfo, setSenderInfo] = useState([])


    useEffect(() => {
        basicInformationService.get(basicInformationId).then(res => {
            console.log(res)
            setSenderInfo(res[0]) })
        console.log('senderInfo: ', senderInfo)
    }, [])

    const sender = {
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
    const [admissionNoteSendingOrganization, setAdmissionNoteSendingOrganization] = useState('')
    const [admissionNoteSender, setAdmissionNoteSender] = useState('')
    const [sendersEmail, setSendersEmail] = useState('')
    const [sendersPhoneNumber, setSendersPhoneNumber] = useState('')
    const [hazardAssessment, setHazardAssessment] = useState(false)
    const [diaariNumber, setDiaariNumber] = useState('')
    const [datePrescribedForPsychiatricAssessment, setDatePrescribedForPsychiatricAssessment] = useState('')
    const [nativeLanguage, setNativeLanguage] = useState('')
    const [desiredLanguageOfBusiness, setDesiredLanguageOfBusiness] = useState('')
    const [municipalityOfResidence, setMunicipalityOfResidence] = useState('')
    const [prosecuted, setProsecuted] = useState(false)
    const [deadlineForProsecution, setDeadlineForProsecution] = useState('')
    const [preTrialPoliceDepartment, setPreTrialPoliceDepartment] = useState('')
    const [emailFromTheDirectorOfInvestigation, setEmailFromTheDirectorOfInvestigation] = useState('')
    const [phonenumberFromTheDirectorOfInvestigation, setPhonenumberFromTheDirectorOfInvestigation] = useState('')
    const [addressFromTheDirectorOfInvestigation, setAddressFromTheDirectorOfInvestigation] = useState('')
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
    const handleAdmissionNoteSendingOrganizationChange = (event) => {
        setAdmissionNoteSendingOrganization(event.target.value)
    }
    const handleAdmissionNoteSenderChange = (event) => {
        setAdmissionNoteSender(event.target.value)
    }
    const handleSendersEmailChange = (event) => {
        setSendersEmail(event.target.value)
    }
    const handleSendersPhoneNumberChange = (event) => {
        setSendersPhoneNumber(event.target.value)
    }
    const handleHazardAssessmentChange = (event) => {
        setHazardAssessment(event.target.hazardAssessment)
    }
    const handleDiaariNumberChange = (event) => {
        setDiaariNumber(event.target.value)
    }
    const handleDatePrescribedForPsychiatricAssessmentChange = (event) => {
        setDatePrescribedForPsychiatricAssessment(event.target.value)
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
        setProsecuted(event.target.prosecuted)
    }
    const handleDeadlineForProsecutionChange = (event) => {
        setDeadlineForProsecution(event.target.value)
    }
    const handlePreTrialPoliceDepartmentChange = (event) => {
        setPreTrialPoliceDepartment(event.target.value)
    }
    const handleEmailFromTheDirectorOfInvestigationChange = (event) => {
        setEmailFromTheDirectorOfInvestigation(event.target.value)
    }
    const handlePhonenumberFromTheDirectorOfInvestigationChange = (event) => {
        setPhonenumberFromTheDirectorOfInvestigation(event.target.value)
    }
    const handleAddressFromTheDirectorOfInvestigationChange = (event) => {
        setAddressFromTheDirectorOfInvestigation(event.target.value)
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


    const addPerson = (event) => {
        event.preventDefault()

        const createAddmission = {
            //  oldId: old_id,
            name: name,
            lastname: lastname,
            identificationNumber: identificationNumber,
            address: address,
            location: location,
            processAddress: processAddress,
            trustee: trustee,
            citizenship: citizenship,
            admissionNoteSendingOrganization: admissionNoteSendingOrganization,
            admissionNoteSender: admissionNoteSender,
            sendersEmail: sendersEmail,
            sendersPhoneNumber: sendersPhoneNumber,
            setHazardAssessment: hazardAssessment,
            diaariNumber: diaariNumber,
            datePrescribedForPsychiatricAssessment: datePrescribedForPsychiatricAssessment,
            nativeLanguage: nativeLanguage,
            desiredLanguageOfBusiness: desiredLanguageOfBusiness,
            municipalityOfResidence: municipalityOfResidence,
            prosecuted: prosecuted,
            deadlineForProsecution: deadlineForProsecution,
            preTrialPoliceDepartment: preTrialPoliceDepartment,
            emailFromTheDirectorOfInvestigation: emailFromTheDirectorOfInvestigation,
            phonenumberFromTheDirectorOfInvestigation: phonenumberFromTheDirectorOfInvestigation,
            addressFromTheDirectorOfInvestigation: addressFromTheDirectorOfInvestigation,
            crime: crime,
            crimes: crimes,
            assistantsEmail: assistantsEmail,
            assistantsPhonenumber: assistantsPhonenumber,
            setAssistantsAddress: assistantsAddress,
            legalGuardianEmail: legalGuardianEmail,
            legalGuardianPhonenumber: legalGuardianPhonenumber,
            legalGuardianAddress: legalGuardianAddress,
            legalGuardianInstitute: legalGuardianInstitute,
            appealedDecision: appealedDecision,
        }

        //console.log('Componentsilta serviceen lähtevän lomakkeen tiedot:')
        //console.log(createAddmission)

        addmissionService
            .create(createAddmission)
            .then(response => {
                console.log(response.data)
                //console.log('Post pyyntö ok')
            })


        setName('')
        setLastname('')
        setIdentificationNumber('')
        setAddress('')
        setLocation('')
        setProcessAddress('')
        setTrustee('')
        setCitizenship('')
        setAdmissionNoteSendingOrganization('')
        setAdmissionNoteSender('')
        setSendersEmail('')
        setSendersPhoneNumber('')
        setHazardAssessment(false)
        setDiaariNumber('')
        setDatePrescribedForPsychiatricAssessment('')
        setNativeLanguage('')
        setDesiredLanguageOfBusiness('')
        setMunicipalityOfResidence('')
        setProsecuted(false)
        setDeadlineForProsecution('')
        setPreTrialPoliceDepartment('')
        setEmailFromTheDirectorOfInvestigation('')
        setPhonenumberFromTheDirectorOfInvestigation('')
        setAddressFromTheDirectorOfInvestigation('')
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

    return (

        <div>
            {(sender &&
                <BasicInformation sender={sender} />)}

            <h2>Yleiset tutkittavan henkilön tiedot:</h2>
            <p></p>

            <form onSubmit={addPerson}>
                <div>
                    Etunimet:
                    <input id='name' value={name} onChange={handleNameChange} />
                </div>
                <div>
                    Sukunimi:
                    <input id='lastname' value={lastname} onChange={handleLastnameChange} />
                </div>
                <div>
                    Henkilötunnus:
                    <input id='identificationNumber' value={identificationNumber} onChange={handleIdentificationNumberChange} />
                </div>
                <div>
                    Kotiosoite:
                    <input id='address' value={address} onChange={handleAddressChange} />
                </div>
                <div>
                    Sijainti:
                    <input id='location' value={location} onChange={handleLocationChange} />
                </div>
                <div>
                    Prosessiosoite:
                    <input id='processAddress' value={processAddress} onChange={handleProcessAddressChange} />
                </div>
                <div>
                    Edunvalvoja:
                    <input id='trustee' value={trustee} onChange={handleTrusteeChange} />
                </div>
                <div>
                    Kansalaisuus:
                    <input id='citizenship' value={citizenship} onChange={handleCitizenshipChange} />
                </div>
                <div>
                    Tutkimuspyynnön lähettävä taho:
                    <input id='admissionNoteSendingOrganization' value={admissionNoteSendingOrganization} onChange={handleAdmissionNoteSendingOrganizationChange} />
                </div>
                <div>
                    Tutkimuspyynnön lähettävä henkilö:
                    <input id='setAdmissionNoteSender' value={admissionNoteSender} onChange={handleAdmissionNoteSenderChange} />
                </div>
                <div>
                    Tutkimuspyynnön lähettäjän sähköposti:
                    <input id='setSendersEmail' value={sendersEmail} onChange={handleSendersEmailChange} />
                </div>
                <div>
                    Tutkimuspyynnön lähettäjän puhelinnumero:
                    <input id='setSendersPhonenumber' value={sendersPhoneNumber} onChange={handleSendersPhoneNumberChange} />
                </div>

                <h2>Mielentilatutkimuslomake:</h2>
                <p></p>
                <div>
                    Halutaanko lisäksi vaarallisuusarvio:
                    <input id='setHazardAssessment' type="checkbox" value={hazardAssessment} onChange={handleHazardAssessmentChange} /> Kyllä
                </div>
                <div>
                    Diaalinumero:
                    <input id='diaariNumber' value={diaariNumber} onChange={handleDiaariNumberChange} />
                </div>
                <div>
                    Päivämäärä, jolla oikeus on määrännyt tutkittavan mielentilatutkimukseen:
                    <input id='datePrescribedForPsychiatricAssessment' value={datePrescribedForPsychiatricAssessment} onChange={handleDatePrescribedForPsychiatricAssessmentChange} />
                </div>
                <div>
                    Tutkittavan äidinkieli:
                    <input id='nativeLanguage' value={nativeLanguage} onChange={handleNativeLanguageChange} />
                </div>
                <div>
                    Tutkittavan toivoma asiointikieli:
                    <input id='desiredLanguageOfBusiness' value={desiredLanguageOfBusiness} onChange={handleDesiredLanguageOfBusinessChange} />
                </div>
                <div>
                    Tutkittavan kotikunta:
                    <input id='municipalityOfResidence' value={municipalityOfResidence} onChange={handleMunicipalityOfResidenceChange} />
                </div>
                <div>
                    Onko syyte nostettu:
                    <input id='prosecuted' type="checkbox" value={prosecuted} onChange={handleProsecutedChange} /> Kyllä
                </div>
                <div>
                    Jos syytettä ei ole nostettu, syytteen nostamisen määräaika:
                    <input id='deadlineForProsecution' value={deadlineForProsecution} onChange={handleDeadlineForProsecutionChange} />
                </div>
                <div>
                    Jos syytettä ei ole nostettu, esitutkinnan suorittava poliisilaitos:
                    <input id='preTrialPoliceDepartment' value={preTrialPoliceDepartment} onChange={handlePreTrialPoliceDepartmentChange} />
                </div>
                <div>
                    Jos syytettä ei ole nostettu, tutkinnan johtajan sähköposti:
                    <input id='emailFromTheDirectorOfInvestigation' value={emailFromTheDirectorOfInvestigation} onChange={handleEmailFromTheDirectorOfInvestigationChange} />
                </div>
                <div>
                    Jos syytettä ei ole nostettu, tutkinnan johtajan puhelinnumero:
                    <input id='phonenumberFromTheDirectorOfInvestigation' value={phonenumberFromTheDirectorOfInvestigation} onChange={handlePhonenumberFromTheDirectorOfInvestigationChange} />
                </div>
                <div>
                    Jos syytettä ei ole nostettu, tutkinnan johtajan osoite:
                    <input id='addressFromTheDirectorOfInvestigation' value={addressFromTheDirectorOfInvestigation} onChange={handleAddressFromTheDirectorOfInvestigationChange} />
                </div>
                <div>
                    Mielentilatutkimuksen määräämiseen johtanut vakavin teko (päätös tai välituomio):
                    <input id='crime' value={crime} onChange={handleCrimeChange} />
                </div>
                <div>
                    Muut kyseessä olevat teot, joista mielentilatutkimusta pyydetään:
                    <input id='crimes' value={crimes} onChange={handleCrimesChange} />
                </div>
                <div>
                    Tutkittavan avustajan sähköposti:
                    <input id='assistantsEmail' value={assistantsEmail} onChange={handleAssistantsEmailChange} />
                </div>
                <div>
                    Tutkittavan avustajan puhelinnumero:
                    <input id='assistantsPhonenumber' value={assistantsPhonenumber} onChange={handleAssistantsPhonenumberChange} />
                </div>
                <div>
                    Tutkittavan avustajan osoite:
                    <input id='assistantsAddress' value={assistantsAddress} onChange={handleAssistantsAddressChange} />
                </div>
                <div>
                    Alaikäisen tutkittavan huoltajan/sosiaalitoimen sähköposti:
                    <input id='legalGuardianEmail' value={legalGuardianEmail} onChange={handleLegalGuardianEmailChange} />
                </div>
                <div>
                    Alaikäisen tutkittavan huoltajan/sosiaalitoimen puhelinnumero:
                    <input id='legalGuardianPhonenumber' value={legalGuardianPhonenumber} onChange={handleLegalGuardianPhonenumberChange} />
                </div>
                <div>
                    Alaikäisen tutkittavan huoltajan/sosiaalitoimen osoite:
                    <input id='legalGuardianAddressnumber' value={legalGuardianAddress} onChange={handleLegalGuardianAddressChange} />
                </div>
                <div>
                    Alaikäisen tutkittavan huoltajan/sosiaalitoimen mahdollinen laitos:
                    <input id='legalGuardianInstitute' value={legalGuardianInstitute} onChange={handleLegalGuardianInstituteChange} />
                </div>
                <div>
                    Mikäli lähettäjä hovioikeus/korkein oikeus, mihin päätökseen haettu muutosta:
                    <input id='setAppealedDecision' value={appealedDecision} onChange={handleAppealedDecisionChange} />
                </div>


                <button id='createPersonButton' type="submit">lisää</button>
            </form>
        </div>
    )
}

export default Form
