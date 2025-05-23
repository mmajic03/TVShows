//Komponenta dohvaća i prikazuje epizode serije čiji se ID nalazi u URL-u. Parametar 'params' sadrži.
//dinamičke dijelove rute(npr. id serije) koji dolaze iz URL-a što omogučuje dohvat odgovarajućih
//epizoda s API-ja i prikaz njihovih kartica
import EpisodeCard from "@/app/components/EpisodeCard";
export default async function Episodes({ params }) {
    //params je objekt koji Next.js prosljeđuje komponenti i sadrđi parove ključ vrijednost koji predstavljaju
    //dinamičke dijelove URL-a(npr. u /show/1 params će biti {id: "1"})
    const { id } = await params;

    const episodesRes = await fetch(`https://api.tvmaze.com/shows/${id}/episodes`);

    if (!episodesRes.ok) {
        throw new Error("Episode not found");
    }

    const episodes = await episodesRes.json();

    return (
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6">
            <div className="mb-4 text-gray-600">{episodes.length} results</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {episodes.map((episode) => (
                    //kartica koja prikazuje jednu epizodu
                    <EpisodeCard key={episode.id} episode={episode} />
                ))}
            </div>
        </div>
    );
}
