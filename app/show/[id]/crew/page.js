//Komponenta dohvaća i prikazuje članove produkcijskog tima serije (crew)
//čiji se ID nalazi u URL-u. Parametar 'params' sadrži dinamičke dijelove rute
//(npr. id serije) koji omogućuju dohvat odgovarajućih podataka s API-ja.
import CrewCard from "@/app/components/CrewCard";
export default async function CrewPage({ params }) {
    // params je objekt koji Next.js prosljeđuje komponenti i sadrži parove ključ-vrijednost
    // koji predstavljaju dinamičke dijelove URL-a (npr. u /show/1/crew, params će biti { id: "1" }).
    const { id } = await params;

    const res = await fetch(`https://api.tvmaze.com/shows/${id}/crew`);
    if (!res.ok) 
        throw new Error("Crew not found");

    const crew = await res.json();

    // Ako nema podataka o produkcijskom timu, ispisiva se poruka o grešci
    if(crew.length === 0 )
        throw new Error("No crew data available");

    return (
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6">
            <div className="mb-4 text-gray-600">{crew.length} results</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {crew.map((member, index) => (
                    //Kartica koja prikazuje jednog člana produkcijskog tima
                    <CrewCard key={index} crew={member} />
                ))}
            </div>
        </div>
    );
}
