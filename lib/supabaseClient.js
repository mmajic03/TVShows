//uvoz funkcije createClient koja omogucava povezivanje s bazom
import { createClient } from "@supabase/supabase-js";

export function createSupabaseClient(session) {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
