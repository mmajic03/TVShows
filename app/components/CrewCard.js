"use client"
import Image from "next/image";
import { useState } from "react";
import CrewModal from "./CrewModal";
//prikaz kartice jedne osobe, kada se klikne na nju otvori se modalni prozor s informacijama o toj osobi
export default function CrewCard({ crew }) {
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
