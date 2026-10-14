import { createClient } from '@supabase/supabase-js'

// Only imported by the lazy-loaded admin chunk, so visitors never download it.
export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL || 'http://localhost', import.meta.env.VITE_SUPABASE_ANON_KEY || 'missing')
