import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ptcrrzshpbcdagmdrjcv.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_URL as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
