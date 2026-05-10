import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const createServerClient = () => {
  return createServerComponentClient({ cookies });
};

// Simple test query function as requested
export const testQuery = async () => {
  const supabase = createServerClient();
  const { data, error } = await supabase.from('profiles').select('*');
  console.log("Supabase Test Query Results:", data, error);
  return data;
};
