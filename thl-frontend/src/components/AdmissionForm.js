import React, { useState } from 'react'
import formService from '../services/formService'
import { Grid, Dialog, DialogContent, DialogTitle, DialogActions, Button, Typography } from '@material-ui/core'
import { useStyles } from '../styles'
import dayjs from 'dayjs'

const FormState = ( { form, updateForms } ) => {
    const [selectedOption, setSelectedOption] = useState('')

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value)
        console.log(selectedOption)
    }

    const changeFormState = (event) => {
        event.preventDefault()

        const updateFormState = { ...form, formState: selectedOption }
        formService.update(updateFormState.id, updateFormState)
            .then(response => {
                console.log(response)
                updateForms(response.data)
            })

    }
    return (
        <div>
            <p>Lomakkeen tila: {form.formState} </p>

            <form onSubmit={changeFormState}>
                <div className='states'>
                    <label>
                        <input type='radio' value='Pyyntö saapunut'
                            checked={selectedOption === 'Pyyntö saapunut'}
                            onChange={handleOptionChange} />
                           Pyyntö saapunut
                    </label>
                </div>
                <div className='states'>
                    <label>
                        <input type='radio' value='Pyyntö tarkastelussa'
                            checked={selectedOption === 'Pyyntö tarkastelussa'}
                            onChange={handleOptionChange} />
                          Pyyntö tarkastelussa
                    </label>
                </div>
                <div className='states'>
                    <label>
                        <input type='radio' value='Pyydetty lisätietoja'
                            checked={selectedOption === 'Pyydetty lisätietoja'}
                            onChange={handleOptionChange}  />
                           Pyydetty lisätietoja
                    </label>
                </div>
                <div className='states'>
                    <label>
                        <input type='radio' value='Saatu lisätietoja'
                            checked={selectedOption === 'Saatu lisätietoja'}
                            onChange={handleOptionChange}  />
                          Saatu lisätietoja
                    </label>
                </div>
                <div className='states'>
                    <label>
                        <input type='radio' value='Pyyntö hyväksytty'
                            checked={selectedOption === 'Pyyntö hyväksytty'}
                            onChange={handleOptionChange} />
                          Pyyntö hyväksytty
                    </label>
                </div>
                <button id='updateFormState' type='submit'>Päivitä lomakkeen tila</button>
            </form>
        </div>

    )
}

const AdmissionForm = ({ form, updateForms } ) => {

    //test()
    const [showInfo, setShowInfo] = useState(false)


    const handleShowMoreInfo = () => {
        setShowInfo(true)
    }

    const handleShowLessInfo = () => {
        setShowInfo(false)
    }

    const classes = useStyles()

    if (showInfo) {
        return (

            <Dialog open={showInfo} onClose={handleShowLessInfo} maxWidth="md"  PaperProps={{
                style: {
                    backgroundColor: 'white',
                    boxShadow: 'none',
                    elevation:'3',
                    square:'false',
                    align:'left'
                },
            }} fullWidth>

                <DialogTitle>
                    Lomake: {form.id}
                </DialogTitle>
                <DialogContent>
                    <FormState form={form} formState={form.formState} updateForms={updateForms} />

                    <Typography variant={'h4'}>Yleiset tutkittavan henkilön tiedot</Typography>

                    <Grid
                        container
                        spacing={1}
                    >
                        <Grid item xs={4}>
                            <div className={classes.textLabel}>Etunimet</div>
                            <div className={classes.text}>{form.name}</div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className={classes.textLabel}>Sukunimi</div>
                            <div className={classes.text}>{form.lastname}</div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className={classes.textLabel}>Henkilötunnus</div>
                            <div className={classes.text}>{form.identificationNumber}</div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className={classes.textLabel}>Kotiosoite</div>
                            <div className={classes.text}>{form.address}</div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className={classes.textLabel}>Sijainti</div>
                            <div className={classes.text}>{form.location}</div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className={classes.textLabel}>Prosessiosoite</div>
                            <div className={classes.text}>{form.processAddress}</div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className={classes.textLabel}>Edunvalvoja</div>
                            <div className={classes.text}>{form.trustee}</div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className={classes.textLabel}>Kansalaisuus</div>
                            <div className={classes.text}>{form.citizenship}</div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className={classes.textLabel}>Tutkimuspyynnön lähettävä taho</div>
                            <div className={classes.text}>{form.admissionNoteSendingOrganization}</div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className={classes.textLabel}>Tutkimuspyynnön lähettävä henkilö</div>
                            <div className={classes.text}>{form.admissionNoteSender}</div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className={classes.textLabel}>Tutkimuspyynnön lähettäjän sähköposti</div>
                            <div className={classes.text}>{form.sendersEmail}</div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className={classes.textLabel}>Tutkimuspyynnön lähettäjän puhelinnumero</div>
                            <div className={classes.text}>{form.sendersPhoneNumber}</div>
                        </Grid>
                    </Grid>

                    <Typography variant={'h4'}>Mielentilatutkimuslomake</Typography>

                    <Grid
                        container
                        spacing ={1}
                    >
                        <Grid item xs={4}>
                            <div className={classes.textLabel}>Halutaanko lisäksi vaarallisuusarvio:</div>
                            <div>
                                <label>
                                    <input type='radio' value='Vaarallisuusarvio'
                                        checked={form.hazardAssesment === true}
                                        readOnly
                                    />
                                </label>
                            </div>
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
                            <div>
                                <label>
                                    <input type='radio' value='SyyteNostettu'
                                        checked={form.prosecuted === true}
                                        readOnly
                                    />
                                </label>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className={classes.textLabel}>Jos syytettä ei ole nostettu, syytteen nostamisen määräaika:</div>
                            <div className={classes.text}>{dayjs(form.deadlineForProsecution).format('DD.MM.YYYY')}</div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className={classes.textLabel}>Jos syytettä ei ole nostettu, esitutkinnan suorittava poliisilaitos:</div>
                            <div className={classes.text}>{form.preTrialPoliceDepartment}</div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className={classes.textLabel}>Jos syytettä ei ole nostettu, tutkinnan johtajan sähköposti:</div>
                            <div className={classes.text}>{form.emailFromTheDirectorOfInvestigation}</div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className={classes.textLabel}>Jos syytettä ei ole nostettu, tutkinnan johtajan puhelinnumero:</div>
                            <div className={classes.text}>{form.phonenumberFromTheDirectorOfInvestigation}</div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className={classes.textLabel}>Jos syytettä ei ole nostettu, tutkinnan johtajan osoite:</div>
                            <div className={classes.text}>{form.addressFromTheDirectorOfInvestigation}</div>
                        </Grid>
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
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" id='handleShowLessInfo' variant="contained" onClick={handleShowLessInfo}>
               Sulje
                    </Button>
                </DialogActions>
            </Dialog>
        )


    } else {
        return (
            <div>
                <a href='#' id='handleShowMoreInfo' onClick={() => handleShowMoreInfo()}>
                    {form.id}
                </a>
            </div>
        )
    }
}

export default AdmissionForm