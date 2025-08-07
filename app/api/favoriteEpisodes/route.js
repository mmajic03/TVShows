import { getServerSession } from "next-auth/next";//Provjerava je li korisnik prijavljen(na serveru) i vraća podatke o njemu
import { authOptions } from "@/lib/auth";
import { createClient } from "@supabase/supabase-js";

//kreira se klijent koji direktno komunicira s bazom
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

//Dohvati favorite prijavljenog korisnika iz baze i vrati ih kao JSON
export async function GET() {
  //dohvaca trenutnu sesiju korisnika
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  //iz tablice 'favorite_episodes' gleda se stupac 'episode_id'
  //filtriraju se samo oni redovi gdje je 'user_id' jednak ID-u prijavljenog korisnika session.user.id
  const { data, error } = await supabase
    .from("favorite_episodes")
    .select("episode_id")
    .eq("user_id", session.user.id);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  const favoriteEpisodes = data.map(item => item.episode_id);

  return new Response(JSON.stringify({ favoriteEpisodes }), { status: 200 });
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const body = await request.json();

  if (!body?.id) {
    return new Response(JSON.stringify({ error: "id missing" }), { status: 400 });
  }

  //ubacuje novi zapis u tablicu 'favorite_episodes'
  //dodaje vezu između korisnika(user_id: session.user.id) i omiljene epizode(episode_id: body.id)
  const { data, error } = await supabase.from("favorite_episodes").insert({
    user_id: session.user.id,
    episode_id: body.id,
  });

  if (error) {
    console.error("Supabase insert error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}

export async function DELETE(request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const body = await request.json();
  if (!body?.id) {
    return new Response(JSON.stringify({ error: "id missing" }), { status: 400 });
  }

  //brise zapis iz 'favorite_episodes' tablice
  //brise redak gdje je user_id jednak ID-u prijavljenog korisnika i episode_id jednak ID-u epizode koju zelimo obrisati
  const { error } = await supabase
    .from("favorite_episodes")
    .delete()
    .eq("user_id", session.user.id)
    .eq("episode_id", body.id);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
