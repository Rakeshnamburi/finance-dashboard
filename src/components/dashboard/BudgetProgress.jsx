import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { ShoppingBag, Zap, Home, Film, Car, Shield, Utensils } from 'lucide-react';

const BUDGETS = [
  { category: 'Groceries', budget: 6000, icon: ShoppingBag, color: '#F87171' },
  { category: 'Utilities', budget: 4000, icon: Zap, color: '#FBBF24' },
  { category: 'Rent', budget: 20000, icon: Home, color: '#EF4444' },
  { category: 'Entertainment', budget: 2000, icon: Film, color: '#A78BFA' },
  { category: 'Transport', budget: 5000, icon: Car, color: '#22D3EE' },
  { category: 'Insurance', budget: 15000, icon: Shield, color: '#8B5CF6' },
  { category: 'Food & Dining', budget: 3000, icon: Utensils, color: '#FB923C' },
];

export default function BudgetProgress() {
  const { state } = useApp();
  const expenses = state.transactions.filter(t => t.type === 'expense');

  const budgetData = BUDGETS.map(b => {
    const spent = expenses
      .filter(t => t.category === b.category)
      .reduce((sum, t) => sum + t.amount, 0);
    const pct = Math.min((spent / b.budget) * 100, 100);
    return { ...b, spent, pct };
  }).sort((a, b) => b.pct - a.pct);

  return (
    <div className="glass-card gradient-border p-5 overflow-hidden relative">
      <div className="absolute bottom-0 left-0 w-[200px] h-[100px] bg-gradient-to-tr from-accentAmber/[0.03] to-transparent pointer-events-none rounded-2xl" />
      
      <div className="flex items-center justify-between mb-5 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-accentAmberGlow flex items-center justify-center">
            <Shield className="w-4 h-4 text-accentAmber" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-textPrimary">Budget Tracker</h3>
            <p className="text-[0.6rem] text-textMuted">Monthly spending limits</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3.5 relative z-10 max-h-[300px] overflow-y-auto scrollbar-custom pr-1">
        {budgetData.map((item) => {
          const Icon = item.icon;
          const isOverBudget = item.pct >= 90;
          const isWarning = item.pct >= 70 && item.pct < 90;
          
          return (
            <div key={item.category} className="group">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <Icon 
                    className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" 
                    style={{ color: item.color }} 
                    strokeWidth={1.8} 
                  />
                  <span className="text-[0.75rem] font-medium text-textSecondary">{item.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[0.7rem] font-mono font-semibold text-textPrimary">
                    {formatCurrency(item.spent)}
                  </span>
                  <span className="text-[0.6rem] text-textMuted">
                    / {formatCurrency(item.budget)}
                  </span>
                </div>
              </div>
              <div className="h-1.5 w-full bg-bgTertiary/80 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ 
                    width: `${item.pct}%`,
                    background: isOverBudget 
                      ? 'linear-gradient(90deg, #EF4444, #F87171)' 
                      : isWarning
                        ? 'linear-gradient(90deg, #F59E0B, #FBBF24)'
                        : `linear-gradient(90deg, ${item.color}, ${item.color}CC)`,
                    boxShadow: isOverBudget 
                      ? '0 0 12px rgba(239,68,68,0.4)' 
                      : `0 0 8px ${item.color}30`
                  }}
                />
              </div>
              <div className="flex justify-end mt-0.5">
                <span className={`text-[0.6rem] font-semibold ${
                  isOverBudget ? 'text-expenseRed' : isWarning ? 'text-accentAmber' : 'text-textMuted'
                }`}>
                  {Math.round(item.pct)}% used
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
