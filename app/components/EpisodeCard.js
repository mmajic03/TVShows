//Ova komponenta prikazuje osnovne informacije o jednoj epizodi (sliku, ime, sezonu i broj epizode) i omogućava otvaranje modalnog prozora s detaljnijim informacijama.
"use client";
import Image from "next/image";
import { useState } from "react";
import EpisodeModal from "./EpisodeModal";

export default function EpisodeCard({ episode }) {
  //showModal je stanje koje kontrolira prikaz modalnog prozora s detaljima epizode
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  return (
    <>
      <div onClick={() => setShowModal(true)} className="flex flex-col w-full max-w-[300px] bg-white shadow-md hover:shadow-lg rounded-2xl mb-20 cursor-pointer">
          <Image 
            src={episode.image.medium} 
            alt={episode.name} 
            width={300}
            height={169}
            className="w-full h-auto rounded-t-2xl" 
          />
          <div className="flex flex-col p-4 gap-2">
            <h2 className="text-xl text-center font-semibold text-black">{episode.name}</h2>
            <p className="text-sm text-gray-600 text-center">Season: {episode.season} |  Episode: {episode.number}</p>
          </div>
       </div>
        {showModal && (
            <EpisodeModal episode={episode} closeModal={closeModal}/>
          )}
     </>
  );
}
