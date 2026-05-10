from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.resume import upload, analyze
from api.internship import match
from api.interview import start, answer
from api.gravity import score

app = FastAPI(title="AI Career Copilot API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(upload.router, prefix="/api/resume", tags=["resume"])
app.include_router(analyze.router, prefix="/api/resume", tags=["resume"])
app.include_router(match.router, prefix="/api/internship", tags=["internship"])
app.include_router(start.router, prefix="/api/interview", tags=["interview"])
app.include_router(answer.router, prefix="/api/interview", tags=["interview"])
app.include_router(score.router, prefix="/api/gravity", tags=["gravity"])

@app.get("/api/health")
async def health_check():
    return {
        "success": True,
        "data": {
            "status": "ok"
        },
        "error": None
    }
