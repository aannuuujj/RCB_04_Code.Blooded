import React from 'react';

export default function ErrorCard({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div className="p-4 bg-red-950/30 border border-red-900/50 rounded-xl flex items-center gap-4 text-red-400 w-full animate-fade-in my-2">
      <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
