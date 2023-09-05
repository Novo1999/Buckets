import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://pefbwwcgplhelebugqox.supabase.co";
export const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlZmJ3d2NncGxoZWxlYnVncW94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM4MDY0NTYsImV4cCI6MjAwOTM4MjQ1Nn0.2YpaoGJgRJOIbM2N_V-C9x6D-UBpae5aO_9pBUwGA1k";
export const supabase = createClient(supabaseUrl, supabaseKey);
