from fastapi import APIRouter
from pydantic import BaseModel
from api.utils.claude_client import call_claude

router = APIRouter()

class AnalyzeRequest(BaseModel):
    resume_text: str
    target_role: str = ""

mock_response = {
    "overall_score": 85,
    "scores": {
        "skills": 90,
        "experience": 80,
        "format": 85,
        "keywords": 85
    },
    "top_3_improvements": [
        "Quantify your achievements with hard metrics",
        "Include more action verbs at the start of bullets",
        "Add a dedicated skills section for ATS systems"
    ],
    "ats_friendly": True,
    "ai_rewrites": [
        "Led a team of 5 to increase application performance by 40% using React memoization.",
        "Engineered scalable backend APIs handling 10k+ concurrent requests.",
        "Optimized database queries reducing load time by 30%."
    ],
    "extracted_skills": ["React", "Python", "TypeScript", "FastAPI"]
}

@router.post("/analyze")
async def analyze_resume(req: AnalyzeRequest):
    system_prompt = """
    You are an expert resume reviewer. Analyze the resume and return ONLY valid JSON with:
    - overall_score (0-100)
    - scores (object containing: skills, experience, format, keywords, all 0-100)
    - top_3_improvements (array of 3 strings)
    - ats_friendly (boolean)
    - ai_rewrites (array of 3 strings, rewritten bullets)
    - extracted_skills (array of string tags)
    
    No extra text. Only JSON.
    """
    
    user_prompt = f"Target Role: {req.target_role}\n\nResume Text:\n{req.resume_text}"
    
    result = await call_claude(system_prompt, user_prompt, mock_response)
    
    if "scores" not in result:
        result = mock_response
        
    return result
