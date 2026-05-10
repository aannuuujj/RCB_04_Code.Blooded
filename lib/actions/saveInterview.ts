"use server";

import { createServerClient } from "../supabase-server";

export async function saveInterview(
  email: string,
  role: string,
  companyType: string,
  sessionScore: number,
  weakAreas: string[],
  strongAreas: string[],
  topTip: string
) {
  try {
    const supabase = createServerClient();
    
    // Lookup user ID
    const { data: profile } = await supabase.from('profiles').select('id').eq('email', email).single();
    if (!profile) return { success: false, error: "User not found" };
    
    const { error } = await supabase.from('interview_sessions').insert({
      user_id: profile.id,
      role: role,
      company_type: companyType,
      session_score: sessionScore,
      weak_areas: weakAreas,
      strong_areas: strongAreas,
      top_tip: topTip
    });

    if (error) {
      console.error("Interview insert error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error("saveInterview action error:", err);
    return { success: false, error: err.message };
  }
}
