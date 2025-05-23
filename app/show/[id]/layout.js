//Ova komponenta predstavlja layout koji se koristi za sve stranice unutar dinamičke rute /show/[id].
import Navigation from "@/app/components/Navigation";

export default async function ShowLayout({ children, params }) {
    const { id } = await params;

    return (
        <div className="flex flex-col mt-10 px-6 md:px-16">
            <div className="w-full max-w-[1600px] mx-auto">.
                <Navigation id={id}/>
            </div>
            {/*prikazuje sve podstranice(komponente) koje pripadaju ovom layoutu.
            Next.js automatski ubacuje odgovarajući sadržaj u children na temelju hijerarhije datoteka u app direktoriju*/}
            <main className="flex-grow mt-8">{children}</main>
        </div>
    );
}