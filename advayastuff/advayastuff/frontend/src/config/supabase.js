import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://stpwdohjhrzkkmzefwgb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0cHdkb2hqaHJ6a2ttemVmd2diIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzNjQxODEsImV4cCI6MjA1OTk0MDE4MX0.6XuJ4ljM9uIY6b1qVDi5JFstnddTUOVhVLxEAI6Yqx4';

export const supabase = createClient(supabaseUrl, supabaseKey); 