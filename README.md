# ShowTime - projektni zadatak

## Sadržaj
- [Opis projekta](#opis-projekta)  
- [Pregled funkcionalnosti](#pregled-funkcionalnosti)
- [Korištene tehnologije](#korištene-tehnologije)
- [Upute za lokalno pokretanje](#upute-za-lokalno-pokretanje)  
- [Build i deploy](#build-i-deploy)  
- [Poznate greške i buduće nadogradnje](#poznate-greške-i-buduće-nadogradnje)  

## Opis projekta

Cilj ovog projekta je izrada web stranice u Next.js-u koja korisnicima omogućava istraživanje TV serija i pregled detaljnih informacija o svakoj od njih. Podaci o serijama, epizodama, glumcima i članovima produkcije dohvaćaju se putem TV Maze API-ja. Na početnoj stranici prikazuje se prvih 20 serija uz mogućnost učitavanja dodatnih serija. Svaka serija ima svoju zasebnu stranicu s detaljnijim informacijama, popisom epizoda, detaljima o glumcima i produkciji.

Korisnici mogu dodavati i uklanjati serije iz favorita, a za upravljanje favoritima implementirana je vlastita API ruta. Također su osigurane globalne stranice za prikaz učitavanja sadržaja te za nepostojeće stranice, a aplikacija je optimizirana za SEO i performanse. Među dodatnim značajkama nalaze se pretraživanje i filtriranje serija po žanrovima.

## Pregled funkcionalnosti

- **POČETNA STRANICA**  
  - Header i footer  
  - Prikaz 20-ak prvih serija s TV Maze API-ja (https://www.tvmaze.com/api)  
  - Sortiranje serija prema datumu premijere (od novijih prema starijima)  
  - Sortiranje serija prema ocjeni (od viših prema nižima)  
  - Pretraživanje serija (search input)  
  - Gumb ‘Load more’ za prikaz dodatnih serija (učitava sljedećih 7 serija jer je offset postavljen na 7)  

- **DINAMIČKE RUTE**  
  - `/shows/[id]` - detalji pojedine serije (poster, status, žanrovi, ocjena itd.)  
  - `/shows/[id]/episodes` - prikaz svih epizoda serije s osnovnim podacima  
    - Klikom na određenu epizodu otvara se modalni prozor s više informacija  
  - `/shows/[id]/cast` - prikaz svih glumaca serije s osnovnim podacima  
    - Klikom na određenog glumca otvara se modalni prozor s više informacija  
  - `/shows/[id]/crew` - prikaz svih članova produkcije te serije s osnovnim podacima  
    - Klikom na određenu osobu otvara se modalni prozor s više informacija  

- **FAVORITI**  
  - Dodavanje/brisanje serija iz favorita pomoću komponenti `FavoriteButton`  
  - Dodavanje/brisanje epizoda iz favorita pomoću `FavoriteEpisodeButton`  
  - API ruta `app/api/favorites` omogućuje dodavanje (POST), dohvat (GET) i brisanje (DELETE) serija  
  - API ruta `app/api/favoriteEpisodes` omogućuje dodavanje (POST), dohvat (GET) i brisanje (DELETE) epizoda  
  - `/favorite` i `/favoriteEpisodes` – stranice s prikazom spremljenih serija i epizoda  

- **404 STRANICA (NOT-FOUND)**  
  - Prikazuje se kada korisnik pokuša otvoriti nepostojeću stranicu (globalno)  

- **LOADING STRANICA**  
  - Prikazuje se dok se podaci učitavaju (globalno)  

- **SEO I OPTIMIZACIJA**  
  - Dinamičko generiranje meta podataka (naslov, opis, Open Graph slika) na temelju podataka serije  
  - Globalni metapodaci za osnovne SEO informacije (naziv stranice, opis, ključne riječi, favicon itd.)  

- **DEPLOY NA VERCEL**  
  - Stranica je spremna za produkcijsko okruženje i uspješno deployana na Vercel  

## Korištene tehnologije
- [Next.js 15](https://nextjs.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [TVmaze API](https://www.tvmaze.com/api)
- [Lucide React](https://lucide.dev/)
- [Vercel](https://vercel.com/)

## Upute za lokalno pokretanje
- git clone https://github.com/mmajic03/TVShows
- npm install
- npm run dev


## Build i deploy 
  - npm run build
  - npm start
  - Link na produkcijsku verziju: https://tv-shows-4nmmdwk6u-monikas-projects-d53a34a2.vercel.app

## Poznate greške i buduće nadogradnje 
  - Buduće nadogradnje:
    - Na stranici s epizodama omogućiti prikaz epizoda po sezonama ili dodati padajući izbornik za odabir sezone.
    - Integracija s GitHub OAuth-om i spremanje favorita po korisniku u cookie.
    - Dodavanje glumaca u favorite.
    - Poboljšati izgled navigacije na stranici za serije, njezine epizode i glumce.







