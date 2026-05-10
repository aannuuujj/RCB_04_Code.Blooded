from fastapi import APIRouter
from pydantic import BaseModel
import uuid
from api.utils.claude_client import call_claude

router = APIRouter()

interview_sessions = {}

class StartInterviewRequest(BaseModel):
    role: str
    company_type: str
    resume_summary: str = ""

mock_response = {
    "question": "Can you walk me through a time when you had to optimize a frontend application for performance? What specific metrics did you focus on?"
}

@router.post("/start")
async def start_interview(req: StartInterviewRequest):
    session_id = str(uuid.uuid4())
    
    system_prompt = f"""
    You are a senior interviewer at a {req.company_type} company hiring for a {req.role} role. 
    Ask question 1 of 5 based on standard requirements for this role.
    
    Return ONLY valid JSON:
    {{
        "question": "..."
    }}
    """
    
    user_prompt = f"Candidate Resume Summary: {req.resume_summary}"
    
    result = await call_claude(system_prompt, user_prompt, mock_response)
    
    interview_sessions[session_id] = {
        "role": req.role,
        "company_type": req.company_type,
        "current_question_number": 1,
        "history": [
            {"role": "assistant", "content": result.get("question", mock_response["question"])}
        ]
    }
    
    return {
        "success": True,
        "data": {
            "session_id": session_id,
            "question_number": 1,
            "question": result.get("question", mock_response["question"])
        },
        "error": None
    }
