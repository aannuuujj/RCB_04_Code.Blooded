# 🚀 AI Career Copilot

> **AI-powered career platform for students** — Resume analysis, internship matching, mock interviews, gravity score visualization, and career growth tracking.

Built for **GDG Nagpur Hackathon 2025** by **Team RCB_04_Code.Blooded**

---

## ✨ Features

| Feature | Description |
|---|---|
| **Resume Analysis** | Upload resume → AI scores it, detects skills, finds gaps, and gives suggestions |
| **Internship Matching** | Browse AI-ranked internships by profile match % |
| **Mock Interview** | Practice 7 curated interview questions with scoring + voice input |
| **Gravity Score** ⭐ | Our signature visual — orbiting jobs around you based on profile strength |
| **Career Dashboard** | Track resume score, interview avg, match %, and activity feed |

---

## 🧠 The Gravity Score (Innovation Feature)

The **Gravity Score** is our standout innovation. It uses a weighted formula:

```
gravity_score =
  resume_score    × 0.30 +
  skill_match_pct × 0.35 +
  interview_avg   × 0.25 +  (normalized 0→100)
  applications    × 0.10    (normalized 0→100)
```

Jobs are then visualized as **orbiting planets** around you:
- Score **80-100** → orbit radius 90px (very close — Top Fit)
- Score **60-79** → orbit radius 150px (Strong Match)
- Score **40-59** → orbit radius 210px (Potential)
- Score **0-39**  → orbit radius 270px (Explore More, faded)

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 14 (App Router), TypeScript |
| **Styling** | Tailwind CSS |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Voice Input** | Web Speech API (browser-native) |
| **API** | Next.js Route Handlers |

---

## 📁 Project Structure

```
career-copilot/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   ├── layout.tsx            # Root layout with Navbar
│   │   ├── globals.css           # Global styles
│   │   ├── gravity/page.tsx      # Gravity Score page
│   │   ├── resume/page.tsx       # Resume analysis
│   │   ├── internship/page.tsx   # Internship matching
│   │   ├── interview/page.tsx    # Mock interview
│   │   ├── dashboard/page.tsx    # Career dashboard
│   │   └── api/gravity/score/   # Gravity Score API
│   ├── components/
│   │   ├── GravityOrbit.tsx      # ⭐ Orbital animation
│   │   ├── Navbar.tsx            # Navigation bar
│   │   ├── SkeletonCard.tsx      # Loading skeleton
│   │   ├── ErrorCard.tsx         # Error display
│   │   └── EmptyState.tsx        # Empty state
│   └── hooks/
│       └── useSpeechInput.ts     # Web Speech API hook
└── package.json
```

---

## 🚦 Setup Instructions

```bash
# 1. Clone the repo
git clone https://github.com/aannuuujj/RCB_04_Code.Blooded.git
cd RCB_04_Code.Blooded

# 2. Switch to the pranav branch
git checkout pranav

# 3. Enter the project folder
cd career-copilot

# 4. Install dependencies
npm install

# 5. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Environment Variables

No external API keys required! All AI scoring is done via internal logic.

For future Supabase/OpenAI integration, create `.env.local`:

```env
# Optional — for future enhancements
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
OPENAI_API_KEY=your_openai_key
```

---

## 🎬 Demo Flow

```
Home → Resume Upload → Resume Analysis
     → Internship Match
     → Mock Interview (with voice)
     → Dashboard
     → Gravity Score (⭐ showstopper)
```

---

## 👥 Team Members

| Name | Role |
|---|---|
| **Pranav** | Innovation & UI Polish (Gravity Score Orbital, Voice Input) |
| *(Add teammates)* | Backend, Resume AI, Internship Engine |
| *(Add teammates)* | Auth, Database, Deployment |

---

## 🏗 Architecture Overview

```
Browser
  └── Next.js 14 (App Router)
        ├── Static Pages (Home, Dashboard)
        ├── Client Components (Gravity, Interview, Resume)
        └── Route Handlers
              └── /api/gravity/score  →  Weighted scoring algorithm
```

---

## 📸 Screenshots

> *(Add screenshots of: Home, Gravity Orbit, Resume Analysis, Mock Interview, Dashboard)*

---

## 🚀 Deployment (Vercel)

```bash
# Build check
npm run build

# Deploy
vercel --prod
```

---

*Built with ❤️ at GDG Nagpur Hackathon 2025 · Team RCB_04_Code.Blooded*
