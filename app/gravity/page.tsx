"use client";

import { useCareerStore } from "@/lib/store";
import OrbitCard from "@/components/OrbitCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoadingDots from "@/components/LoadingDots";

const jobs = [
  { id: 1, title: 'Frontend Intern', company: 'Google', match: 92, orbitRadius: 180, duration: 20 },
  { id: 2, title: 'Backend Intern', company: 'Stripe', match: 85, orbitRadius: 260, duration: 30 },
  { id: 3, title: 'Data Intern', company: 'Netflix', match: 78, orbitRadius: 340, duration: 40 },
  { id: 4, title: 'ML Intern', company: 'OpenAI', match: 65, orbitRadius: 420, duration: 50 },
];

export default function GravityPage() {
  const { resumeScore, skills } = useCareerStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <div className="flex-1 flex justify-center items-center py-40"><LoadingDots /></div>;

  const hasScore = resumeScore > 0;

  return (
    <div className="flex-1 flex flex-col items-center py-16 px-4 w-full overflow-hidden relative min-h-[90vh]">
      <div className="w-full max-w-7xl flex flex-col items-center z-10">
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 animate-pulse-glow inline-block rounded-full px-8 py-2 border border-brand-gray/20">
            Gravity Score
          </h1>
          <p className="text-brand-gray text-xl max-w-2xl mx-auto mt-4">
            Your career gravity pulls in opportunities. The stronger your profile, the closer the best roles orbit you.
          </p>
        </div>

        {!hasScore ? (
          <div className="flex flex-col items-center justify-center p-16 bg-[#111] border border-dashed border-brand-gray/50 rounded-3xl w-full max-w-2xl text-center z-20 shadow-2xl mt-12">
            <h3 className="text-3xl font-bold text-brand-white mb-4">No Gravity Detected</h3>
            <p className="text-brand-gray text-lg mb-10 max-w-md leading-relaxed">Upload your resume to generate your mass and see which companies are pulled into your orbit.</p>
            <Link href="/resume" className="px-10 py-5 bg-brand-white text-brand-black font-bold text-lg rounded-full hover:bg-brand-light transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Initialize Gravity
            </Link>
          </div>
        ) : (
          <div className="relative w-full h-[600px] md:h-[800px] flex items-center justify-center mt-4">
            
            {/* Center Node (The Sun / User) */}
            <div className="absolute w-48 h-48 bg-brand-black border-4 border-brand-white rounded-full flex flex-col items-center justify-center z-20 shadow-[0_0_60px_rgba(255,255,255,0.4)] animate-pulse-glow">
              <span className="text-brand-gray text-sm uppercase tracking-widest font-bold mb-1">Your Mass</span>
              <span className="text-7xl font-extrabold text-brand-white tracking-tighter">{resumeScore}</span>
            </div>

            {/* Orbit Rings and Planets */}
            {jobs.map((job, idx) => (
              <div 
                key={job.id} 
                className="absolute top-1/2 left-1/2 rounded-full border border-brand-gray/20 pointer-events-none"
                style={{
                  width: `${job.orbitRadius * 2}px`,
                  height: `${job.orbitRadius * 2}px`,
                  marginTop: `-${job.orbitRadius}px`,
                  marginLeft: `-${job.orbitRadius}px`,
                }}
              >
                {/* The rotating container */}
                <div 
                  className="w-full h-full animate-spin-slow pointer-events-none"
                  style={{ 
                    '--orbit-duration': `${job.duration}s`,
                    animationDelay: `-${idx * 7}s` 
                  } as React.CSSProperties}
                >
                  {/* The planet that reverse rotates to stay upright */}
                  <div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-reverse-spin pointer-events-auto"
                    style={{ 
                      '--orbit-duration': `${job.duration}s`,
                      animationDelay: `-${idx * 7}s` 
                    } as React.CSSProperties}
                  >
                    <OrbitCard title={job.title} company={job.company} matchScore={job.match} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {hasScore && (
          <div className="mt-8 flex flex-col items-center z-20 bg-brand-black/80 backdrop-blur-md p-8 border border-brand-gray/30 rounded-3xl max-w-2xl text-center">
            <div className="bg-brand-white text-brand-black px-6 py-2 rounded-full font-bold text-sm uppercase tracking-widest mb-6 inline-flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.5)]">
              <div className="w-2 h-2 bg-brand-black rounded-full animate-pulse"></div>
              Strong Pull Detected
            </div>
            <p className="text-brand-light text-lg leading-relaxed">
              Based on your resume, your gravity is pulling heavily towards <span className="text-brand-white font-bold">Frontend</span> roles. Keep upskilling in <span className="text-brand-white font-bold">{skills.length > 0 ? skills[0] : 'React'}</span> to pull them even closer.
            </p>
          </div>
        )}
      </div>

      {/* Subtle background stars/dots */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1.5px,transparent_1.5px)] bg-[size:40px_40px]"></div>
    </div>
  );
}
