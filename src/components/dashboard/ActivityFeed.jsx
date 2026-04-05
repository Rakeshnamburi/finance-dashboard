import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/mockData';
import { getRelativeDate } from '../../utils/dateHelpers';
import { formatCurrency } from '../../utils/formatCurrency';
import { Activity, ArrowDownLeft, ArrowUpRight } from 'lucide-react';

export default function ActivityFeed() {
  const { state } = useApp();
  const recentTxns = state.transactions.slice(0, 6);

  return (
    <div className="glass-card gradient-border p-5 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-[150px] h-[100px] bg-gradient-to-br from-accentCyan/[0.03] to-transparent pointer-events-none rounded-2xl" />
      
      <div className="flex items-center gap-2.5 mb-5 relative z-10">
        <div className="w-8 h-8 rounded-lg bg-accentCyanGlow flex items-center justify-center">
          <Activity className="w-4 h-4 text-accentCyan" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-textPrimary">Activity Feed</h3>
          <p className="text-[0.6rem] text-textMuted">Latest transactions</p>
        </div>
      </div>

      <div className="relative z-10">
        {/* Timeline */}
        <div className="flex flex-col">
          {recentTxns.map((txn, i) => {
            const cat = CATEGORIES[txn.category] || { icon: '📦', color: '#6B7080' };
            const isIncome = txn.type === 'income';
            const isLast = i === recentTxns.length - 1;

            return (
              <div key={txn.id} className="flex gap-3 group">
                {/* Timeline line + dot */}
                <div className="flex flex-col items-center">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0 transition-transform group-hover:scale-110"
                    style={{ background: cat.bgColor || 'rgba(107,112,128,0.12)' }}
                  >
                    {cat.icon}
                  </div>
                  {!isLast && (
                    <div className="w-px flex-1 bg-borderSubtle my-1 min-h-[16px]" />
                  )}
                </div>

                {/* Content */}
                <div className={`flex-1 pb-4 ${isLast ? '' : ''}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[0.8rem] font-medium text-textPrimary truncate pr-2">
                      {txn.description}
                    </span>
                    <span className={`font-mono text-[0.75rem] font-bold shrink-0 ${
                      isIncome ? 'text-incomeGreen' : 'text-textSecondary'
                    }`}>
                      {isIncome ? '+' : '-'}{formatCurrency(txn.amount)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[0.65rem] text-textMuted">{getRelativeDate(txn.date)}</span>
                    <span className="w-1 h-1 rounded-full bg-textMuted/30" />
                    <span className="text-[0.65rem]" style={{ color: cat.color }}>{txn.category}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
