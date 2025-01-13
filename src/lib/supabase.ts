import { createClient } from '@supabase/supabase-js';

// Эти значения нужно заменить на ваши из настроек проекта Supabase
// Project Settings -> API -> Project URL и anon/public key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase URL or Key');
}

export const supabase = createClient(supabaseUrl || '', supabaseKey || '');