// Ova komponenta prikazuje osnovne informacije o jednom članu produkcijskog tima (slika, ime, uloga)
// i omogućava otvaranje modalnog prozora s detaljnijim informacijama o toj osobi.
"use client"
import Image from "next/image";
import { useState } from "react";
import CrewModal from "./CrewModal";
export default function CrewCard({ crew }) {
  //showModal je stanje koje kontrolira prikaz modalnog prozora s detaljima osobe iz produkcije
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  return (
    <>
      <div onClick={() => setShowModal(true)} className="flex flex-col w-full max-w-[300px] bg-white shadow-md hover:shadow-lg rounded-2xl mb-20 cursor-pointer">
          <Image 
              src={crew.person.image?.medium || "/person.jpg"} 
              alt={crew.person.name} 
              width={300} 
              height={450}
              className="w-full h-[450px] object-cover rounded-t-2xl" 
          />
          <div className="flex flex-col text-center p-4 gap-2">
              <h2 className="text-xl font-semibold text-black">{crew.person.name}</h2>
              <p className="text-sm text-gray-600">as <span className="text-red-600">{crew.type}</span></p>
          </div>
      </div>

      {showModal && <CrewModal crew={crew} closeModal={closeModal}/>}
    </>
  );
}
