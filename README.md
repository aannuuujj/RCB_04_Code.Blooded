# AI Career Copilot 🚀

A production-ready, full-stack platform designed to help students and job seekers optimize their resumes, practice interviews, and visualize their career trajectory.

## Features

- **Resume Analysis**: Upload PDF resumes and get AI-powered critiques, ATS compatibility checks, and targeted rewrite suggestions.
- **Mock Interviews**: Interactive voice-enabled mock interviews using the Web Speech API and Claude AI for real-time feedback and scoring.
- **Gravity Score**: A unique, gamified visualization of your "career gravity"—calculate your pull towards specific job roles based on your resume, skills, and interview performance, visualized with an interactive orbit UI.
- **Dashboard**: Track your progress over time with dynamic Recharts visualizations.
- **Internship Matching**: AI-driven job and internship recommendations.

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React, Tailwind CSS, Framer Motion, Zustand, Recharts, Lucide React
- **Backend**: Python FastAPI (Serverless on Vercel)
- **Database & Auth**: Supabase (PostgreSQL, Storage), NextAuth.js (Google OAuth)
- **AI Models**: Anthropic Claude API

## Prerequisites

- Node.js 18+
- Python 3.9+
- Supabase project
- Anthropic API Key
- Google Cloud Console Project (for NextAuth)

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# AI / Backend
ANTHROPIC_API_KEY=your_anthropic_api_key
```

## Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up python environment (for FastAPI backend):**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Start the development server:**
   ```bash
   vercel dev
   # OR if not using Vercel CLI: npm run dev
   ```
   *Note: Using `vercel dev` is recommended to ensure Next.js API rewrites to FastAPI work correctly locally.*

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

- `/app`: Next.js 16 App Router pages and layouts.
- `/components`: Reusable UI components (GravityOrbit, ScoreRing, StatCards, etc.).
- `/api`: Python FastAPI backend endpoints (serverless functions).
- `/lib`: Utility functions, Zustand store, and Server Actions.
- `/hooks`: Custom React hooks (e.g., `useSpeechInput`).

## License
MIT
