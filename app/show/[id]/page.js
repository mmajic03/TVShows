//Komponenta za prikaz informacija o pojedinoj TV seriji.
//Korištenjem dinamičkog parametra 'id' dohvaća se odgovarajući sadržaj sa servera TVMaze API-ja.
import ShowDetails from "@/app/components/ShowDetails";
import Image from "next/image";

//Generiraju se metapodaci za svaku pojedinu seriju.
export async function generateMetadata({ params }) {
  const { id } = await params;

  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  if (!res.ok) {
    return { title: "Show not found" };
  }
  const data = await res.json();

  return {
    title: `TVShow | ${data.name}`,
    description: `${data.name} - ${data.summary}`,
    openGraph: {
        //Open Graph slika za prikaz prilikom dijeljenja linka na društvenim mrežama.
      images: [{ url: data.image?.original || "", width: 600, height: 800 }],
    },
  };
}

export default async function Show({ params }) {
  const { id } = await params;
    
  //Dohvaćaju se  podaci o seriji i njezinim epizodama u jednom API pozivu koristeći ?embed=episodes, 
  //a zatim se iz odgovora izdvaja serija i popis epizoda iz show._embedded.episodes.
  //embed se koristi za dobivanje povezanih podataka
  const res = await fetch(`https://api.tvmaze.com/shows/${id}?embed=episodes`);
  if (!res.ok) throw new Error("Show not found");
  const show = await res.json();
  const episodes = show._embedded?.episodes || [];

  return (
    <div className="flex flex-col justify-start w-full bg-white/80 ">
      <div className="flex flex-col md:flex-row w-full md:-mt-4 lg:gap-x-6">
        {/*Ova slika je važna za početni prikaz stranice tj. korisnik je vidi čim je stranica učitana i zauzima veći dio stranice 
        pa se stavlja 'priority' kako bi se slika učitala što je prije moguće.*/}
          <div className="flex justify-center w-full md:w-1/2">
            <Image 
              src={show.image.original || "/placeholder.png"} 
              alt={show.name || "TVShow"} 
              width={400} 
              height={600}
              priority
              className="object-contain rounded-xl"
            />
          </div>
          {/*Komponenta za prikaz detalja epizode(ocjena, vrijeme trajanja, žanr itd.) */}
          <ShowDetails show={show} episodes={episodes}/>
      </div>
    </div>
  );
}
