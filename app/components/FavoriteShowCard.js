"use client";
import { useState, useTransition } from "react";
import { X } from "lucide-react";
import ShowCardContent from "./ShowCardContent";

export default function FavoriteShowCard({ show }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isPending, startTransition] = useTransition();

  async function removeFavorite() {
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
