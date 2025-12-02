import { createClient } from '@supabase/supabase-js';

// TODO: Replace these with your actual Supabase Project URL and Anon Key
// You can find these in your Supabase Dashboard -> Settings -> API
const SUPABASE_URL = 'https://your-project-id.supabase.co'; 
const SUPABASE_ANON_KEY = 'your-anon-key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
