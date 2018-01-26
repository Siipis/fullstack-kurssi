**Tee vastaavanlainen kaavio, joka kuvaa mitä tapahtuu kun käyttäjä navigoi muistiinpanojen sivulle eli urliin https://fullstack-exampleapp.herokuapp.com/notes**

1. Käyttäjä kirjoittaa osoiteriville https://fullstack-exampleapp.herokuapp.com/notes
2. Selain tekee GET-kutsun palvelimelle
3. Palvelin muodostaa HTML-sivun
4. HTML palautetaan selaimelle 200 success -koodin kanssa
5. Selain hakee HTML:n perusteella vielä tiedostot main.css ja main.js
6. Javascript ajetaan, jonka seurauksena pyydetään myös data.json
7. Javascript käsittelee saadun datan ja päivittää selaimessa näkyvän HTML:n sen mukaisesti
