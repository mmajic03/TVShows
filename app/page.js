//Ova komponenta predstavlja glavnu početnu stranicu koja dohvaća serije s glavnog
//API-ja(TVmaze). Omogućuje filtriranje po žanrovima, pretraživanje i sortiranje
//prikazanih serija prema datumu premijere i prema ocjenama.
"use client"
import { useState, useEffect } from "react";
import FilterBar from "./components/FilterBar";
import ShowCardContent from "./components/ShowCardContent";
import Loading from "./loading";

export default function Home(){
  const [show, setShow] = useState([]);
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(20);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [genreFilter, setGenreFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  const genres = ["All", "Action", "Adventure", "Anime", "Comedy", "Crime", "Drama", 
    "Family", "Fantasy", "History", "Horror", "Legal", "Medical", "Music", "Mystery", 
    "Romance", "Science-Fiction", "Sports", "Supernatural", "Thriller", "War", "Western"];

  //Dohvaća popis serija s TVmaze API-ja kad se promijeni broj stranice.
  //Postavlja se loading stanje dok traje dohvat i ažurira prikaz serija nakon što podaci stignu.
  //Ovaj API vraća podatke o serijama u stranicama kako nebi učitavao sve odjednom jer bi to predugo trajalo
  //i zauzimalo bi puno memorije.
  useEffect(() => {
    setIsLoading(true); 
    fetch(`https://api.tvmaze.com/shows?page=${page}`)
    .then(res => res.json())
    .then(data => {
      setShow(data);
      setIsLoading(false);
    })
  }, [page]);


  
  const filteredAll = show
    //Filtriraju se samo one serije čiji naziv sadrži tekst koji je upisan u polje za pretraživanje(zanemaruje se razlika velikih i malih slova)
    .filter((show) => show.name.toLowerCase().includes(search.toLowerCase()))
    //filtriranje po žanrovima(Ako nije odabrano 'All' prikazuju se samo serije koje sadrže odabrani žanr)
    .filter((show) => genreFilter === "All" ? true : show.genres.includes(genreFilter))
    //sortira rezultate prema odabranom kriteriju
    .sort((a, b) => {
      //sortiranje prema datumu premijere
      if (filter === "Latest") {
        //newDate(a.premiered)-pretvara datum u objekt
        const date1 = a.premiered ? new Date(a.premiered) : new Date(0);
        const date2 = b.premiered ? new Date(b.premiered) : new Date(0);
        return date2 - date1;
      }
      //sortiranje prema prosječnoj ocjeni
      if (filter === "Top rated") {
        const rating1 = a.rating.average;
        const rating2 = b.rating.average;
        return rating2 - rating1;
      }
      return 0;
    });

  //uzima samo prvih offset serija iz već filtriranog i sortiranog popisa kako bi se
  //ograničio broj prikazanih rezultata na stranici(0-početni indeks, offset-do kojeg indeksa idemo, al on nije uključen)
  const filteredShow = filteredAll.slice(0, offset);

  if (isLoading) {
    return <Loading />
  }

  return(
    <>
      <div className="flex flex-col items-center justify-center w-full min-h-[200px] px-4 md:px-10 sm:px-6 sm:min-h-[250px]">
        <h1 className="text-black text-6xl mb-3"><strong className="text-red-600">Show</strong>Time</h1>
        <h2 className="text-lg text-center max-w-2xl text-black hidden md:block">
          From gripping thrillers to heartfelt dramas and entertaining shows - today&apos;s world of television offers something for everyone. Discover the top series you simply can&apos;t miss.
        </h2>
        <input 
          type="text" 
          placeholder="Search" 
          className="pl-10 w-[700px] h-16 border border-gray-300 mt-6 rounded-full focus:ring-1 shadow-lg hidden md:block" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="w-full max-w-[1600px] mx-auto">
        <FilterBar genres={genres} filter={filter} setFilter={setFilter} genreFilter={genreFilter} setGenreFilter={setGenreFilter}/>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4 sm:px-6 md:px-6">
          {filteredShow.map((show, index) => (
            <div key={show.id} className="flex flex-col w-full max-w-[400px] bg-white shadow-md hover:shadow-lg rounded-xl mx-auto">
              <ShowCardContent show={show} priority={index === 0}/>
            </div>
          ))}
        </div>
        {/*ako je offset(broj trenutno prikazanih serija) manji od ukupnog broja serija koje su prošli filtriranje
        (filterAll.length) gumb se prikaže*/}
        <div className="flex justify-center my-6">
          {offset < filteredAll.length && (
            <button 
              onClick={() => setOffset((prev) => prev + 7)} 
              className="bg-red-600 text-white px-6 py-4 mt-12 rounded hover:bg-red-700">Load more...
            </button>
          )}
        </div>
      </div>
    </>
  );
}