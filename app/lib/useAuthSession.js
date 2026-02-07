//Prati stanje autentikacije korisnika
"use client";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

export default function useAuthSession() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    //Provjerava tko je trenutno ulogiran u aplikaciju
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    //'Sluša' promjene u autentikaciji tj. aplikacija će biti obavještena 
    //svaki put kada se dogodi nešto s prijavom korisnika
    const { subscription } = supabase.auth.onAuthStateChange((_event, nextSession) =>
      //ako se korisnik odjavio nextSession je null, a ako se prijavio nextSession sadrži
      //podatke o korisniku i token
      setSession(nextSession)
    );

    return () => subscription?.unsubscribe?.();
  }, []);

  return { session, user: session?.user ?? null, loading: session === null };
}
