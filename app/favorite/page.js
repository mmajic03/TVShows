//Ova komponenta prikazuje sve serije koje je korisnik označio kao omiljene.
//Dohvaća ID-eve spremljenih serija(/api/favorites), zatim za svaki ID dohvaća detalje serije s vanjskog API-ja(TVMaze).
"use client";
import { useEffect, useState } from "react";
import FavoriteShowCard from "../components/FavoriteShowCard";
//Vraća je li netko prijavljen i ako da, vraća informacije o korisniku
import useAuthSession from "../lib/useAuthSession";
import { authedFetch } from "../lib/authedFetch";


export default function FavoritesPage() {
  const [shows, setShows] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useAuthSession();


  //useEffect se koristi kako bi dohvatili podatke kada se stranica učita tj. kad se komponenta prikaže prvi put.
  //useEffect ne podržava async direktno pa se unutar njega definira i odmah poziva zasebna async funkcija.
  useEffect(() => {
    async function fetchFavorites() {
      try {
        if (!user) {
          setShows([]);
          return;
        }
        //Dohvaćamo spremljene ID-eve serija iz lokalnog API-ja.
        const res = await authedFetch("/api/favorites");
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
      }catch(e){
        setError(e.message);
      }
    }
      fetchFavorites();
  }, [user]);
  
  if (error) 
    return (
      <div className="flex items-center justify-center mt-[100px]">
        <div className="p-4 text-2xl text-red-600">{error}</div>
      </div>
    );

  if (!shows) 
    return (
      <div className="flex items-center justify-center mt-[100px]">
        <div className="p-4 text-4xl text-gray-600">No favorite shows</div>
      </div>
    );

  if (!user)
    return (
      <div className="flex flex-col items-center justify-center mt-[100px] gap-4">
        <div className="p-4 text-2xl font-bold text-gray-600">
          Please login to see favorites
        </div>

        <button
          onClick={() => router.push("/login")}
          className="px-6 py-4 rounded-lg font-semibold border bg-red-600 text-white hover:bg-red-700 cursor-pointer"
        >
          Login
        </button>
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
