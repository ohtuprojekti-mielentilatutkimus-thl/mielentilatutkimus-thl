import React, { useState } from 'react'
import formService from '../services/formService'
import { Paper, Grid, TableRow, TableCell } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

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


    const handleShowMoreInfo = () => {
        setShowInfo(true)
    }

    const handleShowLessInfo = () => {
        setShowInfo(false)
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
        text: {
            fontSize: '18px',
            justifyContent: 'center',
            align: 'center'
        },
        tablecell: {
            fontSize: 14
        },
        tablerow: {
            '&:last-child td, &:last-child th': {
                border: 0,
            },
        }
    })

    const classes = useStyles()

    if (showInfo) {
        return (
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
                    <h1>Lomake: {form.id}</h1>
                    <FormState form={form} formState={form.formState} />
                    <h2>Yleiset tutkittavan henkilön tiedot:</h2>
                    <br />
                    <Grid
                        container rowSpacing={2}
                        columnSpacing={{ xs: 2 }}
                    >
                        <Grid item xs={6}>
                            <div className={classes.text}>Etunimet:</div>
                            <div className={classes.text}>{form.name}</div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.text}>Sukunimi:</div>
                            <div className={classes.text}>{form.lastname}</div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.text}>Henkilötunnus:</div>
                            <div className={classes.text}>{form.identificationNumber}</div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.text}>Kotiosoite:</div>
                            <div className={classes.text}>{form.address}</div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.text}>Sijainti:</div>
                            <div className={classes.text}>{form.location}</div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.text}>Prosessiosoite:</div>
                            <div className={classes.text}>{form.processAddress}</div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.text}>Edunvalvoja:</div>
                            <div className={classes.text}>{form.trustee}</div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.text}>Kansalaisuus:</div>
                            <div className={classes.text}>{form.citizenship}</div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.text}>Tutkimuspyynnön lähettävä taho:</div>
                            <div className={classes.text}>{form.admissionNoteSendingOrganization}</div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.text}>Tutkimuspyynnön lähettävä henkilö:</div>
                            <div className={classes.text}>{form.admissionNoteSender}</div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.text}>Tutkimuspyynnön lähettäjän sähköposti:</div>
                            <div className={classes.text}>{form.sendersEmail}</div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.text}>Tutkimuspyynnön lähettäjän puhelinnumero:</div>
                            <div className={classes.text}>{form.sendersPhonenumber}</div>
                        </Grid>
                    </Grid>
                    <br />
                    <h2>Mielentilatutkimuslomake:</h2>
                    <br />
                    <Grid
                        container rowSpacing={2}
                        columnSpacing={{ xs: 2 }}
                    >
                        <Grid item xs={6}>
                            <div className={classes.text}>Halutaanko lisäksi vaarallisuusarvio:</div>
                            <div className={classes.text}>{form.hazardAssessment}</div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.text}>Diaarinumero:</div>
                            <div className={classes.text}>{form.diaariNumber}</div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.text}>Päivämäärä, jolla oikeus on määrännyt tutkittavan mielentilatutkimukseen:</div>
                            <div className={classes.text}>{form.datePrescribedForPsychiatricAssessment}</div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.text}>Tutkittavan äidinkieli:</div>
                            <div className={classes.text}>{form.nativeLanguage}</div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.text}>Tutkittavan toivoma asiointikieli:</div>
                            <div className={classes.text}>{form.desiredLanguageOfBusiness}</div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.text}>Tutkittavan kotikunta:</div>
                            <div className={classes.text}>{form.municipalityOfResidence}</div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.text}>Onko syyte nostettu:</div>
                            <div className={classes.text}>{form.prosecuted}</div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.text}>Jos syytettä ei ole nostettu, syytteen nostamisen määräaika:</div>
                            <div className={classes.text}>{form.deadlineForProsecution}</div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.text}>Jos syytettä ei ole nostettu, esitutkinnan suorittava poliisilaitos:</div>
                            <div className={classes.text}>{form.preTrialPoliceDepartment}</div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.text}>Jos syytettä ei ole nostettu, tutkinnan johtajan sähköposti:</div>
                            <div className={classes.text}>{form.emailFromTheDirectorOfInvestigation}</div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.text}>Jos syytettä ei ole nostettu, tutkinnan johtajan puhelinnumero:</div>
                            <div className={classes.text}>{form.phonenumberFromTheDirectorOfInvestigation}</div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.text}>Jos syytettä ei ole nostettu, tutkinnan johtajan osoite:</div>
                            <div className={classes.text}>{form.addressFromTheDirectorOfInvestigation}</div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.text}>Mielentilatutkimuksen määräämiseen johtanut vakavin teko (päätös tai välituomio):</div>
                            <div className={classes.text}>{form.crime}</div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.text}>Muut kyseessä olevat teot, joista mielentilatutkimusta pyydetään:</div>
                            <div className={classes.text}>{form.crimes}</div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.text}>Tutkittavan avustajan sähköposti:</div>
                            <div className={classes.text}>{form.assistantsEmail}</div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.text}>Tutkittavan avustajan puhelinnumero:</div>
                            <div className={classes.text}>{form.assistantsPhonenumber}</div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.text}>Tutkittavan avustajan osoite:</div>
                            <div className={classes.text}>{form.assistantsAddress}</div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.text}>Alaikäisen tutkittavan huoltajan/sosiaalitoimen sähköposti:</div>
                            <div className={classes.text}>{form.legalGuardianEmail}</div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.text}>Alaikäisen tutkittavan huoltajan/sosiaalitoimen puhelinnumero:</div>
                            <div className={classes.text}>{form.legalGuardianPhonenumber}</div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.text}>Alaikäisen tutkittavan huoltajan/sosiaalitoimen osoite:</div>
                            <div className={classes.text}>{form.legalGuardianAddress}</div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.text}>Alaikäisen tutkittavan huoltajan/sosiaalitoimen mahdollinen laitos:</div>
                            <div className={classes.text}>{form.legalGuardianInstitute}</div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.text}>Mikäli lähettäjä hovioikeus/korkein oikeus, mihin päätökseen haettu muutosta:</div>
                            <div className={classes.text}>{form.appealedDecision}</div>
                        </Grid>
                    </Grid>
                    <a href='#' onClick={() => handleShowLessInfo()}>
                        Sulje lomake
                    </a>
                </Paper>
            </div>
        )} else {
        return (
            <TableRow key={form.id} className={classes.tablerow}>
                <TableCell component='th' scope='row' className={classes.tablecell}>
                    {form.id}
                </TableCell>
                <TableCell align='right' className={classes.tablecell}>
                    <a href='#' id='handleShowMoreInfo' onClick={() => handleShowMoreInfo()}>
                        Avaa lomake
                    </a>
                </TableCell>
            </TableRow>
        )
    }
}

export default AdmissionForm