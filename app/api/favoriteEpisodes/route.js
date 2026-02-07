import { createClient } from "@supabase/supabase-js";

//Supabase client - veza imeđu apliakcije i Supabase baze
//Svaki put kada API komunicira sa Supabaseom, salje token za korisnika da Supabase vidi tko je taj korisnik
function getSupabaseClient(token) {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }
  );
}

function getToken(request) {
  return request.headers.get("Authorization")?.replace("Bearer ", "");
}

//GET metoda dohvaća listu favorita prijavljenog korisnika
export async function GET(request) {
    //Kada korisnik šalje zahtjev, taj zahtjev treba imati informaciju
    //tko je korisnik, a ta informacija dolazi u obliku tokena.
  const token = getToken(request);
    if (!token)
        return Response.json({ favoriteEpisodes: [] }
    );

//Povezuje aplikaciju s bazom
  const supabase = getSupabaseClient(token);
  const { data: { user } } = await supabase.auth.getUser(token);
    if (!user)
        return Response.json({ favoriteEpisodes: [] }
    );

//Dohvat omiljenih epizoda iz baze
  const { data, error } = await supabase
    .from("favorite_episodes")
    .select("episode_id")
    .eq("user_id", user.id);

    if (error)
        return Response.json({ error: error.message });

  const favoriteEpisodes = (data || []).map((row) => row.episode_id);
  return Response.json({ favoriteEpisodes });
}

//POST metoda dodaje epizodu u tablicu favorita
export async function POST(request) {
  const token = getToken(request);
    if (!token)
        return Response.json({ error: "unauthorized" });

  const body = await request.json();
    if (!body?.id)
        return Response.json({ error: "id missing" });

  const supabase = getSupabaseClient(token);
  const { data: { user } } = await supabase.auth.getUser(token);
    if (!user)
        return Response.json({ error: "unauthorized" });

  const { error } = await supabase
    .from("favorite_episodes")
    .upsert(
      { user_id: user.id, episode_id: body.id },
      { onConflict: "user_id,episode_id" }
    );

    if (error)
        return Response.json({ error: error.message });

  return Response.json({ ok: true });
}

//DELETE metoda briše epizodu iz favorita
export async function DELETE(request) {
  const token = getToken(request);
    if (!token)
        return Response.json({ error: "unauthorized" });

  const body = await request.json();
    if (!body?.id)
        return Response.json({ error: "id missing" });

  const supabase = getSupabaseClient(token);
  const { data: { user } } = await supabase.auth.getUser(token);
    if (!user)
        return Response.json({ error: "unauthorized" });

  const { error } = await supabase
    .from("favorite_episodes")
    .delete()
    .eq("user_id", user.id)
    .eq("episode_id", body.id);

    if (error)
        return Response.json({ error: error.message });

  return Response.json({ ok: true });
}
