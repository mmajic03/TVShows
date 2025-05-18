import ShowDetails from "@/app/components/ShowDetails";
import Image from "next/image";

export async function generateMetadata({ params }) {
  const { id } = await params;

  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  if (!res.ok) {
    return { title: "Show not found" };
  }
  const data = await res.json();

  return {
    title: `TVShow | ${data.name}`,
    description: `${data.name} - ${data.summary}`,
    openGraph: {
      images: [{ url: data.image?.original || "", width: 600, height: 800 }],
    },
  };
}

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
                        width={400} 
                        height={600}
                        priority
                        className="object-contain rounded-xl"
                    />
                </div>
                <ShowDetails show={show} episodes={episodes} />
            </div>
        </div>
    );
}
