import { createClient } from '@supabase/supabase-js';

// Fallback for simple server-side fetching if @supabase/ssr is not used
export function createServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

  return createClient(supabaseUrl, supabaseAnonKey);
}