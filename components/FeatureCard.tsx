import React, { ReactNode } from "react";
import Link from "next/link";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
};

export default function FeatureCard({ title, description, icon, href }: FeatureCardProps) {
  return (
    <Link href={href} className="group block h-full">
      <div className="bg-[#111] border border-brand-gray/50 hover:border-brand-white p-8 rounded-2xl h-full flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1">
        <div className="w-14 h-14 bg-brand-white text-brand-black flex items-center justify-center rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-brand-white group-hover:text-white mt-4">{title}</h3>
        <p className="text-brand-gray text-base leading-relaxed flex-1">{description}</p>
        <div className="mt-4 flex items-center text-brand-white font-bold text-sm tracking-widest uppercase gap-2 group-hover:gap-4 transition-all">
          Explore <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </div>
      </div>
    </Link>
  );
}
