//Komponenta omogućuje korisniku da doda seriju u favorite i prikazuje trenutno stanje tog procesa
//koristeći startTransition kako bi se moglo ažurirati bez blokiranja korisničkog sučelja.
"use client";
import { useState, useEffect, useTransition } from "react";
import { useSession, signIn } from "next-auth/react";


export default function FavoriteButton({ id, isFavorite}) {
   //Stanje koje prati je li serija spremljena kao favorit.
  //Postavlja se prema početnom 'isFavorite' iz roditeljske komponente.
  const [saved, setSaved] = useState(isFavorite);
   //useTransition omogućuje da se zahtjevi i promjene stanja pokrenu bez blokiranja korisničkog sučelja
  //React automatski optimizira ažuriranja u pozadini i korisnik ne primjećuje usporavanje.
  const [isPending, startTransition] = useTransition();
  //Koristi se za prikazivanje stanja dok se radi provjera s API-ja
  const [checking, setChecking] = useState(true); 
  const { data: session } = useSession();

  
  useEffect(() => {
    //Ako roditelj već zna da je favorit ili ako korisnik nije prijavljen, preskačemo dodatnu provjeru.
    if (isFavorite || !session) {
      setChecking(false);
      return;
    }
    //provjerava se jel serija već u favoritima tako da šalje GET zahtjev, ako je, saved se postavlja na true i prikazat će
    //se na gumbu 'Saved'
    fetch("/api/favorites")
      .then((res) => res.json())
      .then((data) => {
        if (data.favorites?.includes(id)) {
          setSaved(true);
        }
      })
      .finally(() => setChecking(false));
  }, [isFavorite, id, session]);

  //Ova funkcija koristi startTransition kako bi pozadinski poziv na API
  //izvršila bez blokiranja korisničkog sučelja.
  function addFavorites() {
    //Ako korisnik nije prijavljen ne moze spremati u favorite, prvo se treba prijaviti
    if (!session) {
      signIn();
      return;
    }
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
