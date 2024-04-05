// 344. Connecting Supabase With Our React App

import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL } from "../utils/constants";

export const supabaseUrl = SUPABASE_URL;

const supabaseKey = SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
