import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in backend .env');
}

// Server-side Supabase client with Service Role Key (full DB access, bypasses RLS)
// NEVER expose this key to the frontend client
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Anon client — for verifying user JWTs, same as what the frontend uses
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
export const supabaseClient = supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
