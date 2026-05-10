import React from "react";

type StatCardProps = {
  title: string;
  value: string | number;
  subtext?: string;
  trend?: "up" | "down" | "neutral";
};

export default function StatCard({ title, value, subtext, trend }: StatCardProps) {
  return (
    <div className="bg-[#111] border border-brand-gray/50 p-6 rounded-2xl flex flex-col justify-center transition-all hover:border-brand-gray">
      <p className="text-brand-gray text-xs uppercase tracking-widest font-bold mb-3">{title}</p>
      <div className="flex items-baseline gap-3">
        <h4 className="text-5xl font-bold text-brand-white tracking-tight">{value}</h4>
        {trend === "up" && <span className="text-green-400 bg-green-900/30 px-2 py-1 rounded text-xs font-bold flex items-center">↑ 12%</span>}
        {trend === "down" && <span className="text-red-400 bg-red-900/30 px-2 py-1 rounded text-xs font-bold flex items-center">↓ 3%</span>}
      </div>
      {subtext && <p className="text-brand-gray text-sm mt-4 border-t border-brand-gray/30 pt-4 leading-relaxed">{subtext}</p>}
    </div>
  );
}
