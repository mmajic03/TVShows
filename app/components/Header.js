//Header komponenta prikazuje navigaciju na vrhu stranice.
//Dinamički označava aktivnu stranicu i prilagođava se veličini ekrana(desktop/mobilna verzija).
"use client"
import Link from "next/link";
import { useState } from "react";
import { Menu, X} from 'lucide-react';
import { usePathname } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  
  return (
    <div className="flex justify-between items-center relative bg-[#ffffff8] p-7 shadow-md">
      <p className="text-black text-4xl"><strong className="text-red-600">Show</strong>Time</p>
      {/*navigacija za veće ekrane*/}
      <nav className="hidden md:flex space-x-8 items-center">
        <Link href={"/"} className={pathname === "/" ? "text-red-600" : "text-black"}>HOME</Link>
        <Link href={"/favorite"} className={pathname === "/favorite" ? "text-red-600" : "text-black"}>FAVORITES</Link>
      </nav>
      <button 
        onClick={() => setMenuOpen(!menuOpen)} 
        className="md:hidden text-3xl" >{menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
      </button>
    {/*mobilna navigacija*/}
      {menuOpen && (
        <nav className="md:hidden flex flex-col items-center w-full absolute bg-white border-t pb-4 top-20 left-0 z-50">
          <Link href="/" className="text-black py-2" onClick={() => setMenuOpen(false)}>HOME</Link>
          <Link href="/favorite" className="text-black py-2" onClick={() => setMenuOpen(false)}>FAVORITES</Link>
        </nav>
      )}
    </div>
  );
}
