//Ova komponenta prikazuje sve epizode koje je korisnik označio kao omiljene.
//Najprije dohvaća ID-eve spremljenih epizoda iz lokalnog API-ja(/api/favoriteEpisodes), 
//zatim za svaki ID dohvaća detalje epizode s vanjskog API-ja(TVMaze).
"use client";
import { useEffect, useState } from "react";
import FavoriteEpisodeCard from "@/app/components/FavoriteEpisodesCard";
import useAuthSession from "@/app/lib/useAuthSession";
import { authedFetch } from "@/app/lib/authedFetch";

export default function FavoriteEpisodesPage() {
  const [episodes, setEpisodes] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useAuthSession();


  //useEffect služi za dohvat podataka odmah nakon prvog renderiranja komponente.
  //useEffect ne podržava async funkciju direktno, pa unutar njega definiramo i odmah pozivamo zasebnu async funkciju fetchFavoriteEpisodes.
  useEffect(() => {
    async function fetchFavoriteEpisodes() {
      try {
        if (!user) {
          setEpisodes([]);
          return;
        }
        const res = await authedFetch("/api/favoriteEpisodes");
        if (!res.ok) throw new Error("Error fetching favorites");

        const { favoriteEpisodes } = await res.json();

        if (!favoriteEpisodes || favoriteEpisodes.length === 0) {
          setEpisodes([]);
          return;
        }

        //Za svaki ID epizode dohvaćamo detalje s TVMaze API-ja.
        //Koristimo Promise.all za paralelno dohvaćanje svih epizoda zbog bržeg učitavanja.
        const episodesData = await Promise.all(
          favoriteEpisodes.map(async (id) => {
            const res = await fetch(`https://api.tvmaze.com/episodes/${id}`);
            if (!res.ok) return null;
            return res.json();
          })
        );
        setEpisodes(episodesData);
      }catch(e){
        setError(e.message);
      }
      }
        fetchFavoriteEpisodes();
    }, [user]);

  if (error) 
    return (
      <div className="flex items-center justify-center mt-[100px]">
        <div className="p-4 text-2xl text-red-600">{error}</div>
      </div>
    );
  
  if (!episodes) 
    return (
      <div className="flex items-center justify-center mt-[100px]">
        <div className="p-4 text-4xl text-gray-600">No favorite episodes</div>
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

  if (episodes.length === 0)
    return (
      <div className="flex items-center justify-center mt-[100px]">
        <div className="p-4 text-2xl text-gray-600">No saved episodes</div>
      </div>
    );

  return (
    <div className="p-4 max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
      {episodes.map((episode) => (
        <FavoriteEpisodeCard key={episode.id} episode={episode} />
      ))}
    </div>
  );
}
