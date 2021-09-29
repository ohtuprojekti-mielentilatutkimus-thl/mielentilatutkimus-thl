# mielentilatutkimus-thl

Linkit dokumentteihin:

* [Product backlog](https://docs.google.com/spreadsheets/d/1g_P3_va9YlYGpdnrq8FU41d5oZMHb35h9sNbHyAd-OI/edit#gid=512054485)
* [Sprint backlog](https://docs.google.com/spreadsheets/d/1kkBy4tXDKeBQ4vNx6RjYenB6CSsVMmcFq5vtddrigGc/edit#gid=2080422479)
* [Työaikakirjanpito](https://docs.google.com/spreadsheets/d/1p0x6vLt4iKnx1ox4t_BIjJfagC9palWiz4syX8-ceUE/edit#gid=0)

## Dokumentaatio

* [Käyttöohje](https://github.com/ohtuprojekti-mielentilatutkimus-thl/mielentilatutkimus-thl/tree/main/dokumentaatio/kayttoohje.md)
* [Tekninen toteutus](https://github.com/ohtuprojekti-mielentilatutkimus-thl/mielentilatutkimus-thl/tree/main/dokumentaatio/kayttoohje.md)

## Asennusohje

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
#### Backendin testien ajaminen
```
npm test
```
### Tietokanta

Backend käyttää tietokantana paikallisesti pyörivää Mongodb:tä. Asennusohjeet [täällä](https://docs.mongodb.com/manual/administration/install-community/).

### Frontend

> Alla olevat komennot suoritetaan `frontend` kansion juuressa.

Ensimmäisellä kerralla asenna frontendin riippuvuudet suorittamalla komento `npm install`

#### Palvelimen käynnistäminen porttiin 3000
```
npm start
```

#### Tuotantoversion buildaaminen

Kopioidaan frontendistä tuotantokoodi backendille. Tämä tapahtuu seuraavasti:

`frontend`-kansion juuressa suorita komento
```
npm run build
```
Seuraavaksi kopioidaan frontendin tuotantokoodi backendin alle komennolla:

```
cp -r build ../backend
```

Siirry kansioon `backend` ja suorita komento

```
npm start
```


#### Frontedin testien ajaminen
```
npm test
```

#### Koodin linttaaminen
```
npm lint
```

#### EndToEnd -testaus  
Käynnistä sekä front- että backend ja suorita frontendissä komento  
```
npm run cypress:open
```
#### Sähköpostivahvistukset  
Sovelluksen lähettämät sähköpostiviestit menevät `mailDev`:in kautta osoitteeseen `localhost:1080`.
Lisää ohjeita täällä: https://maildev.github.io/maildev/
