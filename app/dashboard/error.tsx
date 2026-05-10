"use client";

import ErrorCard from "@/components/ErrorCard";

export default function DashboardError({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  return (
    <div className="flex-1 flex items-center justify-center py-24 px-4 w-full">
      <div className="max-w-md w-full">
        <ErrorCard 
          title="Dashboard Error" 
          message={error.message || "Failed to load your dashboard data."} 
          onRetry={reset} 
        />
      </div>
    </div>
  );
}
