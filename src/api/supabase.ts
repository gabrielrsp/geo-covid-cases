import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gpclaazgzldnopgbvwuk.supabase.co'
const supabaseKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwY2xhYXpnemxkbm9wZ2J2d3VrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTMxODY5MTEsImV4cCI6MTk2ODc2MjkxMX0.FfGjNmi168Ago0XwJTOFKjzYH04Hq6sa0tETTxxCpOw'
export const supabase = createClient(supabaseUrl, supabaseKey)
