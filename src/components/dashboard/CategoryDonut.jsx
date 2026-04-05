import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { PieChart as PieIcon } from 'lucide-react';

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.[0]) return null;
  const data = payload[0].payload;
  return (
    <div className="bg-bgTertiary/95 backdrop-blur-xl border border-borderSubtle rounded-xl p-3 shadow-elevated">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: data.color }} />
        <span className="text-textPrimary text-xs font-semibold">{data.icon} {data.name}</span>
      </div>
      <span className="text-textPrimary text-sm font-bold font-mono">{formatCurrency(data.value)}</span>
    </div>
  );
}

export default function CategoryDonut() {
  const { state } = useApp();
  const data = state.chartData.categoryBreakdown;
  const { totalExpenses } = state.summary;

  return (
    <div className="glass-card gradient-border p-6 h-[420px] flex flex-col overflow-hidden relative">
      {/* Ambient effect */}
      <div className="absolute top-0 left-0 w-[200px] h-[200px] bg-gradient-to-br from-accentPurple/[0.04] to-transparent pointer-events-none rounded-2xl" />
      
      <div className="mb-4 relative z-10">
        <h3 className="text-base font-bold text-textPrimary mb-1 flex items-center gap-2">
          <PieIcon className="w-4 h-4 text-accentPurple" />
          Expense Breakdown
        </h3>
        <p className="text-xs text-textMuted">By category</p>
      </div>

      <div className="flex-1 w-full relative min-h-[180px]">
        <div className="absolute inset-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={75}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
                cornerRadius={6}
                animationBegin={200}
                animationDuration={1200}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    style={{ filter: `drop-shadow(0 0 4px ${entry.color}40)` }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Center label */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="text-[0.6rem] text-textMuted uppercase tracking-wider font-medium">Total</p>
              <p className="text-lg font-bold text-textPrimary font-mono">{formatCurrency(totalExpenses)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-col gap-2 max-h-[110px] overflow-y-auto scrollbar-custom pr-2 relative z-10">
        {data.map((item, index) => {
          const pct = totalExpenses > 0 ? Math.round((item.value / totalExpenses) * 100) : 0;
          return (
            <div key={index} className="flex justify-between items-center text-[0.75rem] group/item hover:bg-bgGlassHover rounded-lg px-2 py-1 -mx-2 transition-colors">
              <div className="flex items-center gap-2.5">
                <span 
                  className="w-2 h-2 rounded-full transition-transform group-hover/item:scale-125" 
                  style={{ background: item.color, boxShadow: `0 0 6px ${item.color}40` }} 
                />
                <span className="text-textSecondary">{item.icon} {item.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-textPrimary font-mono text-xs">{formatCurrency(item.value)}</span>
                <span className="text-textMuted text-[0.65rem] w-8 text-right font-mono bg-bgTertiary/50 px-1.5 py-0.5 rounded">
                  {pct}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
