"use client";
import { useEffect, useState } from "react";
import FavoriteEpisodeCard from "@/app/components/FavoriteEpisodesCard";

export default function FavoriteEpisodesPage() {
  const [episodes, setEpisodes] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFavoriteEpisodes() {
      try {
        const res = await fetch("/api/favoriteEpisodes");
        if (!res.ok) throw new Error("Error fetching favorites");

        const { favoriteEpisodes } = await res.json();

        if (!favoriteEpisodes || favoriteEpisodes.length === 0) {
          setEpisodes([]);
          return;
        }

        const episodesData = await Promise.all(
          favoriteEpisodes.map(async (id) => {
            const res = await fetch(`https://api.tvmaze.com/episodes/${id}`);
            if (!res.ok) return null;
            return res.json();
          })
        );

        setEpisodes(episodesData);
      } catch (e) {
        setError(e.message);
      }
    }

    fetchFavoriteEpisodes();
  }, []);

  if (error) 
    return <div className="p-4 text-red-600">{error}</div>
  if (!episodes) 
    return <div className="p-4">Loading...</div>
    
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
