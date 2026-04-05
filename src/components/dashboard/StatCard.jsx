import { useEffect, useState, useRef } from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({ label, value, icon: Icon, color, bgColor, trend, trendLabel, isPercentage, glowColor }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    const duration = 1200;
    const steps = 50;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current += increment;
      if (step >= steps) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(isPercentage ? parseFloat(current.toFixed(1)) : Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, isPercentage]);

  const formattedValue = isPercentage ? `${displayValue}%` : formatCurrency(displayValue);

  return (
    <div 
      ref={cardRef}
      className="glass-card gradient-border relative p-5 overflow-hidden flex flex-col gap-3 group cursor-default"
    >
      {/* Ambient glow orb */}
      <div 
        className="glow-orb w-[180px] h-[180px] -right-[50px] -top-[50px] opacity-0 group-hover:opacity-20 transition-opacity duration-700" 
        style={{ background: color }} 
      />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* Header */}
      <div className="flex justify-between items-start relative z-10">
        <div className="flex flex-col gap-1">
          <span className="text-[0.65rem] font-bold text-textMuted uppercase tracking-[0.1em]">{label}</span>
        </div>
        <div 
          className="icon-container transition-transform duration-300 group-hover:scale-110"
          style={{ background: bgColor, color }}
        >
          {Icon && <Icon className="w-5 h-5" strokeWidth={1.8} />}
        </div>
      </div>

      {/* Value */}
      <div className={`text-[1.8rem] font-extrabold text-textPrimary font-mono tracking-tight relative z-10 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        {formattedValue}
      </div>

      {/* Trend */}
      {trend !== undefined && (
        <div className="flex items-center gap-2 relative z-10">
          <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[0.7rem] font-semibold ${
            trend >= 0 
              ? 'text-incomeGreen bg-incomeGreenBg' 
              : 'text-expenseRed bg-expenseRedBg'
          }`}>
            {trend >= 0 ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {Math.abs(trend)}%
          </div>
          <span className="text-textMuted text-[0.7rem]">{trendLabel}</span>
        </div>
      )}

      {/* Bottom accent line */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />
    </div>
  );
}
