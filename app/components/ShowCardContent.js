//Komponenta prikazuje sažetak serije u obliku kartice na početnoj stranici uključujući sliku, naziv, datum premijere, žanrove, ocjenu i trajanje
// te omogućuje navigaciju do detaljne stranice serije.
import Image from "next/image";
import Link from "next/link";
import { Clock, Star } from "lucide-react";
export default function ShowCardContent({ show, priority = false }) {
  return (
    <>
      <Link href={`/show/${show.id}`}>
        <Image 
          src={show.image?.medium || "/placeholder.png"} 
          alt={show.name} 
          width={400} 
          height={600}
          className="rounded-xl object-contain"
          //priority je prop koji odmah učita sliku jer je važna za prikaz stranice. Ovdje priority postavljamo samo na prvu sliku.
          priority={priority}
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
        </div>
      </Link>
    </>
  );
}