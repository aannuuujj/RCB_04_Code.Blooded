from fastapi import APIRouter
from pydantic import BaseModel
from api.utils.claude_client import call_claude

router = APIRouter()

class GravityRequest(BaseModel):
    resume_score: int
    skill_match_pct: int
    interview_avg: float
    applications_sent: int
    job_title: str

mock_response = {
    "gravity_score": 88,
    "orbit_label": "In Orbit",
    "action": "Keep applying, you are highly competitive for this role.",
    "motivation_line": "Your pull is strong—opportunities are moving towards you!"
}

@router.post("/score")
async def calculate_gravity(req: GravityRequest):
    system_prompt = """
    You are an AI career prediction engine that calculates a student Gravity Score.
    The Gravity Score represents how strongly the student will attract the opportunity.
    
    Return ONLY valid JSON:
    {
        "gravity_score": 0-100,
        "orbit_label": "In Orbit / Approaching / Drifting / Too Far",
        "action": "one clear sentence advising next steps",
        "motivation_line": "one encouraging futuristic sentence"
    }
    """
    
    user_prompt = f"""
    Calculate gravity for:
    Resume Score: {req.resume_score}/100
    Skill Match: {req.skill_match_pct}%
    Interview Avg: {req.interview_avg}/10
    Apps Sent: {req.applications_sent}
    Target Role: {req.job_title}
    """
    
    result = await call_claude(system_prompt, user_prompt, mock_response)
    return result
