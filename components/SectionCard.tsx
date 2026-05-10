import React, { ReactNode } from "react";

type SectionCardProps = {
  title: string;
  children: ReactNode;
};

export default function SectionCard({ title, children }: SectionCardProps) {
  return (
    <div className="bg-brand-white border border-brand-gray rounded-2xl p-6 text-brand-black w-full shadow-sm">
      <div className="border-b border-brand-gray/30 pb-4 mb-5">
        <h3 className="text-xl font-bold tracking-tight">{title}</h3>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}
