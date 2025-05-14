import Link from "next/link";
export default async function FavoritesLayout({ children, params }) {
    const { id } = await params;

    return (
        <div className="flex flex-col mt-10 px-6 md:px-16">
            <div className="w-full max-w-[1600px] mx-auto">
                <nav className="flex justify-start space-x-8 border-b border-gray-300 text-xl font-bold">
                    <Link href={`/${id}`} className="pb-4 text-gray-800 hover:text-black hover:border-b-4 hover:border-red-600">Shows</Link>
                    <Link href={`/`} className="pb-4 text-gray-800 hover:text-black hover:border-b-4 hover:border-red-600">Episodes</Link>
                    <Link href={`/`} className="pb-4 text-gray-800 hover:text-black hover:border-b-4 hover:border-red-600">Cast</Link>
                </nav>
            </div>
            <main className="flex-grow mt-8">{children}</main>
        </div>
    );
}