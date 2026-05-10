from fastapi import APIRouter, UploadFile, File
import pdfplumber
import tempfile
import os

router = APIRouter()

@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        return {"success": False, "data": None, "error": "Only PDF files are supported."}
    
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            content = await file.read()
            temp_file.write(content)
            temp_path = temp_file.name
            
        resume_text = ""
        with pdfplumber.open(temp_path) as pdf:
            for page in pdf.pages:
                text = page.extract_text()
                if text:
                    resume_text += text + "\n"
                    
        os.unlink(temp_path)
        
        if not resume_text.strip():
            return {"success": False, "data": None, "error": "Could not extract text from PDF."}
            
        return {
            "success": True,
            "data": {"resume_text": resume_text.strip()},
            "error": None
        }
    except Exception as e:
        return {"success": False, "data": None, "error": f"Error parsing PDF: {str(e)}"}
