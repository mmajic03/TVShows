//Ova komponenta prikazuje pojedinačnu seriju koja je dodana u favorite s mogućnošću uklanjanja te serije iz omiljenih.
"use client";
import { useState, useTransition } from "react";
import { X } from "lucide-react";
import ShowCardContent from "./ShowCardContent";

export default function FavoriteShowCard({ show }) {
  //isVisible određuje prikaz kartice nakon uklanjanja.
  const [isVisible, setIsVisible] = useState(true);
  //useTransition se koristi da korisničko sučelje ne usporava dok se async zadatak izvršava.
  //isPending se koristi da se onemogući gumb dok traje uklanjanje, da se ne može kliknuti više puta.
  const [isPending, startTransition] = useTransition();

  async function removeFavorite() {
    //startTransition označava da slijedeća promjena stanja nije hitna,
    //što omogućuje prioritetno renderiranje drugih važnijih promjena korisničkog sučelja.
    startTransition(async () => {
    const res = await fetch("/api/favorites", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: show.id }),
    });
    if (res.ok) 
        setIsVisible(false);
  });
}

  //Ako je isVisible false, kartica se više ne prikazuje.
  if (!isVisible) return null;

  return (
    <div className="relative flex flex-col w-full max-w-[400px] bg-white shadow-md hover:shadow-lg rounded-xl mx-auto">
      <button
        disabled={isPending}
        onClick={removeFavorite}
        className="absolute top-2 right-2 p-1 text-black  bg-gray-100  hover:text-red-600 cursor-pointer rounded-full"
      >
        <X className="w-5 h-5" />
      </button>
      <ShowCardContent show={show} />
    </div>
  );
}
