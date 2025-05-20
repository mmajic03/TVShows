"use client";
import { useState, useEffect, useTransition } from "react";

export default function FavoriteEpisodeButton({ id, isFavorite }) {
//pamti epizodu koja je spremljen au favorite
  const [saved, setSaved] = useState(isFavorite);
  //isPending - bit će true dok se radi neka pozadinska radnja(npr. spremanje favorita na server)
  //startTransition - koristi za manje bitne radnje koje mogu sačekati kako bi važnije stvari u sučelju bile prikazane odmah
  const [isPending, startTransition] = useTransition();
  //stanje koje označava da se još uvijek provjerava je li epizoda među favoritima
  const [checking, setChecking] = useState(true);


  useEffect(() => {
    if (isFavorite) return;
    fetch("/api/favoriteEpisodes")
      .then((res) => res.json())
      .then((data) => {
        if (data.favoriteEpisodes?.includes(id)) {
          setSaved(true);
        }
      })
      .finally(() => setChecking(false));
  }, [isFavorite, id]); 

//funkcija za dodavanje epizode u favorite
  function addFavorites() {
    startTransition(async () => {
      const res = await fetch("/api/favoriteEpisodes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setSaved(true); 
      }
    });
  }

  return (
    <button
      disabled={saved || isPending || checking}
      onClick={addFavorites}
      className={`px-4 py-2 rounded font-semibold border ${
        saved
          ? "bg-white text-red-600 border-red-600"
          : "bg-red-600 text-white hover:bg-red-700"
      }`}
    >
      {saved ? "Saved" : isPending ? "Saving..." : "Add to favorites"}
    </button>
  );
}
