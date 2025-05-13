"use client";
import Image from "next/image";
import { useState } from "react";
import EpisodeModal from "./EpisodeModal";
export default function EpisodeCard({ episode }) {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  return (
    <>
      <div className="flex flex-col w-full max-w-[300px] bg-white shadow-md hover:shadow-lg rounded-2xl mb-20">
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
            <button 
              onClick={() => setShowModal(true)} 
              className="text-blue-600 text-sm underline text-center cursor-pointer"
            >
              View
            </button>
          </div>
       </div>
        {showModal && (
            <EpisodeModal episode={episode} closeModal={closeModal} />
          )}
     </>
  );
}
