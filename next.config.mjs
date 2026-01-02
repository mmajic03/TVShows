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
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
    //Ovo govori tražilicama da mogu pronaći i prikazati sve stranice ove web stranice.
    async headers() {
      return [
        {
          //Ovo znači da vrijedi za sve stranice
          source: '/(.*)',
          headers: [
            {
              //Ovo je ime zaglavlja koje šaljemo
              key: 'X-Robots-Tag',
              //Ova vrijednost govori tražilicama da smiju pronaći i prikazati naše stranice u rezultatima pretraživanja
              value: 'index, follow', 
            },
          ],
        },
      ];
  },
};

export default nextConfig;
