"use client"
import { useState, useEffect } from "react";
import FilterBar from "./components/FilterBar";
import ShowCard from "./components/ShowCard";
export default function Home(){
  const [show, setShow] = useState([]);
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(20);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [genreFilter, setGenreFilter] = useState("All");

  const genres = ["All", "Action", "Adventure", "Anime", "Comedy", "Crime", "Drama", 
    "Family", "Fantasy", "History", "Horror", "Legal", "Medical", "Music", "Mystery", 
    "Romance", "Science-Fiction", "Sports", "Supernatural", "Thriller", "War", "Western"];

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows?page=${page}`)
    .then(res => res.json())
    .then(data => {
      setShow(prev => [...prev, ...data]);
    })
  }, [page]);


  const filteredAll = show
    .filter((show) => show.name.toLowerCase().includes(search.toLowerCase()))
    .filter((show) => genreFilter === "All" ? true : show.genres.includes(genreFilter))
    .sort((a, b) => {
      if (filter === "Latest") {
        const date1 = a.premiered ? new Date(a.premiered) : new Date(0);
        const date2 = b.premiered ? new Date(b.premiered) : new Date(0);
        return date2 - date1;
      }
      if (filter === "Top rated") {
        const rating1 = a.rating.average ?? 0;
        const rating2 = b.rating.average ?? 0;
        return rating2 - rating1;
      }
      return 0;
    });

  const filteredShow = filteredAll.slice(0, offset);

  return(
    <>
      <div className="flex flex-col items-center justify-center w-full min-h-[200px] px-4 md:px-10 sm:px-6 sm:min-h-[250px]">
        <h1 className="text-7xl sm:text-4xl md:text-5xl lg:text-6xl text-[#CC1B1B] font-bold mb-4">TV Shows</h1>
        <p className="text-lg text-center max-w-2xl text-black hidden md:block">
          From gripping thrillers to heartfelt dramas and entertaining shows — today's world of television offers something for everyone. Discover the top series you simply can't miss.
        </p>
        <input 
          type="text" 
          placeholder="Search" 
          className="pl-10 w-[700px] h-16 border border-gray-300 mt-6 rounded-full focus:ring-1 shadow-lg hidden md:block" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <FilterBar genres={genres} filter={filter} setFilter={setFilter} genreFilter={genreFilter} setGenreFilter={setGenreFilter}/>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4 sm:px-6 md:px-6">
        {filteredShow.map((show) => (
          <ShowCard key={show.id} show={show}/>
        ))}
      </div>
      <div className="flex justify-center my-6">
        {offset < filteredShow.length && (
          <button 
            onClick={() => setOffset(offset + 7)} 
            className="bg-[#CC1B1B] text-white px-6 py-4 mt-12 rounded hover:bg-red-700">Load more...
          </button>
        )}
      </div>
    </>
  );
}