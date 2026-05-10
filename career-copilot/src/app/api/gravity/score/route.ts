import { NextRequest, NextResponse } from "next/server";

function calcGravityScore(
  resume_score: number,
  skill_match_pct: number,
  interview_avg: number,
  applications_sent: number
): number {
  const normalized_interview = (interview_avg / 10) * 100;
  const normalized_apps = Math.min((applications_sent / 50) * 100, 100);
  const score =
    resume_score * 0.30 +
    skill_match_pct * 0.35 +
    normalized_interview * 0.25 +
    normalized_apps * 0.10;
  return Math.round(Math.min(Math.max(score, 0), 100));
}

function getOrbitLabel(score: number): string {
  if (score >= 80) return "Top Fit";
  if (score >= 60) return "Strong Match";
  if (score >= 40) return "Potential";
  return "Explore More";
}

function getAction(score: number): string {
  if (score >= 80) return "Apply Now — you are in the top orbit!";
  if (score >= 60) return "Strengthen your profile and apply soon.";
  if (score >= 40) return "Build more skills to improve your gravity.";
  return "Explore alternative roles and upskill.";
}

function getMotivation(score: number): string {
  if (score >= 80) return "\"You are perfectly aligned. The job is yours to lose.\"";
  if (score >= 60) return "\"Strong trajectory. Keep pushing and you'll lock in.\"";
  if (score >= 40) return "\"Every skill you add brings you closer to orbit.\"";
  return "\"Every expert was once a beginner. Start your orbit today.\"";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      resume_score = 0,
      skill_match_pct = 0,
      interview_avg = 0,
      applications_sent = 0,
      title = "Untitled Role",
    } = body;

    const gravity_score = calcGravityScore(
      Number(resume_score),
      Number(skill_match_pct),
      Number(interview_avg),
      Number(applications_sent)
    );

    const orbit_label = getOrbitLabel(gravity_score);
    const action = getAction(gravity_score);
    const motivation_line = getMotivation(gravity_score);

    return NextResponse.json({
      title,
      gravity_score,
      orbit_label,
      action,
      motivation_line,
    });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
