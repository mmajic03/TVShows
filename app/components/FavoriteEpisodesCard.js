//Ova komponenta prikazuje pojedinačnu epizodu dodanu u omiljene s gumbom za uklanjanje iz omiljenih.
"use client";
import { useState, useTransition } from "react";
import { X } from "lucide-react";
import EpisodeCard from "./EpisodeCard";

export default function FavoriteEpisodeCard({ episode }) {
  //isVisible kontrolira hoće li se kartica prikazivati nakon uklanjanja.
  const [isVisible, setIsVisible] = useState(true);
  const [isPending, startTransition] = useTransition();


  async function removeFavorite() {
    //startTransition označava da je sljedeća promjena stanja manje prioritetna,
    //što omogućuje korisničkom sučelju da ostane responzivno tijekom async brisanja.
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
