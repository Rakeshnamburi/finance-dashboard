import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { TrendingUp } from 'lucide-react';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload) return null;
  return (
    <div className="bg-bgTertiary/95 backdrop-blur-xl border border-borderSubtle rounded-xl p-4 shadow-elevated min-w-[180px]">
      <p className="text-textMuted text-xs font-medium mb-3 pb-2 border-b border-borderSubtle">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center justify-between gap-4 mb-1.5 last:mb-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
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

export default function SpendingChart() {
  const { state } = useApp();
  const data = state.chartData.spendingTrend;

  return (
    <div className="glass-card gradient-border p-6 h-[420px] flex flex-col overflow-hidden relative">
      {/* Ambient effect */}
      <div className="absolute top-0 right-0 w-[300px] h-[200px] bg-gradient-to-bl from-incomeGreen/[0.03] to-transparent pointer-events-none rounded-2xl" />
      
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div>
          <h3 className="text-base font-bold text-textPrimary mb-1 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-incomeGreen" />
            Spending Trends
          </h3>
          <p className="text-xs text-textMuted">Income vs Expenses over time</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-incomeGreen shadow-glowGreen" />
            <span className="text-[0.7rem] text-textMuted">Income</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-expenseRed shadow-glowRed" />
            <span className="text-[0.7rem] text-textMuted">Expenses</span>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full relative min-h-[250px]">
        <div className="absolute inset-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorIncomeNew" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.35} />
                  <stop offset="50%" stopColor="#10B981" stopOpacity={0.1} />
                  <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorExpenseNew" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EF4444" stopOpacity={0.3} />
                  <stop offset="50%" stopColor="#EF4444" stopOpacity={0.08} />
                  <stop offset="100%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="incomeStroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#34D399" />
                </linearGradient>
                <linearGradient id="expenseStroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#EF4444" />
                  <stop offset="100%" stopColor="#F87171" />
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
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="income" 
                name="Income" 
                stroke="url(#incomeStroke)" 
                strokeWidth={2.5} 
                fillOpacity={1} 
                fill="url(#colorIncomeNew)" 
                dot={false}
                activeDot={{ r: 5, strokeWidth: 0, fill: '#10B981', filter: 'drop-shadow(0 0 6px rgba(16,185,129,0.4))' }}
              />
              <Area 
                type="monotone" 
                dataKey="expense" 
                name="Expenses" 
                stroke="url(#expenseStroke)" 
                strokeWidth={2.5} 
                fillOpacity={1} 
                fill="url(#colorExpenseNew)" 
                dot={false}
                activeDot={{ r: 5, strokeWidth: 0, fill: '#EF4444', filter: 'drop-shadow(0 0 6px rgba(239,68,68,0.4))' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
