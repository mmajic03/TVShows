import { getServerSession } from "next-auth/next";//Provjerava je li korisnik prijavljen(na serveru) i vraća podatke o njemu
import { authOptions } from "@/lib/auth";
import { createClient } from "@supabase/supabase-js";

//kreira se klijent koji direktno komunicira s bazom
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
//Dohvati favorite prijavljenog korisnika iz baze i vrati ih kao JSON
//Ako korisnik nije prijavljen, vrati grešku 401
//Ako dođe do greške u bazi, vrati grešku 500
export async function GET(request) {
    //dohvaca trenutnu sesiju korisnika
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    //iz tablice 'favorites' gleda se stupac 'show_id'
    //filtriraju se samo oni redovi gdje je 'user_id' jednak ID-u prijavljenog korisnika session.user.id
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

    //ubacuje novi zapis u tablicu 'favorites'
    //dodaje vezu između korisnika(user_id: session.user.id) i omiljene serije(show_id: body.id)
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

    //brise zapis iz 'favorites' tablice
    //brise redak gdje je user_id jednak ID-u prijavljenog korisnika i show_id jednak ID-u serije koju zelimo obrisati
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