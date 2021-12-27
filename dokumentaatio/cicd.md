# Continuous Integration

<img src="https://github.com/ohtuprojekti-mielentilatutkimus-thl/mielentilatutkimus-thl/blob/main/dokumentaatio/kuvat/ci.png"/>

Pull requestin tekeminen mainiin käynnistää github workflow-tiedoston [cd.yml](https://github.com/ohtuprojekti-mielentilatutkimus-thl/mielentilatutkimus-thl/blob/main/.github/workflows/cd.yml) suorituksen. 

Koodin syntaksi tarkastetaan eslint-työkalulla, minkä säännöt on määritelty frontend-, thl-frontend ja backend-kansioiden juurissa sijaitsevilla .eslintrc.js-tiedostoilla. Lisäksi suoritetaan frontendien cypress-testit, backendin testit ja uusi testikattavuus lähettyy CodeCoviin. 

Lopuksi jos Pull Request mergetään, niin edellä mainitut toiminnot suorittuvat uudestaan mainissa.

# Continuous Deployment
<img src="https://github.com/ohtuprojekti-mielentilatutkimus-thl/mielentilatutkimus-thl/blob/main/dokumentaatio/kuvat/cd.png" />

Pull requestin hyväksymisen jälkeen käynnistyy myös [staging.yml-tiedoston](https://github.com/ohtuprojekti-mielentilatutkimus-thl/mielentilatutkimus-thl/blob/main/.github/workflows/staging.yml) suoritus.

Workflowssa määritelty github action luo juuren [Dockerfilellä](https://github.com/ohtuprojekti-mielentilatutkimus-thl/mielentilatutkimus-thl/blob/main/Dockerfile) mainin koodista uuden imagen, joka automaattisesti puskeutuu [Dockerhubiin](https://hub.docker.com/), repositorion asetuksissa määriteltyyn tiliin. Dockerhubista image päätyy tuotantopalvelimelle, kun siellä pyörivä [watchtower](https://github.com/containrrr/watchtower) havaitsee version päivittyneen parin minuutin sisällä.

Dockerhubiin puskemisen jälkeen workflow on pysähtynyt hetkeksi, jotta uusi image ehtii päätyä tuotantopalvelimelle. Lopuksi palvelimen tila tarkistetaan http-pyynnöillä frontendien osoitteisiin.
