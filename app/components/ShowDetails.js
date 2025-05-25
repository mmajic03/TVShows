//Komponenta prikazuje detaljne informacije o pojedinoj TV seriji.
//Dohvaća favorite i prikazuje status označavanja serije kao favorita.
"use client";
import { useEffect, useState } from "react";
//ikone se koriste iz biblioteke Lucide React
import { Star, Clock } from "lucide-react";
import FavoriteButton from "./FavoriteButton";
export default function ShowDetails({ show, episodes }) {
    //favorites - trenutno stanje tj. trenutni popis serija(niz) koje je korisnik označio kao favorite
    //setFavorites - funkcija kojom se ažurira to stanje
    const [favorites, setFavorites] = useState([]);
    //označava je li trenutno prikazana serija među favoritima
    const [isFavorite, setIsFavorite] = useState(false);

    //Dohvaćaju se podaci s API-ja, a rezultati se spremaju u lokalno stanje komponente pomoću setFavorites,
    //čime se omogućuje ažuriran prikaz podataka bez potrebe za ponovnim učitavanjem stranice.
    useEffect(() => {
    fetch("/api/favorites")
    .then(res => res.json())
    .then(data => {
        setFavorites(data.favorites || []);
        setIsFavorite(data.favorites?.includes(show.id));
    });
  }, [show.id]);
  
    return (
        <div className="w-full rounded-2xl p-4 lg:ml-[-40px] ml-0 ">
            <h1 className="text-5xl font-extrabold  mt-1 mb-4">{show.name}</h1>
            <hr className="w-full max-w-[500px] mb-2 ml-2 text-gray-300" />
            <div className="flex flex-wrap items-start text-gray-600 font-medium text-sm ml-4 mt-3 space-x-3">
                <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400"/>{show.rating.average}
                </span>
                <span>|</span>
                <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-gray-500" />{show.runtime} min
                </span>
            </div>

            <div className="ml-4 mt-5 space-y-3 text-gray-600 font-medium">
                <div><strong className="text-gray-700">Premiered:</strong> {show.premiered}</div>
                <div><strong className="text-gray-700">Genre:</strong> {show.genres.join(" | ")}</div>
                <div><strong className="text-gray-700">Schedule:</strong> {show.schedule?.days.join(", ")} at {show.schedule?.time}</div>
                {/*? u 'show.network?.name' znači da ako postoji show.netvork uzima show.network.name, a ako ne postoji
                vraća undefined umjesto da izbaci grešku.*/}
                <div><strong className="text-gray-700">Network:</strong> {show.network?.name || show.webChannel?.name}</div>
                <div><strong className="text-gray-700">Status:</strong> {show.status}</div>
                <div><strong className="text-gray-700">Show type:</strong> {show.type}</div>
                <div><strong className="text-gray-700">Episodes:</strong> {episodes.length}</div>
                {/*Iako je opasno, ovdje možemo koristiti dangerouslySetInnerHTML jer sadržaj dolazi s pouzdanog TVMaze API-ja,  
                služi kako bi prikazao HTML opis serije iz API-ja(npr. da nema <p> <b>...)*/}
                <div className="max-w-[600px]"><strong className="text-gray-700">About:</strong> <span dangerouslySetInnerHTML={{ __html: show.summary }} /></div>
                <FavoriteButton id={show.id} isFavorite={isFavorite}/>
            </div>
        </div>
    );
}
