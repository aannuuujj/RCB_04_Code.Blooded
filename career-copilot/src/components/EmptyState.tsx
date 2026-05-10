import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

export function EmptyState({ icon: Icon, title, description, action }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center px-4">
      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center">
        <Icon size={24} className="text-white/30" />
      </div>
      <div>
        <p className="text-white font-semibold text-sm">{title}</p>
        {description && <p className="text-white/40 text-xs mt-1 max-w-xs">{description}</p>}
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="px-4 py-2 text-xs font-medium border border-white/20 text-white rounded-lg hover:bg-white/8 transition-all"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
