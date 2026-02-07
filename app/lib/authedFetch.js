//Služi za slanje zahtjeva prema serveru tako da server zna koji je korisnik poslao zahtjev
"use client";
import { supabase } from "./supabaseClient";

export async function authedFetch(url, options = {}) {
  //Dohvati trenutno prijavljenu sesiju
  const { data } = await supabase.auth.getSession();
  const token = data?.session?.access_token;

  const headers = {
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch(url, {
    ...options,
    headers,
  });
}
