//Ova komponenta omogućuje korisniku povratak na prethodnu stranicu koristeći hook za navigaciju.
//Koristi se hook useRouter jer omogućava pristup funkciji 'back' koja se oslanja na povijest preglednika.
"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  //useRouter omogućava promjenu stranice i povratak bez ponovnog učitavanja cijele stranice
  const router = useRouter();

  function handleClick() {
    //router.back() vraća korisnika na prethodnu stranicu u povijesti preglednika
    router.back();
  }

  return (
    <button
      onClick={handleClick}
      className="bg-white hover:bg-gray-50 text-black px-5 py-3 rounded-md shadow-sm"
    >
      ← Back
    </button>
  );
}
