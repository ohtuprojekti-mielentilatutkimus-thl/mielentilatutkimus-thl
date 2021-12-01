import React, { useState } from 'react'
import attachmentService from '../services/attachmentService'
import { Grid, Dialog, DialogContent, DialogTitle, DialogActions, Button, Typography, Box, Tab } from '@material-ui/core'
import { TabPanel, TabContext, TabList } from '@material-ui/lab'
import { useStyles } from '../styles'
import dayjs from 'dayjs'
import PdfViewer from './PdfViewer'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf'
import SendToResearchUnit from './SendToResearchUnit'
import AddAttachment from './AddAttachment'
import AdditionalInfo from './AdditionalInfo'
import FormState from './FormState'
import { DisplayHazard, NotProsecuted, DisplayProsecuted } from './ExtraComponents'
import EventHistory from './EventHistory'
import ReseachUnitStatement from './ReseachUnitStatement'
import loginUserService from '../services/loginUserService'


const AdmissionForm = ({ form, updateForm, fetchForm, handleShowLessInfo, showInfo } ) => {

    const [attachment, setAttachment] = useState('')
    const [showAttachment, setShowAttachment] = useState(false)
    const [showSendResearchUnit, setShowSendToResearchUnit] = useState(false)
    const [showAddAttachment, setShowAddAttachment] = useState(false)
    const [tabValue, setTabValue] = useState('1')

    const handleAttachment = ( id ) => {
        attachmentService.getOne(id).then(res => {
            var blob = new Blob([res], {
                type: 'application/pdf;chartset=UTF-8'
            })
            setAttachment(blob)
            setShowAttachment(true)
        })
    }

    const thlRoleUser = () => {

        const user = loginUserService.getUser()

        if(user.role === 'THL'){
            return true
        }
    }

    const reseachUnitRoleUser = () => {

        const user = loginUserService.getUser()
        const reseachUnits = ['Niuvanniemen sairaala', 'Vanhan Vaasan sairaala', 'Psykiatrinen vankisairaala, Turun yksikkö',
            'Psykiatrinen vankisairaala, Vantaan yksikkö', 'HUS Kellokosken sairaala', 'OYS/Psykiatrian tulosalue, Oikeuspsykiatria',
            'Tays Pitkäniemen sairaala, Tehostetun psykoosihoidon vastuuyksikkö (PTHP), Talo 14', 'Tampereen yliopistollinen sairaala, EVA-yksikkö']

        if (reseachUnits.includes(user.role)) {
            return true
        }
    }

    const classes = useStyles()

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue)
    }

    const getTabsByRole = () => {

        if(thlRoleUser()) {
            return(
                <Tab label="Tapahtumahistoria" value="2" />
            )
        }
        if (reseachUnitRoleUser()) {
            return (<Tab label="Lausunto" value="3" />
            )
        }
    }

    const thlUser = thlRoleUser()

    return (
        <div>
            <Dialog open={showAddAttachment} onClose={() => setShowAddAttachment(false)}  classes={{ paper: classes.dialogPopUp }}
                fullWidth>
                <AddAttachment form={form} fetchForm={fetchForm} handleClose={() => setShowAddAttachment(false)}/>
            </Dialog>


            <Dialog open={showSendResearchUnit} onClose={() => setShowSendToResearchUnit(false)}  classes={{ paper: classes.dialogPopUp }}
                fullWidth>
                <SendToResearchUnit form={form} handleClose={() => setShowSendToResearchUnit(false)} updateForms={updateForm}/>
            </Dialog>

            <Dialog open={showAttachment} onClose={() => setShowAttachment(false)}>
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
                { !form &&
                        <div>lataa...</div>
                }
                <TabContext value = {tabValue}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleTabChange} TabIndicatorProps={{ style: { backgroundColor: 'blue' } }}>
                            <Tab label="Tiedot" value="1" />
                            {getTabsByRole()}
                        </TabList>
                    </Box>

                    <TabPanel value="1">
                        <DialogTitle disableTypography>
                            <h1>{form.thlRequestId}</h1>

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

                                {thlUser ? (
                                    <Grid item xs={4}>
                                        <div className={classes.textLabel}>Päivitä lomakkeen tilaa:</div>
                                        <FormState form={form} formState={form.formState} updateForms={updateForm} />
                                    </Grid>
                                ) : ('')}

                            </Grid>

                            {thlUser ? (
                                <Grid>
                                    <AdditionalInfo form={form} updateForms={updateForm}/>
                                </Grid>
                            ) : ('')}


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
                                            <div className={classes.text}>{form.admissionNoteSenderOrganization}</div>
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
                                                            { attachment.fileName && attachment.fileName.includes('pdf') &&
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
                            <Button color='primary' id='handleAddAttachment' variant='contained' onClick={() => setShowAddAttachment(true)}>
                        Lisää liitteitä
                            </Button>

                            <div>
                                {thlUser ? (
                                    <Button color="primary" id='handleSendToOperatingUnit' variant="contained" onClick={() => setShowSendToResearchUnit(true)}>
                        Lähetä tutkimuspaikkapyyntö
                                    </Button>
                                ) : ('')}
                            </div>

                            <Button color="primary" id='handleShowLessInfo' variant="contained" onClick={handleShowLessInfo}>
                        Sulje
                            </Button>
                        </DialogActions>
                    </TabPanel>
                    <TabPanel value="2">

                        <EventHistory form={form}/>
                        <DialogActions>
                            <Button color="primary" id='handleShowLessInfo' variant="contained" onClick={handleShowLessInfo}>
                        Sulje
                            </Button>
                        </DialogActions>

                    </TabPanel>

                    <TabPanel value="3">

                        <ReseachUnitStatement form={form} formState={form.formState} updateForms={updateForm} />
                        <DialogActions>
                            <Button color="primary" id='handleShowLessInfo' variant="contained" onClick={handleShowLessInfo}>
Sulje
                            </Button>
                        </DialogActions>

                    </TabPanel>
                </TabContext>
            </Dialog>
        </div>
    )


}

export default AdmissionForm