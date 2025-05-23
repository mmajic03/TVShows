//Navigacija za pojedinu seriju. Prima ID serije i kroz navigaciju se može odabrati 'Overview', 'Episodes', 'Cast' i 'Crew' za seriju s tim ID-om.
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation({ id }) {
    //usePathname - react hook koji omogućava dohvat i praćenje trenutnog URL-a na kojoj se korisnik nalazi
    //Kada korisnik navigira po stranici(npr. klikne na 'Episodes' ili 'Cast')URL se mijenja, a stranica se ne refresha jer Next.js koristi client-side routing.
    //Pathname se koristi kako bi vizualno označili aktivnu sekciju gdje se korisnik nalazi tako što se doda border crvene boje ispod aktivne sekcije.
    //usePathname prati URL i vraća string(npr. /show/1/episodes)
    const pathname = usePathname();
    return (
        <nav className="flex justify-start space-x-8 border-b border-gray-300 text-xl font-bold">
            <Link href={`/show/${id}`} className={`pb-4 hover:border-b-4 hover:border-red-600 ${pathname === `/show/${id}` ? "border-b-4 border-red-600" : ""}`}>Overview</Link>
            <Link href={`/show/${id}/episodes`} className={`pb-4 hover:border-b-4 hover:border-red-600 ${pathname === `/show/${id}/episodes` ? "border-b-4 border-red-600" : ""}`}>Episodes</Link>
            <Link href={`/show/${id}/cast`} className={`pb-4 hover:border-b-4 hover:border-red-600 ${pathname === `/show/${id}/cast` ? "border-b-4 border-red-600" : ""}`}>Cast</Link>
            <Link href={`/show/${id}/crew`} className={`pb-4  hover:border-b-4 hover:border-red-600 ${pathname === `/show/${id}/crew` ? "border-b-4 border-red-600" : ""}`}>Crew</Link>
        </nav>
    );
}
