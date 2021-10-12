Muista aina antaa suoritettavalle skriptille suoritusoikeudet, esim. ``chmod +x cypress.sh``

### cypress.sh
Skriptin avulla voi suorittaa frontend- ja thl-frontend-kansioiden cypress testejä joutumatta avaamaan ylimääräisiä terminaaleja.
Käynnistää kolme terminaalia - backendille, frontendille ja yksi cypressin ajoa varten.
Sovelluksen riippuvuudet ja konsole (terminaali-emulaattori) tulee olla asennettuna.

Suoritettava frontend annetaan skriptin suorituksen yhteydessä, esim. jos halutaan suorittaa frontend-kansion testit, niin
```
sh cypress.sh frontend
```

### build_frontends.sh
Buildaa frontendien tuotantoversiot ja kopioi ne backendin hakemistoihin builds/mielentilatutkimus ja builds/thl. Ei toimi jos backendin riippuvuuksia ei ole asennettu komennolla `npm install` backend-kansiossa.
Toimii scripts-kansiossa komennolla
```
sh build_frontends.sh
```
ja backend-kansiossa komennolla 
```
npm run build:both
```
