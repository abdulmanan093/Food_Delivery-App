import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const supabaseUrl = "https://ihcqlormtldomxpefaga.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloY3Fsb3JtdGxkb214cGVmYWdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2OTczMTIsImV4cCI6MjA0ODI3MzMxMn0.Af579RapeC7lXhQ_j9FUB9wv5g3eiMgZi3R7uKIzXx8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
