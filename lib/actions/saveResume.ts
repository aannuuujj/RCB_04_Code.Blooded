"use server";

import { createServerClient } from "../supabase-server";

export async function saveResume(formData: FormData) {
  try {
    const supabase = createServerClient();
    
    const email = formData.get("email") as string;
    const scoresStr = formData.get("scores") as string;
    const scores = JSON.parse(scoresStr || "{}");
    const file = formData.get("file") as File;
    
    if (!email) return { success: false, error: "Missing email" };

    // Lookup user ID
    const { data: profile } = await supabase.from('profiles').select('id').eq('email', email).single();
    if (!profile) return { success: false, error: "User not found" };
    
    const userId = profile.id;

    let file_url = null;
    
    if (file && file.size > 0) {
      const uniqueFileName = `${userId}-${Date.now()}-${file.name}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(uniqueFileName, file, {
          contentType: file.type
        });
        
      if (uploadError) {
        console.error("Storage upload error:", uploadError);
      } else {
        const { data: publicUrlData } = supabase.storage
          .from('resumes')
          .getPublicUrl(uniqueFileName);
        file_url = publicUrlData.publicUrl;
      }
    }

    const { data, error } = await supabase.from('resumes').insert({
      user_id: userId,
      file_url: file_url,
      overall_score: scores.overall_score || 0,
      skills_score: scores.scores?.skills || 0,
      experience_score: scores.scores?.experience || 0,
      format_score: scores.scores?.format || 0,
      keywords_score: scores.scores?.keywords || 0,
      ats_friendly: scores.ats_friendly || false
    });

    if (error) {
      console.error("Resume insert error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error("saveResume action error:", err);
    return { success: false, error: err.message };
  }
}
