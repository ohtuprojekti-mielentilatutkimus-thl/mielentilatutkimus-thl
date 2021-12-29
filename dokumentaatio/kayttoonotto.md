# Käyttöönotto
Käyttöönotto-ohje kuvaa miten projektiryhmän pipelinen saa toimimaan. Kuvaukset siitä mitä kussakin vaiheessa tapahtuu löytyy [Ci- / Cd-dokumentaatiosta.](https://github.com/ohtuprojekti-mielentilatutkimus-thl/mielentilatutkimus-thl/blob/main/dokumentaatio/cicd.md)

Tarvitset:
 - [Dockerhub-käyttäjätunnukset](https://hub.docker.com/)
 - Tämän repositorion forkattuna. (Huom! [workflow-tiedostossa](https://github.com/ohtuprojekti-mielentilatutkimus-thl/mielentilatutkimus-thl/blob/main/.github/workflows/cd.yml) oletetaan, että repositorion päähaaran nimi on main.)
 - Palvelimen docker-konteille

### Backendin ympäristömuuttujat
Selityksiä jne. tää vois ehkä olla kans viimeisenä

### 1. Pipeline: github-repositorio -> Dockerhub-repositorio

Aseta Dockerhub-tunnuksesi salaisuuksiksi repositoriosi asetuksissa [(kuva)](https://github.com/ktatu/mielentilatutkimus-thl/blob/main/dokumentaatio/kuvat/github_secrets.png):
käyttäjänimi salaisuuteen DOCKER_USERNAME ja vastaavasti salasanalle DOCKER_PASSWORD.

Nyt uuden imagen pitäisi päätyä docker-repositorioosi, kun githubissa mainiin ilmestyy uutta koodia. Voit testata tätä pushaamalla mainiin tai käynnistämällä workflow:n suorituksen repositorion [Actions-sivulla](https://github.com/ktatu/mielentilatutkimus-thl/blob/main/dokumentaatio/kuvat/github_actions.png).

### 2. Docker tuotantopalvelimella

Projektiryhmällä oli käytössään yliopiston ylläpitämä [Caddy-palvelin](https://hub.docker.com/_/caddy). Ryhmän tarvitsi kuitenkin vain asettaa /mielentilatutkimus- ja /thl-sivuille lähetetyt pyynnöt välittymään mielentilatutkimus-sovelluksen kontille, joten palvelimen konfigurointi on forkkaajan selvitettävissä.

Mielentilatutkimus-sovelluksen docker-compose.yml-tiedosto:
```

```

