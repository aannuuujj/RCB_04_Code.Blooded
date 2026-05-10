import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { skills, description } = await req.json();
    
    // Mock Internship Matching Logic
    return NextResponse.json({
      match_percentage: 78,
      matched_skills: ["React", "JavaScript", "TypeScript"],
      missing_skills: ["GraphQL", "Docker"],
      recommendation: "Upskill First" // Apply Now, Upskill First, Reach Goal
    });
  } catch (error) {
    return NextResponse.json({ error: "Match failed" }, { status: 500 });
  }
}
