import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
export const supabaseClient = createClient(
	'https://rmjezfqzdtesbrfpzlll.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtamV6ZnF6ZHRlc2JyZnB6bGxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA1NjA1MTcsImV4cCI6MjAzNjEzNjUxN30.7h0NseOph0q3AMXR_eu8sHcEbrFdUNNOr1baB6jGhTA'
);
