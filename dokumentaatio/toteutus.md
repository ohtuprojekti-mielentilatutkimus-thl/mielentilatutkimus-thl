## Mielentilatutkimusprosessia ohjaava, tukeva ja mittaava järjestelmä

Sovellus on toteutettu Reactilla ja Node.js:llä. Tietokantana toimii MongoBD. Sovellus koostuu kolmesta eri osaprojektista. Kaksi projektia ovat Reactilla toteutut frontendit eri käyttäjäryhmille.  Node.js:llä toteutettu Backend on oma projektinsa.

### Ulkoiset riippuvuudet

#### Frontendin riippuvuudet

| Kirjasto | Käyttötarkoitus |
|---|---|
|axios | Mahdollistaa HTTP pyyntöjen tekemisen |
| dayjs | MongoDB:n aikaleimojen formatointi |
| emotion | CSS-tyylien kirjoittaminen javascriptin kanssa |
| mui | Projektin tyylikirjasto |
| react | Käyttöliittymän luominen |
| testing-library | Testien kirjoittamisen apuväline |
| validator | Kirjautumistietojen validointi |
| web-vitals | Käyttäjämetriikka |
| cypress | Työkalu E2E-testaukseen |
| eslint | Koodin tyylistandardit |
| maildev | Kehityksen aikainen työkalu jolla voi testata sähköpostin vastaanottoa |

#### Backendin riippuvuudet

| Kirjasto | Käyttötarkoitus |
|---|---|
| cors | Mahdollistaa HTTP pyyntöjen tekemisen clientilta palvelimelle |
| cross-env | Ei tarvitse määritellä ympäristömuuttujia |
| dotenv | .env tiedoston käyttö |
| email-validator | Sähköpostin muodon validoinnin työkalu |
| express | Palvelinlogiikka |
| form-data | Avain-arvo parien rakentaminen  |
| lodash | Työkalu JavaScriptin tietorakenteiden käsittelyn helpottamiseksi |
| mongoose | MondoDB:n käytön helpottaminen |
| morgan | HTTP requestien loggaus |
| multer | Tiedostojen latausten käsittely |
| nodemailer | Sähköpostin lähettämisen yksinkertaistaminen palvelimelta |
| eslint | Koodin tyylistandardit |
| jest | Työkalu backendin yksikkötesteihin |
| maildev | Kehityksen aikainen työkalu jolla voi testata sähköpostin vastaanottoa |
| supertest | Työkalu backendin yksikkötestien HTTP-pyyntöihin |
| express-async-errors | async-funktioiden await -kohdissa syntyvät poikkeudet siirtyvät automattisesti middlewareen, jossa virheilmoitukset voidaan käsitellä. (Tällä hetkellä käytössä vain validointiin liittyvissä asioissa) |



### Rest rajapinta

Frontendit kommunikoivat backendin kanssa REST-apin kautta. Backend on yhteydessä MongoDB:hen Mongoose ODM:n välityksellä.

#### REST-apin komennot

| URI | Tyyppi | Kuvaus |
|---|---|---|
| api/ | GET | Palauttaa kaikki mielentilatutkimuspyyntölomakkeet |
| api/login | POST | Kirjaa käyttäjän sisään |
| api/basic_information_form | POST | Lisää tutkimuspyynnön lähettäjän perustiedot |
| api/basic_information/:id | GET | Palauttaa id:tä vastaavan tutkimuspyynnön lähettäjän perustiedot |
| api/admission_form | POST | Lisää uuden mielentilatutkimuspyynnön |
| api/admission_form/:id | GET | Palauttaa id:tä vastaavan mielentilatutkimuspyyntölomakkeen |
| api/admission_form/request_additional_info | POST | Lähettää lisätietoja pyytävän sähköpostiviestin mielentilatutkimuspyynnön luojalle |
| api/admission_form/:id/edit | GET | Palauttaa id:tä vastaavan mielentilatutkimuspyyntölomakkeen muokkausta varten |
| api/admission_form/:id/edit | PUT | Päivittää id:tä vastaavan mielentilatutkimuspyyntölomakkeen muuttuneet kentät |
| api/admission_form_attachment/:attachmentId | GET | Palauttaa attachmentId:tä vastaavan liitteen |
| api/admission_form_attachment/:id | POST | Lisää id:tä vastaavaan mielentilatutkimuspyyntöön liitteen |
| api/thl/research_unit/:researchUnit | GET | Palauttaa kaikki mielentilatutkimuspyyntölomakkeet, jotka kuuluvat researchUnit:ille, eli tutkimusyksikölle |
| api/thl/:id | PUT | Muuttaa mielentilatutkimuspyyntölomakkeen tilaa |
| api/thl/:id/add_statement  | PUT | Lisää lausunnon mielentilatutkimuksesta mielentilatutkimuspyyntölomakkeelle |
| api/thl/:id/add_statement_draft | PUT | Lisää luonnoksen lausunnon mielentilatutkimuksesta mielentilatutkimuspyyntölomakkeelle |
| api/thl/:id/research_unit | PUT | Osoittaa mielentilatutkimuspyyntölomakkeelle tutkimusyksikön ja päivittää lomakkeen tilaa |
| api/upload_form | POST | Lähettää linkin sisältävän sähköpostin poliisille liitteiden erillistä lisäystä varten |
| api/thl/log/| GET | Palauttaa auditlogin |
| api/thl/log/form_event/:id| GET | Palauttaa audit log tapahtumat, jotka liitetty id:tä vastaavaan mielentilatutkimuspyyntöön |
| api/tests/reset | POST | Poistaa tietokannasta mielentilatutkimuspyynnöt, sekä lähettäjien perustiedot (kun NODE_ENV==='test') |

#### Tietokanta

Sovelluksen tietokantana toimii MongoDB, jonka käytön helpottamiseksi käytetään Mongoosea.

| Skeema | Kuvaus | Referenssi |
|---|---|---|
| admissionSchema | Mielentilatutkimuspyynnön tallennus | attachmentForm |
| attachmentSchema | Liitetiedostojen tallennus | admissionForm |
| basicInformationSchema | Tutkimuspyynnön lähettäjän tietojen tallennus | |
| LogSchema | Auditlokin tallennus | |

Skeemat löytyvät [täältä](https://github.com/ohtuprojekti-mielentilatutkimus-thl/mielentilatutkimus-thl/tree/main/backend/models).

### Testaus

- *Jest* - Backendin yksikkötestit
- *Supertest* - Backendin yksikkötesteihin HTTP-pyyntöjä varten
- *Cypress* - E2E testaus

### Audit log / Tapahtumaloki

Audit lokin toiminta on toteutettu mongoosen plugineiden avulla. Toistaiseksi pluginit on eritelty kahteen osaan: sekä [mielentilatutkimuspyyntölomakkeille](https://github.com/ohtuprojekti-mielentilatutkimus-thl/mielentilatutkimus-thl/tree/main/backend/utils/admissionLog-plugin.js) että [niiden liitteille](https://github.com/ohtuprojekti-mielentilatutkimus-thl/mielentilatutkimus-thl/tree/main/backend/utils/attachmentLog-plugin.js). Syy jakoon on siinä, että eri skeemojen kohdalla saatetaan haluta tallentaa erilaisia tietoja. Jatkokehitystä ajatellen luontevaa olisi saada jokaiselle eri skeemalle lokia ylläpitävä plugini. 

### Arkkitehtuuri

<img src="https://github.com/ohtuprojekti-mielentilatutkimus-thl/mielentilatutkimus-thl/blob/main/dokumentaatio/kuvat/arcitech.drawio.png"/>

### Jatkokehitystä varten

- Toiminnallisuus, jolla THL-käyttäjä voi ehdottaa tutkimuksen ajankohtaa tutkimusyksikölle ja vahvistaa sen.
- Toiminnallisuus, jolla tutkimusyksikkökäyttäjä voi hyväksyä, hylätä tai ehdottaa uutta aikaa tutkimuksen ajankohdalle.
- Kun tutkimuksen ajankohta on vahvistettu, se tulisi lomakkeelle näkyviin, ja lomakkeita voisi listata tutkimuksen ajankohdan perusteella.
- Tutkimusyksikön tekemän lausunnon esittäminen THL-käyttäjän käyttöliittymässä.
- THL-käyttäjä (oikeuspsykiatrinen lautakunta) voi tehdä oman mielentilalausunnon tutkimusyksikkölausunnon perusteella.
- THL-käyttäjä voi lähettää mielentilalausunnon oikeuslaitokselle.
