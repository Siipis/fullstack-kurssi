**Tee kaavio tilanteesta, missä käyttäjä luo uuden muistiinpanon single page -versiossa**

1. Käyttäjä kirjoittaa osoiteriville https://fullstack-exampleapp.herokuapp.com/spa
2. Selain tekee GET-kutsun palvelimelle
3. Palvelin muodostaa HTML-sivun
4. HTML palautetaan selaimelle 200 success -koodin kanssa
5. Selain hakee HTML:n perusteella vielä tiedostot main.css ja main.js
6. Javascript ajetaan, jonka seurauksena pyydetään myös data.json
7. Javascript käsittelee saadun datan ja päivittää selaimessa näkyvän HTML:n sen mukaisesti
8. Käyttäjä kirjoittaa lomakkeen tekstikenttään jotakin ja painaa nappia tallenna
9. Javascript keskeyttää selaimen oletuskutsun ja estää menemisen uudelle sivulle
10. Javascript lukee käyttäjän syöttämän datan kentästä
11. Javascript päivittää selaimessa näkyvän HTML:n lisäämällä siihen käyttäjän syöttämän datan
12. Javascript tekee POST-kutsun palvelimelle ja lähettää käyttäjän syöttämän datan sen mukana
