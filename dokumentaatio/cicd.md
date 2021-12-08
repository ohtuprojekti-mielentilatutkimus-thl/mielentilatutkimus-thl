# Continuous Integration

Kuva / alkuselitys

## Pull Request

Pull requestin tekeminen mainiin käynnistää github workflow-tiedoston [cd.yml-suorituksen](https://github.com/ohtuprojekti-mielentilatutkimus-thl/mielentilatutkimus-thl/blob/main/.github/workflows/cd.yml) ajamisen, jossa tapahtuu:

### linttaus
Mergettävän koodin syntaksi tarkistetaan eslint-työkalulla. Noudatettavat säännöt on määritelty frontend-, thl-frontend- ja backend-kansioiden juurissa sijaitsevilla .eslintrc.js-tiedostoilla.

### Cypress-testit
Ajetaan cypress-testit. Lisätietoa täällä (tähän linkki testaus-dokumenttiin?)

### Backendin yksikkötestit
Linkki testaus-dokumenttiin(?). Coverage codecoviin

## Pull Request hyväksytään
cd.yml-tiedoston workflow suoritetaan uudestaan.

# Continuous Development
Pull requestin hyväksymisen jälkeen käynnistyy myös [staging.yml-tiedoston](https://github.com/ohtuprojekti-mielentilatutkimus-thl/mielentilatutkimus-thl/blob/main/.github/workflows/staging.yml), josta käynnistyy seuraava tapahtumaketju:

## Image dockerhubiin
Workflowssa määritelty github action luo juuren [Dockerfilellä](https://github.com/ohtuprojekti-mielentilatutkimus-thl/mielentilatutkimus-thl/blob/main/Dockerfile) mainin koodista uuden imagen, joka automaattisesti puskeutuu Dockerhubiin, repositorion asetuksissa määriteltyyn tiliin.

## Image tuotantopalvelimelle
Tuotantopalvelimella pyörii [watchtower](https://github.com/containrrr/watchtower), jonka avulla Docker-kontissa pyörivä sovellus päivittyy uuteen versioon.

## Palvelimen tilan tarkistus
Uuden imagen puskemisen jälkeen workflow-tiedosto pysähtyi viideksi minuutiksi, jonka aikana <sub>(toivottavasti, ei ole vielä epäonnistunut)</sub> uusi sovelluksen versio päätyi staging-palvelimelle. Tauon jälkeen workflow:n seuraava action tekee http-pyynnön palvelimen osoitteisiin, joissa frontend eli /mielentilatutkimus ja thl-frontend eli /thl pyörivät.