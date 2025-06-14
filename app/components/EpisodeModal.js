//Komponenta prikazuje detaljnije informacije o odabranoj epizodi u modalnom prozoru
//Dohvaća se informacija o tome je li epizoda označena kao favorit pozivom API-ja.
import Image from "next/image";
import {X} from 'lucide-react';
import { useState, useEffect } from "react";
import FavoriteEpisodeButton from "./FavoriteEpisodeButton";

export default function EpisodeModal({ episode, closeModal}) {
    const [isFavorite, setIsFavorite] = useState(false);

    //useEffect se pokreće svaki put kada se promijeni episode.id tj. kada se otvori modalni prozor za novu epizodu
    //Poziva se API koji dohvaća favorite sa servera i provjerava je li ta epizoda u favoritima.
    useEffect(() => {
        fetch("/api/favoriteEpisodes")
        .then((res) => res.json())
        .then((data) => {
            setIsFavorite(data.favoriteEpisodes.includes(episode.id));
        })
        .catch((err) => console.error("Failed to fetch favorite episodes", err));
    }, [episode.id]);
    return (
    <>
        <div className="flex items-center justify-center fixed inset-0 z-50 bg-white/80">
            <div className="flex flex-col items-center relative p-10 text-left w-full max-w-2xl bg-white rounded shadow-2xl space-y-4">
                <button 
                    onClick={closeModal} 
                    className="absolute top-4 right-4 p-1 rounded-full cursor-pointer">
                    <X className="w-7 h-7" 
                />
                </button>
                <h2 className="text-4xl font-bold border-b border-gray-300 pb-2 w-full text-center">{episode.name}</h2>
                <Image
                    src={episode.image?.medium || "/placeholder.png"}
                    alt={episode.name}
                    width={500}
                    height={281}
                    className="object-cover rounded mb-5"
                />
                <p className="text-gray-700 w-full"><strong className="text-black">Number: </strong>Season {episode.season}, Episode {episode.number}</p>
                <p className="text-gray-700 w-full"><strong className="text-black">Airdate: </strong> {episode.airdate} at {episode.airtime}</p>
                <p className="text-gray-700 w-full"><strong className="text-black">Rating:</strong> {episode.rating?.average}</p>
                <p className="text-gray-700 w-full"><strong className="text-black">Runtime:</strong> {episode.runtime} min</p>
                <div className="text-gray-700 w-full"><strong className="text-black">Summary:</strong>
                {/*Korištenje dangerouslySetInnerHTML-a ovdje je sigurno jer sadržaj dolazi iz provjerenog API-ja(tvmaze.com)*/}
                    {episode.summary && (
                        <div
                            className="text-gray-700 text-sm w-full pt-1"
                            dangerouslySetInnerHTML={{ __html: episode.summary }}
                        />
                    )}
                </div>
                <FavoriteEpisodeButton id={episode.id} isFavorite={isFavorite}/>
            </div>
        </div>
    </>
  );
}
