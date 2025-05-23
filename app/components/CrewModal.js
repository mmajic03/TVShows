//Komponenta prikazuje detaljnije informacije o odabranom članu produkcije u modalnom prozoru
import Image from "next/image";
import {X} from 'lucide-react';
export default function CrewModal({crew, closeModal}){
    return(
        <>
            <div className="flex items-center justify-center fixed inset-0 z-50 bg-white/80">
                <div className="w-full max-w-md relative text-center bg-white p-6 rounded shadow-2xl">
                    <button 
                        onClick={closeModal} 
                        className="absolute top-2 right-3 p-1 rounded-full cursor-pointer">
                        <X className="w-7 h-7" 
                    />
                    </button>
                    <Image 
                        src={crew.person.image?.medium || "/person.jpg"} 
                        alt={crew.person.name}
                        width={300}
                        height={450}
                        className="object-cover rounded mx-auto mb-4 pt-6" 
                    />
                    <div className="flex flex-col items-center text-left space-y-2">
                        <h2 className="text-2xl font-bold border-b border-gray-300 mb-5">{crew.person.name}</h2>
                        <p className="text-gray-500"><strong className="text-black">Role:</strong> {crew.type}</p>
                        <p className="text-gray-500"><strong className="text-black">Country:</strong> {crew.person.country?.name || "Unknown"}</p>
                        <p className="text-gray-500"><strong className="text-black">Birthday:</strong> {crew.person.birthday || "Unknown"}</p>
                    </div>
                </div>
            </div>
        </>
    );
}