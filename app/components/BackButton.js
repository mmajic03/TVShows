"use client";
//useRouter - hook koji služi za upravljanje navigacijom(promjena stranica) i pristup informacijama o trenutnoj ruti
import { useRouter } from "next/navigation";

export default function BackButton() {
  //useRouter vraća objekt koji omogućuje upravljanje navigacijom(preusmjeravanje i povratak natrag)
  const router = useRouter();

  function handleClick() {
    // pozivom back vraćamo korisnika na prethodnu stranicu
    router.back();
  }

  return (
    <button
      onClick={handleClick}
      className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-md shadow-sm"
    >
      Back
    </button>
  );
}
