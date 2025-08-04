//NextAuth je sustav za autentifikaciju u Next.js aplikacijama.
//OAuth je sigurni standard za prijavu korisnika preko vanjskih servisa(npr.GitHub).
//Umjesto da korisnik unosi email i lozinku, koristi se GitHub prijava kojom se dohvaćaju podaci korisnika.
//https://next-auth.js.org/getting-started/example
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

//Postavlja se provider za prijavu korisnika, u ovom slučaju preko GitHub-a
export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
};

//Handler prati i obrađuje zahteve za prijavu i odjavu korisnika
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
