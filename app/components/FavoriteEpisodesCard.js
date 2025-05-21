"use client";
import { useState, useTransition } from "react";
import { X } from "lucide-react";
import EpisodeCard from "./EpisodeCard";

//komponenta prikazuje određenu seriju koja je dodana u favorite, ali s gumbom za uklanjanje
export default function FavoriteEpisodeCard({ episode }) {
  //određuje treba li se kartica prikazivati
  const [isVisible, setIsVisible] = useState(true);
  //prikaz stanja dok se čeka kad će se ukloniti kartica
  const [isPending, startTransition] = useTransition();

  //funkcija za brisanje epizode iz omiljenih
  async function removeFavorite() {
    startTransition(async () => {
    const res = await fetch("/api/favoriteEpisodes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: episode.id }),
    });
    if (res.ok) 
        setIsVisible(false);
  });
}

  if (!isVisible) return null;

  return (
    <div className="w-full max-w-[300px] relative mx-auto mb-20">
      <button
        disabled={isPending}
        onClick={removeFavorite}
        className="top-2 right-2 z-20 p-1 absolute text-black bg-gray-100 hover:text-red-600 rounded-full"
      >
        <X className="w-5 h-5" />
      </button>
      <EpisodeCard episode={episode} />
    </div>
  );
}
