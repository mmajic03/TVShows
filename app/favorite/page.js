"use client";
import { useEffect, useState } from "react";
import FavoriteShowCard from "../components/FavoriteShowCard";

export default function FavoritesPage() {
  const [shows, setShows] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const res = await fetch("/api/favorites");
        const { favorites } = await res.json();

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
    return <div className="p-4 text-red-600">{error}</div>

  if (!shows) 
    return <div className="p-4">Loading...</div>

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
