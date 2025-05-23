//Konfiguracija Next.js za omogućavanje učitavanja slika s vanjskog izvora.
//Kroz opciju 'images.remotePatterns' dopuštamo učitavanje slika s domena koje nisu
//lokalne tj. u ovom slučaju s static.tvmaze.com
//Ovo je važno jer Next.js po defaultu blokira slike s nepoznatih domena radi sigurnosti.
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.tvmaze.com',
      },
    ],
  },
};

export default nextConfig;
