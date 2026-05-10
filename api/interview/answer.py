from fastapi import APIRouter
from pydantic import BaseModel
from api.utils.claude_client import call_claude
from api.interview.start import interview_sessions

router = APIRouter()

class AnswerRequest(BaseModel):
    session_id: str
    question: str
    answer: str
    question_number: int

mock_response_continue = {
    "score": 8,
    "feedback": "Good explanation of the core concepts. Try to include a specific example next time.",
    "next_question": "How do you handle state management in large scale applications?",
    "final_report": None
}

mock_response_final = {
    "score": 9,
    "feedback": "Excellent response with clear examples.",
    "next_question": None,
    "final_report": {
        "session_score": 85,
        "weak_areas": ["System Design", "Testing"],
        "strong_areas": ["React", "Performance"],
        "top_tip": "Focus on explaining the 'why' behind your technical decisions during system design questions."
    }
}

@router.post("/answer")
async def submit_answer(req: AnswerRequest):
    is_final = req.question_number >= 5
    mock_fallback = mock_response_final if is_final else mock_response_continue
    
    system_prompt = f"""
    You are a technical interviewer evaluating an answer.
    The candidate was asked: "{req.question}"
    Their answer: "{req.answer}"
    
    Score this answer 0-10.
    {"This is the final question. Generate a final report." if is_final else "Generate the next technical question."}
    
    Return ONLY valid JSON:
    {{
        "score": number,
        "feedback": "2 sentence feedback",
        "next_question": {"null" if is_final else "string"},
        "final_report": {"null" if not is_final else '{"session_score": number, "weak_areas": [], "strong_areas": [], "top_tip": "..."}'}
    }}
    """
    
    user_prompt = "Evaluate the answer and return the JSON."
    
    result = await call_claude(system_prompt, user_prompt, mock_fallback)
    
    if req.session_id in interview_sessions:
        interview_sessions[req.session_id]["current_question_number"] += 1
        
    return result
