import FavoriteEpisodeCard from "@/app/components/FavoriteEpisodesCard";

export default async function FavoriteEpisodesPage() {
  //dohvaća spremljene favorite
  const res = await fetch("/api/favoriteEpisodes", {
    cache: "no-store", 
  });

  if (!res.ok) {
    return <div className="p-4 text-red-600">Error fetching favorites</div>
  }

  const { favoriteEpisodes } = await res.json();

  if (!favoriteEpisodes || favoriteEpisodes.length === 0) {
    return (
      <div className="flex items-center justify-center mt-[100px]">
        <div className="p-4 text-2xl text-gray-600">No saved episodes</div>
      </div>
    );
  }

  //dohvaća podatke o svakoj epizodi
  const episodes = await Promise.all(
    favoriteEpisodes.map(async (id) => {
      const res = await fetch(`https://api.tvmaze.com/episodes/${id}`);
      if (!res.ok) return null;
      return res.json();
    })
  );


  return (
    <div className="p-4">
      <div className="w-full max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {episodes.map((episode) => (
            <FavoriteEpisodeCard key={episode.id} episode={episode} />
          ))}
        </div>
      </div>
    </div>
  );
}
