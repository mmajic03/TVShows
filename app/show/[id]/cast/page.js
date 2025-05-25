//Komponenta dohvaća i prikazuje glumce serije čiji se ID nalazi u URL-u.
//Parametar 'params' sadrži dinamičke dijelove rute (npr. id serije) koji dolaze iz URL-a,
//što omogućuje dohvat odgovarajućih podataka o glumcima s API-ja i prikaz njihovih kartica.
import CastCard from "@/app/components/CastCard";

export default async function Cast({ params }) {
    //params je objekt koji Next.js prosljeđuje komponenti i sadrži parove ključ-vrijednost
    //koji predstavljaju dinamičke dijelove URL-a (npr. u /show/1 params će biti {id: "1"})
    const { id } = await params;

    const res = await fetch(`https://api.tvmaze.com/shows/${id}/cast`);
    if (!res.ok) 
        throw new Error("Cast not found");

    const cast = await res.json();
    if(cast.length === 0 )
        throw new Error("No cast data available");

    return (
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6">
            <div className="mb-4 text-gray-600">{cast.length} results</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {cast.map((actor) => (
                    //kartica koja prikazuje pojedinog glumca
                    <CastCard key={actor.character.id} cast={actor} />
                ))}
            </div>
        </div>
    );
}
