//Ova komponenta prikazuje pojedinačnu epizodu dodanu u omiljene s gumbom za uklanjanje iz omiljenih.
"use client";
import { useState, useTransition } from "react";
import { X } from "lucide-react";
import EpisodeCard from "./EpisodeCard";
import useAuthSession from "../lib/useAuthSession";
import { authedFetch } from "../lib/authedFetch";

export default function FavoriteEpisodeCard({ episode }) {
  //isVisible kontrolira hoće li se kartica prikazivati nakon uklanjanja.
  const [isVisible, setIsVisible] = useState(true);
  const [isPending, startTransition] = useTransition();
  const { user } = useAuthSession();


  async function removeFavorite() {
    //startTransition označava da je sljedeća promjena stanja manje prioritetna,
    //što omogućuje korisničkom sučelju da ostane responzivno tijekom async brisanja.
    startTransition(async () => {
      if (!user)
        return;
    const res = await authedFetch("/api/favoriteEpisodes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: episode.id }),
    });
      if (res.ok)
        setIsVisible(false);
  });
}

  if (!isVisible)
    return null;

  return (
    <div className="w-full max-w-[300px] relative mx-auto mb-20">
      <button
        disabled={!user || isPending}
        onClick={removeFavorite}
        className="top-2 right-2 z-20 p-1 absolute text-black bg-gray-100 hover:text-red-600 rounded-full"
      >
        <X className="w-5 h-5" />
      </button>
      <EpisodeCard episode={episode} />
    </div>
  );
}
