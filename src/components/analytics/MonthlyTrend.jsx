import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from 'recharts';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { Activity } from 'lucide-react';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.[0]) return null;
  const val = payload[0].value;
  return (
    <div className="bg-bgTertiary/95 backdrop-blur-xl border border-borderSubtle rounded-xl p-4 shadow-elevated">
      <p className="text-textMuted text-xs font-medium mb-2 pb-2 border-b border-borderSubtle">{label}</p>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-accentCyan" />
        <span className="text-textSecondary text-xs">Net Savings</span>
        <span className={`text-xs font-bold font-mono ml-auto ${val >= 0 ? 'text-incomeGreen' : 'text-expenseRed'}`}>
          {formatCurrency(val)}
        </span>
      </div>
    </div>
  );
}

export default function MonthlyTrend() {
  const { state } = useApp();
  const data = state.chartData.spendingTrend.map(month => ({
    ...month,
    netSavings: month.income - month.expense
  }));

  const avgSavings = data.reduce((sum, d) => sum + d.netSavings, 0) / (data.length || 1);

  return (
    <div className="glass-card gradient-border p-6 h-[420px] flex flex-col overflow-hidden relative">
      <div className="absolute bottom-0 right-0 w-[300px] h-[150px] bg-gradient-to-tl from-accentCyan/[0.03] to-transparent pointer-events-none rounded-2xl" />
      
      <div className="flex items-center justify-between mb-6 shrink-0 relative z-10">
        <div>
          <h3 className="text-base font-bold text-textPrimary mb-1 flex items-center gap-2">
            <Activity className="w-4 h-4 text-accentCyan" />
            Net Savings Trend
          </h3>
          <p className="text-xs text-textMuted">Income minus expenses over time</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accentCyanGlow border border-accentCyan/20">
          <span className="text-[0.7rem] text-textMuted">Avg:</span>
          <span className="text-[0.75rem] font-bold font-mono text-accentCyan">
            {formatCurrency(Math.round(avgSavings))}
          </span>
        </div>
      </div>

      <div className="flex-1 w-full relative min-h-[250px]">
        <div className="absolute inset-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="savingsStroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="50%" stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#A78BFA" />
                </linearGradient>
                <filter id="glowFilter">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
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
              <ReferenceLine 
                y={0} 
                stroke="rgba(255,255,255,0.1)" 
                strokeDasharray="4 4"
                label={{ value: 'Break Even', position: 'insideTopRight', fill: '#64748B', fontSize: 10 }}
              />
              <Line 
                type="monotone" 
                dataKey="netSavings" 
                name="Net Savings" 
                stroke="url(#savingsStroke)" 
                strokeWidth={3} 
                dot={{ r: 4, strokeWidth: 2, fill: '#0a0e1a', stroke: '#06B6D4' }} 
                activeDot={{ r: 7, strokeWidth: 0, fill: '#06B6D4', filter: 'url(#glowFilter)' }}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
