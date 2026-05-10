import React from "react";

export default function LoadingDots() {
  return (
    <div className="flex items-center justify-center p-4 bg-brand-white rounded-xl inline-flex space-x-3 border border-brand-gray">
      <div 
        className="w-3 h-3 bg-brand-black rounded-full animate-bounce" 
        style={{ animationDelay: "0ms" }}
      ></div>
      <div 
        className="w-3 h-3 bg-brand-black rounded-full animate-bounce" 
        style={{ animationDelay: "150ms" }}
      ></div>
      <div 
        className="w-3 h-3 bg-brand-black rounded-full animate-bounce" 
        style={{ animationDelay: "300ms" }}
      ></div>
    </div>
  );
}
