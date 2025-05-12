import Image from "next/image";
import Link from "next/link";
export default function CastModal({cast, closeModal}){
    return(
        <>
            <div className="flex items-center justify-center fixed inset-0 z-50 bg-white/80">
                <div className="w-full max-w-md text-center bg-white p-6 rounded shadow-2xl">
                    <Image 
                        src={cast.person.image.medium || "/person.jpg"} 
                        alt={cast.person.name}
                        width={300}
                        height={450}
                        className="object-cover rounded mx-auto mb-4" 
                    />
                    <div className="flex flex-col items-center text-left space-y-2">
                        <h2 className="text-2xl font-bold border-b border-gray-300 mb-5">{cast.person.name}</h2>
                        <p className="text-black">
                            <strong>Character:</strong> <span className="text-red-600">{cast.character.name}</span>
                        </p>
                        <p className="text-gray-500"><strong className="text-black">Country:</strong> {cast.person.country?.name}</p>
                        <p className="text-gray-500"><strong className="text-black">Birthday:</strong> {cast.person.birthday}</p>
                        <p className="text-gray-500">
                            <strong className="text-black">Profile:</strong> <Link href={cast.person.url} className="text-red-600 underline">Click here</Link>
                        </p>
                    </div>
                    <button
                        onClick={closeModal}
                        className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Close
                    </button>
                </div>
            </div>
        </>
    );
}