import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { BarChart3 } from 'lucide-react';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload) return null;
  return (
    <div className="bg-bgTertiary/95 backdrop-blur-xl border border-borderSubtle rounded-xl p-4 shadow-elevated min-w-[180px]">
      <p className="text-textMuted text-xs font-medium mb-3 pb-2 border-b border-borderSubtle">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center justify-between gap-6 mb-1.5 last:mb-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: entry.fill }} />
            <span className="text-textSecondary text-xs">{entry.name}</span>
          </div>
          <span className="text-textPrimary text-xs font-bold font-mono">
            {formatCurrency(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function IncomeVsExpense() {
  const { state } = useApp();
  const data = state.chartData.spendingTrend;

  return (
    <div className="glass-card gradient-border p-6 h-[420px] flex flex-col overflow-hidden relative">
      <div className="absolute bottom-0 left-0 w-[250px] h-[150px] bg-gradient-to-tr from-incomeGreen/[0.03] to-transparent pointer-events-none rounded-2xl" />
      
      <div className="flex items-center justify-between mb-6 shrink-0 relative z-10">
        <div>
          <h3 className="text-base font-bold text-textPrimary mb-1 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-accentCyan" />
            Income vs Expenses
          </h3>
          <p className="text-xs text-textMuted">Comparison over time</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-incomeGreen" />
            <span className="text-[0.7rem] text-textMuted">Income</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-expenseRed" />
            <span className="text-[0.7rem] text-textMuted">Expenses</span>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full relative min-h-[250px]">
        <div className="absolute inset-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={4}>
              <defs>
                <linearGradient id="barIncomeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34D399" stopOpacity={1} />
                  <stop offset="100%" stopColor="#10B981" stopOpacity={0.8} />
                </linearGradient>
                <linearGradient id="barExpenseGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F87171" stopOpacity={1} />
                  <stop offset="100%" stopColor="#EF4444" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis 
                dataKey="date" 
                stroke="#64748B" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false} 
                dy={10}
                tickFormatter={(val) => {
                  const d = new Date(val);
                  return `${d.getDate()}/${d.getMonth()+1}`;
                }}
              />
              <YAxis 
                stroke="#64748B" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => `₹${value / 1000}k`}
                dx={-10}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)', radius: 8 }} />
              <Bar 
                dataKey="income" 
                name="Income" 
                fill="url(#barIncomeGrad)" 
                radius={[6, 6, 0, 0]} 
                maxBarSize={32}
                animationDuration={1200}
              />
              <Bar 
                dataKey="expense" 
                name="Expenses" 
                fill="url(#barExpenseGrad)" 
                radius={[6, 6, 0, 0]} 
                maxBarSize={32}
                animationDuration={1200}
                animationBegin={300}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
