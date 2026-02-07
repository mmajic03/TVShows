import { createClient } from "@supabase/supabase-js";

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

export async function GET(request) {
  const token = getToken(request);
    if (!token)
        return Response.json({ favorites: [] });

  const supabase = getSupabaseClient(token);
  const { data: { user } } = await supabase.auth.getUser(token);
    if (!user)
        return Response.json({ favorites: [] });

  const { data, error } = await supabase
    .from("favorite_shows")
    .select("show_id")
    .eq("user_id", user.id);

    if (error)
        return Response.json({ error: error.message });

  const favorites = (data || []).map((row) => row.show_id);
  return Response.json({ favorites });
}


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
    .from("favorite_shows")
    .upsert({ user_id: user.id, show_id: body.id }, { onConflict: "user_id,show_id" });

    if (error)
        return Response.json({ error: error.message });

  return Response.json({ ok: true });
}


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
    .from("favorite_shows")
    .delete()
    .eq("user_id", user.id)
    .eq("show_id", body.id);

    if (error)
        return Response.json({ error: error.message });

  return Response.json({ ok: true });
}
