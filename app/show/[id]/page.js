import ShowDetails from "@/app/components/ShowDetails";
import Image from "next/image";

export default async function Show({ params }) {
    const { id } = await params;

    const [showRes, episodesRes] = await Promise.all([
        fetch(`https://api.tvmaze.com/shows/${id}`),
        fetch(`https://api.tvmaze.com/shows/${id}/episodes`)
    ]);
    if (!showRes.ok) {
        throw new Error("Show not found");
    }
    const show = await showRes.json();

    if (!episodesRes.ok) {
        throw new Error("Episodes not found");
    }
    const episodes = await episodesRes.json();

    return (
        <div className="flex flex-col justify-start w-full bg-white/80 ">
            <div className="flex flex-col md:flex-row w-full md:-mt-4 lg:gap-x-6">
                <div className="flex justify-center w-full md:w-1/2">
                    <Image 
                        src={show.image.original} 
                        alt={show.name} 
                        width={700} 
                        height={600}
                        className="w-full max-w-[500px] md:max-w-[700px] h-auto max-h-[600px] object-contain rounded-xl border-none"
                    />
                </div>
                <ShowDetails show={show} episodes={episodes} />
            </div>
        </div>
    );
}
