import Link from "next/link";
export default async function FavoritesLayout({ children, params }) {
    const { id } = await params;

    return (
        <div className="flex flex-col mt-10 px-6 md:px-16">
            <div className="w-full max-w-[1600px] mx-auto">
                <h1 className="text-3xl font-bold mb-4 border-b border-gray-300">Favorite Shows</h1>
            </div>
            <main className="flex-grow mt-8">{children}</main>
        </div>
    );
}