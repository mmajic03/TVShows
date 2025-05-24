//Footer prikazuje donji dio stranice s linkovima na glavne dijelove stranice, društvene mreže i ostale informacije.
import Link from "next/link";
import { CopyrightIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white/70 py-16 pb-6 px-8 mt-16 shadow-md border-t border-gray-300">
        <div className="grid grid-cols-1 max-w-6xl mx-auto md:grid-cols-4 gap-8 text-center md:text-left justify-items-center md:justify-items-start">
            <div>
                <div className="text-5xl mb-2 text-black">
                    <strong className="text-red-600">Show</strong>Time
                    <p className="text-sm text-gray-700">Discover the top series you simply can&apos;t miss.</p>
                </div>
            </div>
            <div className="text-black lg:pl-10">
                <h3 className="text-lg font-semibold mb-1">Sitemap</h3>
                <ul className="text-sm space-y-1">
                    <li className="mb-3">Explore our site</li>
                    <li><Link href={"/"}>Home</Link></li>
                    <li><Link href={"/favorite"}>Favorites</Link></li>
                </ul>
            </div>
            <div className="text-black lg:pl-10">
                <h3 className="text-lg font-semibold mb-4">Info</h3>
                <ul className="text-sm space-y-1">
                    <li><Link href={"/"}>Terms of Use</Link></li>
                    <li><Link href={"/"}>Privacy Policy</Link></li>
                    <li><Link href={"/"}>Terms of Service</Link></li>
                    <li><Link href={"/"}>Cookies Settings</Link></li>
                </ul>
            </div>
            <div className="text-black lg:pl-10">
                <h3 className="text-lg font-semibold mb-4">Follow us</h3>
                <ul className="text-sm space-y-1">
                    <li><Link href={"/"}>Instagram</Link></li>
                    <li><Link href={"/"}>TikTok</Link></li>
                    <li><Link href={"/"}>YouTube</Link></li>
                </ul>
            </div>
        </div>
        <div className="pt-20">
            <hr className="w-[90%] mx-auto border-t border-gray-300"/>
            <p className="text-black text-center text-sm mt-1">
                <CopyrightIcon className="w-3 h-3 inline-block" /> 2025 ShowTime. All rights reserved.
            </p>
        </div>
    </footer>
  );
}
