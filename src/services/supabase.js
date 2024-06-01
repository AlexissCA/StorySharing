import { createClient } from "@supabase/supabase-js";

// TODO - add to server env
export const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
export const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
