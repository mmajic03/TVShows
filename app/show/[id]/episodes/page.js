import EpisodeCard from "@/app/components/EpisodeCard";

//prikazuju se epizode određene serije
export default async function Episodes({ params }) {
    const { id } = await params;

    //dohvaćanje epizoda
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
