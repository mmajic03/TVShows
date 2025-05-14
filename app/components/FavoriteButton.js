"use client";
import { useState, useEffect, useTransition } from "react";

export default function FavoriteButton({ id, initialSaved = false }) {
  const [saved, setSaved] = useState(initialSaved);
  const [isPending, startTransition] = useTransition();
  const [checking, setChecking] = useState(true); 

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
