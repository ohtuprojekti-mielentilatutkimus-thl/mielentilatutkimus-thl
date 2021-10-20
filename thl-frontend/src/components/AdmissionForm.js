import React, { useState } from 'react'
import formService from '../services/formService'
import { Grid, Dialog, DialogContent, DialogTitle, DialogActions, Button, Typography, Select, FormControl } from '@material-ui/core'
import { useStyles } from '../styles'
import dayjs from 'dayjs'
import MenuItem from '@material-ui/core/MenuItem'



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
                    </Select>
                </FormControl>
            </div>
            <Button variant="outlined" id='updateFormState' type='submit'>Päivitä</Button>
        </form>
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

                <DialogTitle disableTypography>
                    <h1>Lomake: {form.id}</h1>

                    <Grid
                        container
                        spacing={1}
                    >
                        <Grid item xs={4}>
                            <div className={classes.textLabel}>Päivämäärä:</div>
                            <div className={classes.textLabel}>{dayjs(form.createdAt).format('DD.MM.YYYY HH:mm:ss')}</div>
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

                </DialogTitle>
                <DialogContent>

                    <Grid>
                        <p> </p>
                        <Typography variant={'h4'}>Yleiset tutkittavan henkilön tiedot</Typography>
                        <br></br>

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

                        <br></br>
                        <br></br>

                        <Typography variant={'h4'}>Mielentilatutkimuslomake</Typography>

                        <br></br>

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