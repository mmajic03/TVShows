import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BackButton from "./components/BackButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ShowTime",
  description: "Find and explore popular TV shows with ShowTime.",
  keywords: ["TV Shows", "Next.js", "React", "Series"],
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
