import { AlertTriangle } from "lucide-react";

interface Props {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorCard({ title = "Something went wrong", message, onRetry }: Props) {
  return (
    <div className="bg-white/4 border border-white/10 rounded-2xl p-6 flex flex-col items-center gap-4 text-center">
      <div className="w-10 h-10 rounded-full bg-white/8 flex items-center justify-center">
        <AlertTriangle size={18} className="text-white/60" />
      </div>
      <div>
        <p className="font-semibold text-white text-sm">{title}</p>
        <p className="text-white/50 text-xs mt-1 max-w-xs">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 text-xs font-medium bg-white text-black rounded-lg hover:bg-white/90 transition-all"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
