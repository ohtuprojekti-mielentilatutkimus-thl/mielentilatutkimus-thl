import React, { useState } from 'react'
import formService from '../services/formService'


const FormState = (form) => {

    const [selectedOption, setSelectedOption] = useState('')
    const [newOption, setNewOption] = useState(form.formState)

    console.log('state: ', form.formState)

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value)
        console.log(selectedOption)
    }

    const changeFormState = (event) => {
        event.preventDefault()

        const updateFormState = { ...form, formState: selectedOption }

        formService.update(updateFormState.form.id, updateFormState)
            .then(response => {
                setNewOption(selectedOption)
                console.log(response.data)
            })
    }

    return (
        <div>
            <p>Lomakkeen tila: {newOption} </p>

            <form onSubmit={changeFormState}>
                <div className='states'>
                    <label>
                        <input type='radio' value='Hyväksytty/Tarkastettu'
                            checked={selectedOption === 'Hyväksytty/Tarkastettu'}
                            onChange={handleOptionChange} />
          Hyväksytty/Tarkastettu
                    </label>
                </div>
                <div className='states'>
                    <label>
                        <input type='radio' value='Kysytään tutkimuspaikkaa'
                            checked={selectedOption === 'Kysytään tutkimuspaikkaa'}
                            onChange={handleOptionChange} />
          Kysytään tutkimuspaikkaa
                    </label>
                </div>
                <div className='states'>
                    <label>
                        <input type='radio' value='Tutkimuspaikka hyväksytty'
                            checked={selectedOption === 'Tutkimuspaikka hyväksytty'}
                            onChange={handleOptionChange}  />
          Tutkimuspaikka hyväksytty
                    </label>
                </div>
                <div className='states'>
                    <label>
                        <input type='radio' value='Lausunto saapunut'
                            checked={selectedOption === 'Lausunto saapunut'}
                            onChange={handleOptionChange}  />
          Lausunto saapunut
                    </label>
                </div>
                <div className='states'>
                    <label>
                        <input type='radio' value='Jatkoaika hyväksytty'
                            checked={selectedOption === 'Jatkoaika hyväksytty'}
                            onChange={handleOptionChange} />
          Jatkoaika hyväksytty
                    </label>
                </div>
                <button id='updateFormState' type='submit'>Päivitä lomakkeen tila</button>
            </form>
        </div>
    )
}

const AdmissionForm = ({ form }) => {

    const [showInfo, setShowInfo] = useState(false)
    //const [formState, setFormState] = useState('')

    const handleShowMoreInfo = () => {
        setShowInfo(true)
    }

    const handleShowLessInfo = () => {
        setShowInfo(false)
    }
    /*
    const handleSetFormState = (event) => {
        setFormState(event.target.value)
    }*/



    if (showInfo) {
        return (
            <div>
                <h1>Lomake: {form.id}</h1>
                <p></p>
                <FormState form={form} formState={form.formState}/>
                <h2>Yleiset tutkittavan henkilön tiedot:</h2>
                <br />
                <div>
                    Etunimet:
                    {form.name}
                </div>
                <div>
                    Sukunimi:
                    {form.lastname}
                </div>
                <div>
                    Henkilötunnus:
                    {form.identificationNumber}
                </div>
                <div>
                    Kotiosoite:
                    {form.address}
                </div>
                <div>
                    Sijainti:
                    {form.location}
                </div>
                <div>
                    Prosessiosoite:
                    {form.processAddress}
                </div>
                <div>
                    Edunvalvoja:
                    {form.trustee}
                </div>
                <div>
                    Kansalaisuus:
                    {form.citizenship}
                </div>
                <div>
                    Tutkimuspyynnön lähettävä taho:
                    {form.admissionNoteSendingOrganization}
                </div>
                <div>
                    Tutkimuspyynnön lähettävä henkilö:
                    {form.admissionNoteSender}
                </div>
                <div>
                    Tutkimuspyynnön lähettäjän sähköposti:
                    {form.sendersEmail}
                </div>
                <div>
                    Tutkimuspyynnön lähettäjän puhelinnumero:
                    {form.sendersPhonenumber}
                </div>
                <br />
                <h2>Mielentilatutkimuslomake:</h2>
                <br />
                <div>
                    Halutaanko lisäksi vaarallisuusarvio:
                    {form.hazardAssessment}
                </div>
                <div>
                    Diaarinumero:
                    {form.diaariNumber}
                </div>
                <div>
                    Päivämäärä, jolla oikeus on määrännyt tutkittavan mielentilatutkimukseen:
                    {form.datePrescribedForPsychiatricAssessment}
                </div>
                <div>
                    Tutkittavan äidinkieli:
                    {form.nativeLanguage}
                </div>
                <div>
                    Tutkittavan toivoma asiointikieli:
                    {form.desiredLanguageOfBusiness}
                </div>
                <div>
                    Tutkittavan kotikunta:
                    {form.municipalityOfResidence}
                </div>
                <div>
                    Onko syyte nostettu:
                    {form.prosecuted}
                </div>
                <div>
                    Jos syytettä ei ole nostettu, syytteen nostamisen määräaika:
                    {form.deadlineForProsecution}
                </div>
                <div>
                    Jos syytettä ei ole nostettu, esitutkinnan suorittava poliisilaitos:
                    {form.preTrialPoliceDepartment}
                </div>
                <div>
                    Jos syytettä ei ole nostettu, tutkinnan johtajan sähköposti:
                    {form.emailFromTheDirectorOfInvestigation}
                </div>
                <div>
                    Jos syytettä ei ole nostettu, tutkinnan johtajan puhelinnumero:
                    {form.phonenumberFromTheDirectorOfInvestigation}
                </div>
                <div>
                    Jos syytettä ei ole nostettu, tutkinnan johtajan osoite:
                    {form.addressFromTheDirectorOfInvestigation}
                </div>
                <div>
                    Mielentilatutkimuksen määräämiseen johtanut vakavin teko (päätös tai välituomio):
                    {form.crime}
                </div>
                <div>
                    Muut kyseessä olevat teot, joista mielentilatutkimusta pyydetään:
                    {form.crimes}
                </div>
                <div>
                    Tutkittavan avustajan sähköposti:
                    {form.assistantsEmail}
                </div>
                <div>
                    Tutkittavan avustajan puhelinnumero:
                    {form.assistantsPhonenumber}
                </div>
                <div>
                    Tutkittavan avustajan osoite:
                    {form.assistantsAddress}
                </div>
                <div>
                    Alaikäisen tutkittavan huoltajan/sosiaalitoimen sähköposti:
                    {form.legalGuardianEmail}
                </div>
                <div>
                    Alaikäisen tutkittavan huoltajan/sosiaalitoimen puhelinnumero:
                    {form.legalGuardianPhonenumber}
                </div>
                <div>
                    Alaikäisen tutkittavan huoltajan/sosiaalitoimen osoite:
                    {form.legalGuardianAddress}
                </div>
                <div>
                    Alaikäisen tutkittavan huoltajan/sosiaalitoimen mahdollinen laitos:
                    {form.legalGuardianInstitute}
                </div>
                <div>
                    Mikäli lähettäjä hovioikeus/korkein oikeus, mihin päätökseen haettu muutosta:
                    {form.appealedDecision}
                </div>
                <a href='#' id='handleShowLessInfo' onClick={() => handleShowLessInfo()}>
                    Sulje lomake
                </a>

            </div>
        )} else {
        return (
            <div>
                Id:
                {form.id}
                <a href='#' id='handleShowMoreInfo' onClick={() => handleShowMoreInfo()}>
                    Avaa lomake
                </a>
                <div>
                </div>
                <FormState form={form} formState={form.formState}/>
                <p>
                </p>
            </div>
        )
    }
}

export default AdmissionForm
