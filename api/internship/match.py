from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from api.utils.claude_client import call_claude

router = APIRouter()

class MatchRequest(BaseModel):
    skills: List[str]
    job_title: str
    job_description: str

mock_response = {
    "match_percentage": 78,
    "matched_skills": ["React", "TypeScript"],
    "missing_skills": ["GraphQL", "Next.js"],
    "recommendation": "Upskill First",
    "skill_gap_tip": "Focus on learning GraphQL to complete the frontend stack."
}

@router.post("/match")
async def match_internship(req: MatchRequest):
    system_prompt = """
    You are a hiring assistant. Compare student skills to the job description and return ONLY valid JSON with:
    - match_percentage (0-100)
    - matched_skills (array)
    - missing_skills (array)
    - recommendation (Apply Now / Upskill First / Reach Goal)
    - skill_gap_tip (one sentence)
    
    No extra text. Only JSON.
    """
    
    user_prompt = f"Student Skills: {', '.join(req.skills)}\nJob Title: {req.job_title}\nJob Description: {req.job_description}"
    
    result = await call_claude(system_prompt, user_prompt, mock_response)
    return result
