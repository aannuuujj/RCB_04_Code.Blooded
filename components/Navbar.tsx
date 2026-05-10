"use client";

import Link from 'next/link';
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="w-full border-b border-brand-gray/30 bg-[#111]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-brand-white font-bold text-xl tracking-tight flex items-center gap-2">
          <span className="w-4 h-4 bg-brand-white rounded-full animate-pulse"></span>
          AI Career Copilot
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/resume" className="text-brand-gray hover:text-brand-white transition-colors text-sm font-semibold uppercase tracking-wider">Resume</Link>
          <Link href="/interview" className="text-brand-gray hover:text-brand-white transition-colors text-sm font-semibold uppercase tracking-wider">Interview</Link>
          <Link href="/dashboard" className="text-brand-gray hover:text-brand-white transition-colors text-sm font-semibold uppercase tracking-wider">Dashboard</Link>
          <Link href="/gravity" className="text-brand-gray hover:text-brand-white transition-colors text-sm font-semibold uppercase tracking-wider flex items-center gap-1">
              Gravity Score
          </Link>
          
          <div className="w-px h-4 bg-brand-gray/30 mx-2"></div>
          
          {session ? (
            <div className="flex items-center gap-4">
              <span className="text-brand-white text-sm font-semibold">{session.user?.name}</span>
              <button onClick={() => signOut({ callbackUrl: '/' })} className="text-brand-gray hover:text-brand-white transition-colors text-sm font-semibold uppercase tracking-wider">
                Sign Out
              </button>
            </div>
          ) : (
            <Link href="/login" className="text-brand-white bg-[#333] hover:bg-[#444] px-4 py-1.5 rounded-full transition-colors text-sm font-semibold uppercase tracking-wider">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
