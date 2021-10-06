Muista aina antaa suoritettavalle skriptille suoritusoikeudet, esim. ``chmod +x cypress.sh``

### cypress.sh
Käynnistää kolme terminaalia - backendille, frontendille ja yksi cypressin ajoa varten.
Sovelluksen riippuvuudet ja konsole (terminaali-emulaattori) tulee olla asennettuna.

Suoritettava frontend annetaan skriptin suorituksen yhteydessä, esim. jos halutaan suorittaa frontend-kansion testit, niin
```
./cypress.sh frontend
```
