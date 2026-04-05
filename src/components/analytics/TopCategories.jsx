import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/mockData';
import { formatCurrency } from '../../utils/formatCurrency';
import { Award, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function TopCategories() {
  const { state } = useApp();
  const data = state.chartData.categoryBreakdown;
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div className="glass-card gradient-border p-6 h-[420px] flex flex-col overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[200px] h-[150px] bg-gradient-to-bl from-accentAmber/[0.03] to-transparent pointer-events-none rounded-2xl" />
      
      <div className="mb-6 shrink-0 relative z-10">
        <h3 className="text-base font-bold text-textPrimary mb-1 flex items-center gap-2">
          <Award className="w-4 h-4 text-accentAmber" />
          Top Spending Categories
        </h3>
        <p className="text-xs text-textMuted">Ranked by total expense amount</p>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-custom pr-2 flex flex-col gap-4 relative z-10">
        {data.map((item, index) => {
          const cat = CATEGORIES[item.name];
          const maxVal = data[0]?.value || 1;
          const percentage = Math.max((item.value / maxVal) * 100, 4);

          return (
            <div 
              key={item.name} 
              className="group flex gap-3 items-center hover:bg-bgGlassHover rounded-xl p-2 -mx-2 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-8 h-8 flex items-center justify-center shrink-0">
                {index < 3 ? (
                  <span className="text-lg">{medals[index]}</span>
                ) : (
                  <span className="bg-bgTertiary/80 w-7 h-7 rounded-lg inline-flex items-center justify-center text-[0.7rem] font-bold text-textMuted border border-borderSubtle">
                    {index + 1}
                  </span>
                )}
              </div>
              <div 
                className="w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{ background: cat?.bgColor || 'rgba(107,112,128,0.12)' }}
              >
                {cat?.icon || '📦'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[0.8rem] text-textPrimary font-medium truncate">{item.name}</span>
                  <span className="font-mono font-bold text-textPrimary text-xs ml-2">
                    {formatCurrency(item.value)}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-bgTertiary/80 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: animated ? `${percentage}%` : '0%',
                      background: `linear-gradient(90deg, ${item.color}, ${item.color}CC)`,
                      boxShadow: `0 0 12px ${item.color}50`,
                      transitionDelay: `${index * 150}ms`
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
