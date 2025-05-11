import CastCard from "@/app/components/CastCard";

export default async function Cast({ params }) {
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
                    <CastCard key={actor.character.id} cast={actor} />
                ))}
            </div>
        </div>
    );
}
