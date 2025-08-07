import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
//GET vraća favorite kao JSON. 
//Ova metoda se koristi za prikaz favorita na klijentu.
//Nema cache logike jer se favoriti mogu često mijenjati i želimo uvijek najnovije stanje.
export async function GET(request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const { data, error } = await supabase
        .from("favorites")
        .select("show_id")
        .eq("user_id", session.user.id);
    
    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    const favorites = data.map((item) => item.show_id);

    return new Response(JSON.stringify({ favorites }), { status: 200 });
}

//POST prima JSON objekt s ID-em koji treba dodati u favorite. Provjeravamo je li ID prisutan, a sa favorites.includes
//spriječava dodavanje duplikata u favorite.
export async function POST(request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    const body = await request.json(); 
    if (!body?.id) { 
        return Response.json({ error: "id missing" }, { status: 400 });
    }

    const { error } = await supabase.from("favorites").insert({
        user_id: session.user.id,
        show_id: body.id,
    });

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
}

//DELETE prima JSON objekt s ID-em koji treba ukloniti iz favorita.
//Koristi se filter za uklanjanje svih pojavljivanja danog ID-a iz niza.
export async function DELETE(request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    //prima zahtjev za uklanjanje favorita
    const body = await request.json(); 
    if (!body?.id) {
        return Response.json({ error: "id missing" }, { status: 400 });
    }

    const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", session.user.id)
        .eq("show_id", body.id);

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
}