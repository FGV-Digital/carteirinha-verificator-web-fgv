// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://nukegafomtkaeojtzkbe.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51a2VnYWZvbXRrYWVvanR6a2JlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwNTU3MTEsImV4cCI6MjA2NDYzMTcxMX0.Cs5OQuy6LJPzfFjAEuNVn2SOZkmcpYjUdG9LvwVmnrU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);