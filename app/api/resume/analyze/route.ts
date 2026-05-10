import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { resume_text, target_role } = await req.json();

    // Mock AI Analysis Response
    // In reality, you would pass the resume_text to OpenAI or Gemini here
    
    return NextResponse.json({
      overall_score: 85,
      scores: {
        skills: 90,
        experience: 80,
        format: 85,
        keywords: 88
      },
      top_3_improvements: [
        "Quantify your achievements with numbers (e.g., 'Improved speed by 20%').",
        "Add more cloud deployment keywords (AWS, Docker).",
        "Keep bullet points to one line where possible."
      ],
      ats_friendly: true,
      ai_rewrites: [
        "Spearheaded the migration of legacy architecture to Next.js, reducing load times by 40%.",
        "Engineered scalable REST APIs using Node.js and PostgreSQL for 10k+ daily active users."
      ],
      extracted_skills: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"]
    });
  } catch (error) {
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
  }
}
