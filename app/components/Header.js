//Header komponenta prikazuje navigaciju na vrhu stranice.
//Dinamički označava aktivnu stranicu i prilagođava se veličini ekrana(desktop/mobilna verzija).
"use client"
import Link from "next/link";
import { useState } from "react";
import { Menu, X} from 'lucide-react';
import { usePathname, useRouter } from "next/navigation";
import useAuthSession from "../lib/useAuthSession";
import { supabase } from "../lib/supabaseClient";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuthSession();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }
  //Uzima se prvo slovo emaila korisnika i pretvara ga u veliko slovo koje se prikazuje u krugu
  const initial = user?.email?.[0]?.toUpperCase() || "";
  
  return (
    <div className="flex justify-between items-center relative bg-[#ffffff8] p-7 shadow-md">
      <p className="text-black text-4xl"><strong className="text-red-600">Show</strong>Time</p>
      {/*navigacija za veće ekrane*/}
      <nav className="hidden md:flex space-x-8 items-center">
        <Link href={"/"} className={pathname === "/" ? "text-red-600" : "text-black"}>HOME</Link>
        <Link href={"/favorite"} className={pathname === "/favorite" ? "text-red-600" : "text-black"}>FAVORITES</Link>
        {!user && (
          <>
            <Link href={"/auth/login"} className={pathname === "/auth/login" ? "text-red-600" : "text-black"}>SIGN IN</Link>
          </>
        )}
        {user && (
          <div className="relative">
            <div
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center cursor-pointer select-none"
            >
              {initial}
            </div>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border shadow-lg rounded-lg p-3 flex flex-col text-sm">
                <span className="text-gray-700 truncate">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="mt-2 text-gray-700 text-left cursor-pointer"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
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
          {!user && (
            <>
              <Link href="/auth/login" className="text-black py-2" onClick={() => setMenuOpen(false)}>LOGIN</Link>
              <Link href="/auth/register" className="text-black py-2" onClick={() => setMenuOpen(false)}>REGISTER</Link>
            </>
          )}
          {user && (
            <div className="relative w-full flex justify-center">
              <div
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center cursor-pointer select-none"
              >
                {initial}
              </div>

              {userMenuOpen && (
                <div className="absolute top-12 w-48 bg-white border shadow-lg rounded-lg p-3 flex flex-col text-sm">
                  <span className="text-gray-700 truncate">{user.email}</span>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                      setUserMenuOpen(false);
                    }}
                    className="mt-2 text-gray-700 text-left cursor-pointer"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      )}
    </div>
  );
}
