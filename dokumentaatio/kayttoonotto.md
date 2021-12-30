# Käyttöönotto
Käyttöönotto-ohje kuvaa miten projektiryhmän pipelinen saa toimimaan. Kuvaukset siitä mitä kussakin vaiheessa tapahtuu löytyy [Ci- / Cd-dokumentaatiosta.](https://github.com/ohtuprojekti-mielentilatutkimus-thl/mielentilatutkimus-thl/blob/main/dokumentaatio/cicd.md)

Tarvitset:
 - [Dockerhub-käyttäjätunnukset](https://hub.docker.com/)
 - Tämän repositorion forkattuna. (Huom! [workflow-tiedostossa](https://github.com/ohtuprojekti-mielentilatutkimus-thl/mielentilatutkimus-thl/blob/main/.github/workflows/cd.yml) oletetaan, että repositorion päähaaran nimi on main.)
 - Palvelimen docker-konteille

Lisäksi tässä ohjeistuksessa ja muussakin dokumentaatiossa oletetaan, että lukija ymmärtää ja osaa käyttää Dockeria.

### Pipeline: github-repositorio -> Dockerhub-repositorio

Aseta Dockerhub-tunnuksesi salaisuuksiksi repositoriosi asetuksissa [(kuva)](https://github.com/ktatu/mielentilatutkimus-thl/blob/main/dokumentaatio/kuvat/github_secrets.png):
käyttäjänimi salaisuuteen DOCKER_USERNAME ja vastaavasti salasanalle DOCKER_PASSWORD.

Nyt uuden imagen pitäisi päätyä docker-repositorioosi, kun githubissa mainiin ilmestyy uutta koodia. Voit testata tätä pushaamalla mainiin tai käynnistämällä workflow:n suorituksen repositorion [Actions-sivulla](https://github.com/ktatu/mielentilatutkimus-thl/blob/main/dokumentaatio/kuvat/github_actions.png).

### Docker tuotantopalvelimella

Projektiryhmällä oli käytössään yliopiston ylläpitämä [Caddy-palvelin](https://hub.docker.com/_/caddy). Ryhmän tarvitsi kuitenkin vain asettaa /mielentilatutkimus- ja /thl-sivuille lähetetyt pyynnöt välittymään mielentilatutkimus-sovelluksen kontille: 
```
handle /mielentilatutkimus* {
  reverse_proxy mielentila_backend:3001
}
handle /thl* {
  reverse_proxy mielentila_backend:3001
}
```

Palvelimen muu konfigurointi on forkkaajan selvitettävissä.

Mielentilatutkimus-sovelluksen docker-compose.yml-tiedosto:
```
version: '3.7' 

services: 

    mielentila_backend:
      image: ohtuprothl/mielentila-app
      restart: unless-stopped
      container_name: mielentila_backend
      depends_on:
        - mielentila_db

    mielentila_db:
      image: mongo:bionic
      restart: unless-stopped
      container_name: mielentila_db
      volumes:
        - ./data:/data/db

networks:
  default:
    external:
      name: network

```

Portteja ei siis erikseen tarvinnut asettaa. Backendin Dockerfilessä sisäiseksi portiksi on asetettu 3001 ja mongo käyttää oletuksena porttia 27017.

### Ympäristömuuttujat

Ympäristömuuttujat otetaan käyttöön [config.js-tiedostossa](https://github.com/ohtuprojekti-mielentilatutkimus-thl/mielentilatutkimus-thl/blob/main/backend/utils/config.js), jossa kannattaa vaihtaa muuttujien oletusarvoja. Luonteva ratkaisu tuotantopalvelimella olisi asettaa ympäristömuuttujat omaan tiedostoonsa. Lisätietoa [täällä](https://docs.docker.com/compose/environment-variables/)

