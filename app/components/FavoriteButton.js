"use client";
import { useState, useEffect, useTransition } from "react";

export default function FavoriteButton({ id, initialSaved = false }) {
  const [saved, setSaved] = useState(initialSaved);
  const [isPending, startTransition] = useTransition();
  const [checking, setChecking] = useState(true); 

  //provjerava se je li određena serija već u favoritima tj. je li taj dani ID već postoji
  //u favoritima. Ako postoji, stanje saved se postavlja na true i checking na false
  useEffect(() => {
    if (initialSaved) return;
    fetch("/api/favorites")
      .then((res) => res.json())
      .then((data) => {
        if (data.favorites?.includes(id)) {
          setSaved(true);
        }
      })
      .finally(() => setChecking(false));
  }, [initialSaved, id]);


  //dodavanje serija u favorite slanjem POST zahtjeva
  function addFavorites() {
    startTransition(async () => {
    const res = await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }) 
    });
    if (res.ok) setSaved(true);
  });
}


  return (
    <button
        /*gumb je onemogućen dok traje spremanje, provjera ili ako je već spremljeno*/
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
