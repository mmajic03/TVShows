import Navigation from "@/app/components/Navigation";
export default async function ShowLayout({ children, params }) {
    const { id } = await params;

    return (
        <div className="flex flex-col mt-10 px-6 md:px-16">
            <div className="w-full max-w-[1600px] mx-auto">
                <Navigation id={id}/>
            </div>
            <main className="flex-grow mt-8">{children}</main>
        </div>
    );
}