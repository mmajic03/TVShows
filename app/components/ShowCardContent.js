import Image from "next/image";
import Link from "next/link";
import { Clock, Star } from "lucide-react";
//prikaz male kartice svake serije na početnoj stranici
export default function ShowCardContent({ show }) {
  return (
    <>
      <Image 
        src={show.image?.medium || "/placeholder.png"} 
        alt={show.name} 
        width={400} 
        height={600}
        className="rounded-xl object-contain"
      />
      <div className="flex flex-col p-4 gap-2">
        <h2 className="text-2xl text-center font-semibold text-black mb-2 sm:text-left">{show.name}</h2>
        <div className="sm:block hidden">
          <p className="text-sm text-gray-500 mt-[-2px] mb-1">{show.premiered ? `${show.premiered}` : "Unknown"}</p>
          <div className="hidden md:block">
            <div className="flex flex-wrap gap-2 text-xs">
              {show.genres.map((genre, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-3 py-2 rounded-full text-xs">{genre}</span>
              ))}
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600 mt-4 mb-3">
              <span className="flex items-center gap-1 text-black">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {show.rating?.average || "-"}
              </span>
              <span className="flex items-center gap-1 text-black">
                <Clock className="w-4 h-4" /> {show.runtime || "-"} mins
              </span>
            </div>
          </div>
        </div>
        <div className="mt-1 ml-[-4px]">
          <Link href={`/show/${show.id}`} className="block text-center text-blue-600 text-sm underline sm:text-left">View</Link>
        </div>
      </div>
    </>
  );
}