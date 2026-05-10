"use server";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function toggleGoal(id: string, completed: boolean) {
  const { error } = await supabaseAdmin.from('goals').update({ completed }).eq('id', id);
  return { success: !error };
}

export async function addGoal(userId: string, text: string) {
  const today = new Date();
  const { data, error } = await supabaseAdmin.from('goals').insert({
    user_id: userId,
    goal_text: text,
    completed: false,
    week_of: today.toISOString().split('T')[0]
  }).select().single();
  
  return { success: !error, data };
}
