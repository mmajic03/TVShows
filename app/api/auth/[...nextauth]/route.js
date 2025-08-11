//NextAuth je sustav za autentifikaciju u Next.js aplikacijama.
//OAuth je sigurni standard za prijavu korisnika preko vanjskih servisa(npr.GitHub).
//Umjesto da korisnik unosi email i lozinku, koristi se GitHub prijava kojom se dohvaćaju podaci korisnika.
//https://next-auth.js.org/getting-started/example
//https://dev.to/priyanshuverma/lets-integrate-authjs-with-supabase-mf7
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

//Handler prati i obrađuje zahteve za prijavu i odjavu korisnika
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
