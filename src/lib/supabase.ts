import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  console.error('VITE_SUPABASE_URL is not set in .env file');
}

if (!supabaseKey) {
  console.error('VITE_SUPABASE_ANON_KEY is not set in .env file');
}

export const supabase = createClient(
  supabaseUrl || 'http://placeholder-url.com',
  supabaseKey || 'placeholder-key'
);