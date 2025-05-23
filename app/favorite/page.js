 //Ova komponenta prikazuje sve serije koje je korisnik označio kao omiljene.
 //Dohvaća ID-eve spremljenih serija(/api/favorites), zatim za svaki ID dohvaća detalje serije s vanjskog API-ja(TVMaze).
"use client";
import { useEffect, useState } from "react";
import FavoriteShowCard from "../components/FavoriteShowCard";

export default function FavoritesPage() {
  const [shows, setShows] = useState(null);
  const [error, setError] = useState(null);

  //useEffect se koristi kako bi dohvatili podatke kada se stranica učita tj. kad se komponenta prikaže prvi put.
  //useEffect ne podržava async direktno pa se unutar njega definira i odmah poziva zasebna async funkcija.
  useEffect(() => {
    async function fetchFavorites() {
      try {
        //Dohvaćamo spremljene ID-eve serija iz lokalnog API-ja.
        const res = await fetch("/api/favorites");
        const { favorites } = await res.json();

        //Za svaki ID dohvaćamo detalje serije s TVMaze API-ja.
        //Koristimo Promise.all kako bismo paralelno dohvatili sve podatke i ubrzali učitavanje.
        const showsData = await Promise.all(
          favorites.map(async (id) => {
            const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
            return res.json();
          })
        );
        setShows(showsData);
      } catch (e) {
        setError(e.message);
      }
    }

    fetchFavorites();
  }, []);

  if (error) 
    return (
      <div className="flex items-center justify-center mt-[100px]">
        <div className="p-4 text-2xl text-red-600">{error}</div>
      </div>
    );

  if (!shows) 
    return (
      <div className="flex items-center justify-center mt-[100px]">
        <div className="p-4 text-2xl text-gray-600">Loading...</div>
      </div>
    );

  if (shows.length === 0)
    return (
      <div className="flex items-center justify-center mt-[100px]">
        <div className="p-4 text-2xl text-gray-600">No saved shows</div>
      </div>
    );

  return (
    <div className="p-4 max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
      {shows.map((show) => (
        <FavoriteShowCard key={show.id} show={show} />
      ))}
    </div>
  );
}
