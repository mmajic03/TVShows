//Header komponenta prikazuje navigaciju na vrhu stranice.
//Dinamički označava aktivnu stranicu i prilagođava se veličini ekrana(desktop/mobilna verzija).
"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X} from 'lucide-react';
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="flex justify-between items-center relative bg-[#ffffff8] p-7 shadow-md">
      <p className="text-black text-4xl"><strong className="text-red-600">Show</strong>Time</p>
      {/*navigacija za veće ekrane*/}
      <nav className="hidden md:flex space-x-8 items-center">
        <Link href={"/"} className={pathname === "/" ? "text-red-600" : "text-black"}>HOME</Link>
        <Link href={"/favorite"} className={pathname === "/favorite" ? "text-red-600" : "text-black"}>FAVORITES</Link>
        {status === "loading" ? (
          <span className="text-gray-500">Učitavanje...</span>
        ) : session ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {session.user?.image && (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  width={40}
                  height={40}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <span className="text-sm text-gray-700">{session.user?.name || session.user?.email}</span>
            </div>
            <button
              onClick={handleSignOut}
              className="text-sm text-gray-700 hover:text-red-600 transition-colors"
            >
              SIGN OUT
            </button>
          </div>
        ) : (
          <Link href={"/signin"} className="text-black hover:text-red-600 transition-colors">
            SIGN IN
          </Link>
        )}
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
          {status === "loading" ? (
            <span className="text-gray-500 py-2">Učitavanje...</span>
          ) : session ? (
            <>
              <div className="flex items-center gap-2 py-2">
                {session.user?.image && (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    width={40}
                    height={40}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span className="text-sm text-gray-700">{session.user?.name || session.user?.email}</span>
              </div>
              <button
                onClick={() => {
                  handleSignOut();
                  setMenuOpen(false);
                }}
                className="text-sm text-gray-700 hover:text-red-600 transition-colors py-2"
              >
                SIGN OUT
              </button>
            </>
          ) : (
            <Link href={"/signin"} className="text-black py-2" onClick={() => setMenuOpen(false)}>
              SIGN IN
            </Link>
          )}
        </nav>
      )}
    </div>
  );
}
