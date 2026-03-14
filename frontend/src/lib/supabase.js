import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ejpbbizfnexsrggstwht.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqcGJiaXpmbmV4c3JnZ3N0d2h0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxNDY1OTIsImV4cCI6MjA4ODcyMjU5Mn0.My_illINgfrTeiHEZaNclenzvl4I34VfjXIwmQWO2RU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
