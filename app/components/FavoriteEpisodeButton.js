//Komponenta  omogućuje korisniku da doda epizodu u favorite i prikazuje trenutno stanje tog procesa na način koji ne usporava sučelje.
"use client";
import { useState, useEffect, useTransition } from "react";
import useAuthSession from "../lib/useAuthSession";
import { authedFetch } from "../lib/authedFetch";

export default function FavoriteEpisodeButton({ id, isFavorite }) {
  //pamti epizodu koja je spremljena u favorite
  const [saved, setSaved] = useState(isFavorite);
  //isPending - bit će true dok se radi neka pozadinska radnja(npr. spremanje favorita na server)
  //startTransition - koristi se za manje bitne radnje koje mogu sačekati kako bi važnije stvari u sučelju bile prikazane odmah
  const [isPending, startTransition] = useTransition();
  //checking označava da se još provjerava status favorita sa servera prije nego se omogući klik
  const [checking, setChecking] = useState(true);
  const { user } = useAuthSession();


  //ovaj useEffect provjerava je li epizoda već među favoritima, ali samo ako ta infomacija nije već 
  //proslijeđena kroz props i ako je korisnik prijavljen. Time se osigurava da se gumb pravilno inicijalizira i ne šalje višak zahtjeva.
  useEffect(() => {
    if (isFavorite || !user) {
      setChecking(false);
      return;
    }
    authedFetch("/api/favoriteEpisodes")
      .then((res) => res.json())
      .then((data) => {
        if (data.favoriteEpisodes?.includes(id)) {
          setSaved(true);
        }
      })
      .finally(() => setChecking(false));
  }, [isFavorite, id, user]); 

  //Ova funkcija koristi startTransition kako bi pozadinski poziv na API
  //izvršila bez blokiranja korisničkog sučelja.
  function addFavorites() {
      if (!user) {
      alert("You need to log in to add favorites.");
      return;
    }

    startTransition(async () => {
      if (!user)
        return;
      const res = await authedFetch("/api/favoriteEpisodes", {
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
    //gumb je onemogućen ako je epizoda već spremljena, ako spremanje traje ili ako se još provjerava je li među favoritima
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
