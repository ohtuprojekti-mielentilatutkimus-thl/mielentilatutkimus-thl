## Käyttöohje

### Repositorion lataaminen

Suorita terminaalissa komento:
```
git clone https://github.com/ohtuprojekti-mielentilatutkimus-thl/mielentilatutkimus-thl/
```

### Backend

> Alla olevat komennot suoritetaan `backend` kansion juuressa.

Ensimmäisellä kerralla asenna backendin riippuvuudet suorittamalla komento `npm install`

#### Palvelimen käynnistäminen porttiin 3001
```
npm start
```

### Frontend

> Alla olevat komennot suoritetaan `frontend` kansion juuressa.

Ensimmäisellä kerralla asenna frontendin riippuvuudet suorittamalla komento `npm install`

#### Palvelimen käynnistäminen porttiin 3000
```
npm start
```

#### Tuotantoversion buildaaminen
```
npm build
```

#### Frontedin testien ajaminen
```
npm test
```

#### Koodin linttaaminen
```
npm lint
```