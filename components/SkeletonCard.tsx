import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="bg-[#111] p-6 rounded-2xl border border-gray-800 animate-pulse w-full">
      <div className="flex justify-between items-start mb-4">
        <div className="w-1/3 h-6 bg-gray-800 rounded"></div>
        <div className="w-12 h-6 bg-gray-800 rounded"></div>
      </div>
      <div className="w-full h-4 bg-gray-800 rounded mb-3"></div>
      <div className="w-5/6 h-4 bg-gray-800 rounded mb-3"></div>
      <div className="w-4/6 h-4 bg-gray-800 rounded mb-6"></div>
      <div className="flex gap-3">
        <div className="w-16 h-8 bg-gray-800 rounded-full"></div>
        <div className="w-20 h-8 bg-gray-800 rounded-full"></div>
      </div>
    </div>
  );
}
