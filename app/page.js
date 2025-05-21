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

  //Dohvaćanje podataka s API-ja
  useEffect(() => {
    setIsLoading(true); 
    fetch(`https://api.tvmaze.com/shows?page=0`)
    .then(res => res.json())
    .then(data => {
      setShow(data);
      setIsLoading(false);
    })
  }, [page]);


  
  const filteredAll = show
    //prikazuje samo serije čiji naziv sadrži tekst koji je korisnik upisao u search input
    .filter((show) => show.name.toLowerCase().includes(search.toLowerCase()))
    .filter((show) => genreFilter === "All" ? true : show.genres.includes(genreFilter))
     //sortiranje serija prema datumu premijere, od najnovijih prema najstraijim
    .sort((a, b) => {
      if (filter === "Latest") {
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

    //uzima se samo prvih "offset" serija za prikaz(npr. prvih 20, a nakon 
    // klika na "Load more" prikazuje se više)
  const filteredShow = filteredAll.slice(0, offset);

  if (isLoading) {
    return <Loading />
  }

  return(
    <>
      <div className="flex flex-col items-center justify-center w-full min-h-[200px] px-4 md:px-10 sm:px-6 sm:min-h-[250px]">
        <h1 className="text-black text-6xl mb-3"><strong className="text-red-600">Show</strong>Time</h1>
        <h2 className="text-lg text-center max-w-2xl text-black hidden md:block">
          From gripping thrillers to heartfelt dramas and entertaining shows - today's world of television offers something for everyone. Discover the top series you simply can't miss.
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
              <ShowCardContent show={show} priority={index < 20}/>
            </div>
          ))}
        </div>
        <div className="flex justify-center my-6">
          {/*prikaziva se  gumb "Load more" samo ako je trenutno prikazan 
          broj serija(offset) manji od ukupnog broja filtriranih serija, 
          klik na gumb povećava broj prikazanih serija za 7*/}
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