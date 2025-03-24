import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://iiesurlfrewarqfwtfap.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpZXN1cmxmcmV3YXJxZnd0ZmFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4NDEyMDMsImV4cCI6MjA1ODQxNzIwM30.Jo8ZqCZVUo7h_UbG70gwT4NMHMpnTAvMSX2kdmHFguE";

export const supabase = createClient(supabaseUrl, supabaseKey);
