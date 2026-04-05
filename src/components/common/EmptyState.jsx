import { SearchX, RefreshCw } from 'lucide-react';

export default function EmptyState({ icon: Icon = SearchX, title, description, actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center animate-fade-in-up">
      <div className="w-20 h-20 rounded-2xl bg-bgTertiary/50 border border-borderSubtle flex items-center justify-center mb-6 animate-float">
        <Icon className="w-8 h-8 text-textMuted" strokeWidth={1.5} />
      </div>
      <div className="text-lg font-bold text-textPrimary mb-2">{title}</div>
      <div className="text-[0.85rem] text-textMuted max-w-[360px] leading-relaxed mb-6">{description}</div>
      {actionLabel && onAction && (
        <button 
          className="inline-flex items-center gap-2 px-6 py-2.5 text-[0.85rem] font-semibold text-white bg-gradient-to-r from-accentBlue to-accentPurple rounded-xl transition-all duration-300 hover:shadow-glowBlue hover:-translate-y-[1px] active:scale-95"
          onClick={onAction}
        >
          <RefreshCw className="w-4 h-4" />
          {actionLabel}
        </button>
      )}
    </div>
  );
}
