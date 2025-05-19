import CrewCard from "@/app/components/CrewCard";
//prikaz produkcijskog tima pojedine serije
export default async function CrewPage({ params }) {
    const { id } = await params;

    const res = await fetch(`https://api.tvmaze.com/shows/${id}/crew`);
    if (!res.ok) 
        throw new Error("Crew not found");

    const crew = await res.json();

    if(crew.length === 0 )
        throw new Error("No crew data available");

    return (
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6">
            <div className="mb-4 text-gray-600">{crew.length} results</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {crew.map((member, index) => (
                    //kartica koja prikazuje informacije osobe
                    <CrewCard key={index} crew={member} />
                ))}
            </div>
        </div>
    );
}
