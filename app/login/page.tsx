"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[80vh] w-full">
      <div className="flex flex-col items-center gap-6 p-12 bg-[#111] border border-brand-gray/30 rounded-2xl shadow-2xl max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-brand-white tracking-tight">Welcome</h1>
        <p className="text-brand-gray text-base mb-4">
          Sign in to access your AI Career Copilot dashboard and start optimizing your resume.
        </p>
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="px-8 py-4 bg-brand-white text-brand-black font-bold rounded-full hover:bg-brand-light transition-all w-full shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:scale-105"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
