//RootLayout je osnovni layout za sve stranice aplikacije u kojem su definirani zajednički elementi(header, footer, font, metapodaci, back button).
//Time je osigurana konzistentnost izgleda i ponašanja cijele stranice.
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BackButton from "./components/BackButton";

//Inicijalizacija fontova. Odabrani su Geist Sans(za osnovni tekst npr. naslovi, paragrafi...) i Geist Mono(za dijelove s kodom, brojevima i nekih tehničkih podataka kao npr. API odgovora i sl.)
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

//Metapodaci poboljšavaju SEO
export const metadata = {
  //prikazuje se kao naslov taba
  title: "ShowTime",
  //kratki opis koji se može prikazati u rezultatima tražilica
  description: "Find and explore popular TV shows with ShowTime.",
  //koriste ih tražilice za određivanje o čemu stranica govori
  keywords: ["TV Shows", "Next.js", "React", "Series"],
  //ikona prikazana u tabu
  icons: {
    icon: "/favicon.ico",
  },
  authors: [{ name: "Monika Majić" }],
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Header/>
        <div className="flex justify-start w-full mt-4 pl-4">
          <BackButton />
        </div>
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
