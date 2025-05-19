"use client"
import { useState } from "react";
import Image from "next/image";
import CastModal from "./CastModal";
//prikaz kartice jednog glumca, kada se klikne na nju otvori se modalni prozor s informacijama o tom glumcu
export default function CastCard({ cast }) {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  return (
    <>
      <div onClick={() => setShowModal(true)} className="flex flex-col w-full max-w-[300px] bg-white shadow-md hover:shadow-lg rounded-2xl mb-20 cursor-pointer">
        <Image 
          src={cast.person.image?.medium || "/person.jpg"} 
          alt={cast.person.name}
          width={300}
          height={450}
          className="object-cover rounded-t-2xl" 
        />
        <div className="flex flex-col text-center p-4 gap-2">
          <h2 className="text-xl font-semibold text-black">{cast.person.name}</h2>
          <p className="text-sm text-black">as <span className="text-red-600">{cast.character.name}</span></p>
        </div>
      </div>

      {showModal && <CastModal cast={cast} closeModal={closeModal}/>}
    </>
  );
}
