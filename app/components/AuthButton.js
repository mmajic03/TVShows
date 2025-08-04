//Ova komponenta prikazuje 'SIGN IN' ili 'SIGN OUT' zavisno o statusu korisnika
"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButton() {
  //useSession - provjerava je li korisnik prijavljen i vraća informacije o njegovoj sesiji
  const { data: session } = useSession();

  if (session?.user?.email) {
    return <button onClick={() => signOut()}>SIGN OUT</button>
  }
    return <button onClick={() => signIn()}>SIGN IN</button>
}
