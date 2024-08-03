import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rxpkavcroiuswmyglxth.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4cGthdmNyb2l1c3dteWdseHRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI1MDY4NjcsImV4cCI6MjAzODA4Mjg2N30.WIuTIM7L6n8hV7GwAA3tVdX6RyeXt7exQ8MviDGgqqI";
export const supabase = createClient(supabaseUrl, supabaseKey);
