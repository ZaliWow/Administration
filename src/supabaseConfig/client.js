import { createClient } from "@supabase/supabase-js";

export const client = createClient(

    import.meta.env.VITE_URL_SUPABASE,
    import.meta.env.VITE_KEY_SUPABASE)