import React from 'react';
import Link from 'next/link';

type EmptyStateProps = {
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
};

export default function EmptyState({ title, description, actionText, actionHref }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 bg-[#111] border border-dashed border-brand-gray/50 rounded-2xl w-full text-center">
      <div className="w-16 h-16 bg-brand-black border border-brand-gray/30 rounded-full flex items-center justify-center mb-6">
        <svg className="w-8 h-8 text-brand-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
      </div>
      <h3 className="text-2xl font-bold text-brand-white mb-3">{title}</h3>
      <p className="text-brand-gray text-base max-w-md mb-8">{description}</p>
      {actionText && actionHref && (
        <Link href={actionHref} className="px-6 py-3 bg-brand-white text-brand-black font-bold rounded-full hover:bg-brand-light transition-all text-sm tracking-wide">
          {actionText}
        </Link>
      )}
    </div>
  );
}
