import EpisodeCard from "@/app/components/EpisodeCard";

//prikazuju se epizode određene serije
export default async function Episodes({ params }) {
    const { id } = await params;

    //dohvaćanje epizoda i omiljenih epizoda
    const [episodesRes, favRes] = await Promise.all([
        fetch(`https://api.tvmaze.com/shows/${id}/episodes`),
        fetch("http://localhost:3000/api/favoriteEpisodes", { cache: "no-store" })
    ]);

    if (!episodesRes.ok) 
        throw new Error("Episode not found");
    if (!favRes.ok) 
        throw new Error("Error fetching favorites");

    const episodes = await episodesRes.json();
    const { favoriteEpisodes } = await favRes.json(); 

    return (
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6">
            <div className="mb-4 text-gray-600">{episodes.length} results</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {episodes.map((episode) => (
                    //kartica koja prikazuje jednu epizodu
                    //isFavorite označava je li neka serija u favoritima
                    <EpisodeCard key={episode.id} episode={episode} isFavorite={favoriteEpisodes.includes(episode.id)} />
                ))}
            </div>
        </div>
    );
}
