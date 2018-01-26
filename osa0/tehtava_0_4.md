**Tee kaavio tilanteesta, missä käyttäjä luo uuden muistiinpanon ollessaan sivulla https://fullstack-exampleapp.herokuapp.com/notes, eli kirjoittaa tekstikenttään jotain ja painaa nappia tallenna**

1. Käyttäjä kirjoittaa osoiteriville https://fullstack-exampleapp.herokuapp.com/notes
2. Selain tekee GET-kutsun palvelimelle
3. Palvelin muodostaa HTML-sivun
4. HTML palautetaan selaimelle 200 success -koodin kanssa
5. Selain hakee HTML:n perusteella vielä tiedostot main.css ja main.js
6. Javascript ajetaan, jonka seurauksena pyydetään myös data.json
7. Javascript käsittelee saadun datan ja päivittää selaimessa näkyvän HTML:n sen mukaisesti
8. Käyttäjä kirjoittaa lomakkeen tekstikenttään jotakin ja painaa nappia tallenna
9. Selain (Javascript) tekee POST-kutsun palvelimelle ja lähettää käyttäjän syöttämän datan sen mukana
10. Palvelin käsittelee saadun datan ja lähettää 302 redirect -koodin takaisin, ohjaten selaimen takaisin samalle sivulle
11. Toistetaan kohdat 2-7
