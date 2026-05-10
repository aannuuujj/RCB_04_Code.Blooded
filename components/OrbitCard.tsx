import React from 'react';

type OrbitCardProps = {
  title: string;
  company: string;
  matchScore: number;
};

export default function OrbitCard({ title, company, matchScore }: OrbitCardProps) {
  const isHighMatch = matchScore >= 80;
  const glowClass = isHighMatch ? "shadow-[0_0_15px_rgba(255,255,255,0.8)] border-brand-white" : "border-brand-gray/50";

  return (
    <div className={`flex flex-col items-center justify-center p-4 bg-[#111] rounded-full w-32 h-32 border-2 ${glowClass} backdrop-blur-md cursor-pointer hover:scale-110 transition-transform z-10`}>
      <p className="text-[10px] uppercase tracking-widest text-brand-gray font-bold text-center mb-1 line-clamp-1 w-full px-2">{company}</p>
      <p className="text-brand-white font-bold text-sm text-center leading-tight px-1 line-clamp-2 mb-2">{title}</p>
      <span className="bg-brand-white text-brand-black text-[10px] font-bold px-2 py-0.5 rounded-full">{matchScore}%</span>
    </div>
  );
}
