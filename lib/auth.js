import GithubProvider from "next-auth/providers/github";
import { SupabaseAdapter } from "@auth/supabase-adapter";

export const authOptions = {
  //povezuje NextAuth sa Supabase bazom podataka
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY,
  }),
  //Postavlja se provider za prijavu korisnika, u ovom slučaju preko GitHub-a
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        //URL koji vodi do GitHub-ove OAuth stranice za pprijavu
        url: "https://github.com/login/oauth/authorize",
        //Iako je korisnik vec prijavljen na GitHub u nekom browseru, GitHub i dalje trazi ponovnu prijavu
        params: { prompt: "login" },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  //Uzima se ID prijavljenog korisnika iz baze i dodaje ga u sesiju kako bi znali
  //koji je korisnik prijavljen i mogli prikazati samo njegove favorite
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
};
