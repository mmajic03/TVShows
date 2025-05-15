import FavoriteShowCard from "../components/FavoriteShowCard";
export default async function FavoritesPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/favorites`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <div className="p-4 text-red-600">Error fetching favorites</div>;
  }

  const { favorites } = await res.json();

  if (favorites.length === 0) {
     return (
        <div className="flex items-center justify-center mt-[100px]">
            <div className="p-4 text-4xl text-black">No saved shows.</div>
        </div>
    );
  }

  const shows = await Promise.all(
    favorites.map(async (id) => {
      const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
      if (!res.ok) return null;
      return res.json();
    })
  );

  return (
    <div className="p-4">
      <div className="w-full max-w-[1600px] mx-auto">
        <h1 className="text-2xl font-bold mb-4">Favorites</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {shows.map((show) => (
            <FavoriteShowCard key={show.id} show={show} />
            ))}
        </div>
      </div>
    </div>
  );
}
