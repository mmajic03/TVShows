"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function FavoritesLayout({ children}) {
    const pathname = usePathname();

    return (
        <div className="flex flex-col mt-10 px-6 md:px-16">
            <div className="w-full max-w-[1600px] mx-auto">
                <nav className="flex justify-start space-x-8 border-b border-gray-300 text-xl font-bold">
                    <Link href={`/favorite`} className={`pb-4 hover:border-b-4 hover:border-red-600 ${pathname === `/favorite` ? "border-b-4 border-red-600" : ""}`}>Shows</Link>
                    <Link href={`/favorite/favoriteEpisodes`} className={`pb-4 hover:border-b-4 hover:border-red-600 ${pathname === `/favorite/favoriteEpisodes` ? "border-b-4 border-red-600" : ""}`}>Episodes</Link>
                </nav>
            </div>
            <main className="flex-grow mt-8">{children}</main>
        </div>
    );
}