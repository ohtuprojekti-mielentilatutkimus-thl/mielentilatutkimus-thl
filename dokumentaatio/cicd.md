# Continuous Integration

<img src="https://github.com/ohtuprojekti-mielentilatutkimus-thl/mielentilatutkimus-thl/blob/main/dokumentaatio/kuvat/ci.png"/>

Pull requestin tekeminen mainiin käynnistää github workflow-tiedoston [cd.yml](https://github.com/ohtuprojekti-mielentilatutkimus-thl/mielentilatutkimus-thl/blob/main/.github/workflows/cd.yml) suorituksen. 

Koodin syntaksi tarkastetaan eslint-työkalulla, minkä säännöt on määritelty frontend-, thl-frontend ja backend-kansioiden juurissa sijaitsevilla .eslintrc.js-tiedostoilla. Lisäksi suoritetaan frontendien cypress-testit, backendin testit ja uusi testikattavuus uploadataan CodeCoviin. 

Lopuksi jos Pull Request mergetään, niin edellä mainitut toiminnot suorittuvat uudestaan mainissa.

# Continuous Development
<img src="https://github.com/ohtuprojekti-mielentilatutkimus-thl/mielentilatutkimus-thl/blob/main/dokumentaatio/kuvat/cd.png"/>
Pull requestin hyväksymisen jälkeen käynnistyy myös [staging.yml-tiedoston](https://github.com/ohtuprojekti-mielentilatutkimus-thl/mielentilatutkimus-thl/blob/main/.github/workflows/staging.yml) suoritus:

## Image dockerhubiin
Workflowssa määritelty github action luo juuren [Dockerfilellä](https://github.com/ohtuprojekti-mielentilatutkimus-thl/mielentilatutkimus-thl/blob/main/Dockerfile) mainin koodista uuden imagen, joka automaattisesti puskeutuu Dockerhubiin, repositorion asetuksissa määriteltyyn tiliin.

## Image tuotantopalvelimelle
Tuotantopalvelimella pyörii [watchtower](https://github.com/containrrr/watchtower), jonka avulla Docker-kontissa pyörivä sovellus päivittyy uuteen versioon.

## Palvelimen tilan tarkistus
Uuden imagen puskemisen jälkeen workflow-tiedosto pysähtyi viideksi minuutiksi, jonka aikana <sub>(toivottavasti, ei ole vielä epäonnistunut)</sub> uusi sovelluksen versio päätyi staging-palvelimelle. Tauon jälkeen workflow:n seuraava action tekee http-pyynnön palvelimen osoitteisiin, joissa frontend eli /mielentilatutkimus ja thl-frontend eli /thl pyörivät.
