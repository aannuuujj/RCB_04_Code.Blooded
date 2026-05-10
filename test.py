import requests
import json
import os

BASE_URL = "http://localhost:8000"

def test_endpoint(name, method, url, **kwargs):
    print(f"\n--- Testing {name} ({method} {url}) ---")
    try:
        if method == "GET":
            response = requests.get(f"{BASE_URL}{url}", **kwargs)
        else:
            response = requests.post(f"{BASE_URL}{url}", **kwargs)
            
        if response.status_code == 200:
            print("[PASS]")
            try:
                print(json.dumps(response.json(), indent=2))
                return response.json()
            except:
                print(response.text)
        else:
            print(f"[FAIL] Status code: {response.status_code}")
            print(response.text)
    except Exception as e:
        print(f"[ERROR] Failed to connect or execute: {str(e)}")
        print("Make sure your FastAPI server is running on port 8000: 'fastapi dev api/index.py'")
    return None

def run_all_tests():
    # 1. Health
    test_endpoint("Health Check", "GET", "/api/health")
    
    # 2. Resume Upload
    # Create a dummy PDF
    with open("dummy.pdf", "wb") as f:
        f.write(b"%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n5 0 obj\n<< /Length 44 >>\nstream\nBT\n/F1 24 Tf\n100 700 Td\n(Dummy Resume) Tj\nET\nendstream\nendobj\nxref\n0 6\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \n0000000223 00000 n \n0000000311 00000 n \ntrailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n405\n%%EOF\n")
    
    with open("dummy.pdf", "rb") as f:
        test_endpoint("Resume Upload", "POST", "/api/resume/upload", files={"file": f})
    
    os.remove("dummy.pdf")
    
    # 3. Resume Analyze
    test_endpoint("Resume Analyze", "POST", "/api/resume/analyze", json={
        "resume_text": "Experienced Frontend Engineer with 5 years of React and Python.",
        "target_role": "Senior Frontend Developer"
    })
    
    # 4. Internship Match
    test_endpoint("Internship Match", "POST", "/api/internship/match", json={
        "skills": ["React", "Python"],
        "job_title": "Frontend Intern",
        "job_description": "We are looking for a frontend intern who knows React and TypeScript."
    })
    
    # 5. Interview Start
    start_res = test_endpoint("Interview Start", "POST", "/api/interview/start", json={
        "role": "Frontend Developer",
        "company_type": "Startup",
        "resume_summary": "React specialist."
    })
    
    # 6. Interview Answer
    if start_res and "data" in start_res:
        session_id = start_res["data"]["session_id"]
        question = start_res["data"]["question"]
        test_endpoint("Interview Answer", "POST", "/api/interview/answer", json={
            "session_id": session_id,
            "question": question,
            "answer": "I would use React.memo and useCallback.",
            "question_number": 1
        })
        
    # 7. Gravity Score
    test_endpoint("Gravity Score", "POST", "/api/gravity/score", json={
        "resume_score": 80,
        "skill_match_pct": 75,
        "interview_avg": 7.5,
        "applications_sent": 10,
        "job_title": "Frontend Developer"
    })

if __name__ == "__main__":
    run_all_tests()
