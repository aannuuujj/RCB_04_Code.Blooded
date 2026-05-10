export function SkeletonCard({ lines = 3, className = "" }: { lines?: number; className?: string }) {
  return (
    <div className={`bg-white/4 border border-white/8 rounded-2xl p-6 space-y-3 ${className}`}>
      <div className="h-4 bg-white/8 rounded-full w-1/3 animate-pulse" />
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-3 bg-white/5 rounded-full animate-pulse"
          style={{ width: `${75 - i * 10}%` }}
        />
      ))}
    </div>
  );
}
