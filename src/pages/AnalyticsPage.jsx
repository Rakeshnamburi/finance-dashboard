import { useApp } from '../context/AppContext';
import StatCard from '../components/dashboard/StatCard';
import IncomeVsExpense from '../components/analytics/IncomeVsExpense';
import TopCategories from '../components/analytics/TopCategories';
import MonthlyTrend from '../components/analytics/MonthlyTrend';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip } from 'recharts';
import { CATEGORIES } from '../data/mockData';
import { formatCurrency } from '../utils/formatCurrency';
import { 
  Wallet, TrendingUp, TrendingDown, Target, 
  PieChart, Gauge, ArrowUpRight, ArrowDownRight 
} from 'lucide-react';

function SpendingRadar() {
  const { state } = useApp();
  const breakdown = state.chartData.categoryBreakdown;
  const maxVal = breakdown.length > 0 ? breakdown[0].value : 1;

  const radarData = breakdown.slice(0, 6).map(item => ({
    category: item.name,
    value: item.value,
    fullMark: maxVal,
  }));

  return (
    <div className="glass-card gradient-border p-6 h-[420px] flex flex-col overflow-hidden relative">
      <div className="absolute bottom-0 right-0 w-[200px] h-[150px] bg-gradient-to-tl from-accentPink/[0.03] to-transparent pointer-events-none rounded-2xl" />
      
      <div className="mb-4 relative z-10">
        <h3 className="text-base font-bold text-textPrimary mb-1 flex items-center gap-2">
          <Gauge className="w-4 h-4 text-accentPink" />
          Spending Radar
        </h3>
        <p className="text-xs text-textMuted">Category distribution overview</p>
      </div>

      <div className="flex-1 w-full relative min-h-[250px]">
        <div className="absolute inset-0">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
              <defs>
                <linearGradient id="radarFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#A78BFA" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <PolarGrid stroke="rgba(255,255,255,0.06)" />
              <PolarAngleAxis 
                dataKey="category" 
                tick={{ fill: '#94A3B8', fontSize: 10 }}
                tickLine={false}
              />
              <Radar
                name="Spending"
                dataKey="value"
                stroke="#6366F1"
                strokeWidth={2}
                fill="url(#radarFill)"
                animationDuration={1500}
                dot={{ r: 3, fill: '#6366F1', strokeWidth: 0 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(30,37,56,0.95)', 
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '12px', 
                  color: '#F1F3F9',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                }}
                formatter={(value) => formatCurrency(value)}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function FinancialHealth() {
  const { state } = useApp();
  const { totalIncome, totalExpenses, savingsRate } = state.summary;
  const expenseRatio = totalIncome > 0 ? (totalExpenses / totalIncome * 100).toFixed(0) : 0;
  
  const healthScore = Math.min(100, Math.max(0, 
    savingsRate * 1.5 + (savingsRate > 20 ? 20 : 0) + (savingsRate > 40 ? 10 : 0)
  )).toFixed(0);

  const healthColor = healthScore >= 70 ? '#10B981' : healthScore >= 40 ? '#F59E0B' : '#EF4444';
  const healthLabel = healthScore >= 70 ? 'Excellent' : healthScore >= 40 ? 'Good' : 'Needs Attention';

  const metrics = [
    { label: 'Expense Ratio', value: `${expenseRatio}%`, sub: 'of income spent', color: Number(expenseRatio) > 70 ? '#EF4444' : '#10B981' },
    { label: 'Savings Rate', value: `${savingsRate}%`, sub: 'of income saved', color: savingsRate > 20 ? '#10B981' : '#F59E0B' },
    { label: 'Net Flow', value: formatCurrency(totalIncome - totalExpenses), sub: 'this period', color: totalIncome > totalExpenses ? '#10B981' : '#EF4444' },
  ];

  return (
    <div className="glass-card gradient-border p-6 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-[200px] h-[120px] bg-gradient-to-br from-incomeGreen/[0.04] to-transparent pointer-events-none rounded-2xl" />
      
      <div className="flex items-center gap-2.5 mb-5 relative z-10">
        <div className="w-8 h-8 rounded-lg bg-incomeGreenBg flex items-center justify-center">
          <PieChart className="w-4 h-4 text-incomeGreen" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-textPrimary">Financial Health</h3>
          <p className="text-[0.6rem] text-textMuted">Overall score & metrics</p>
        </div>
      </div>

      {/* Health Score Circle */}
      <div className="flex items-center gap-6 mb-6 relative z-10">
        <div className="relative w-20 h-20 shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
            <circle 
              cx="50" cy="50" r="40" fill="none" 
              stroke={healthColor}
              strokeWidth="8" 
              strokeLinecap="round"
              strokeDasharray={`${healthScore * 2.51} 251`}
              style={{ 
                transition: 'stroke-dasharray 1.5s ease-out',
                filter: `drop-shadow(0 0 6px ${healthColor}60)`
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-extrabold font-mono" style={{ color: healthColor }}>
              {healthScore}
            </span>
          </div>
        </div>
        <div>
          <p className="text-base font-bold" style={{ color: healthColor }}>{healthLabel}</p>
          <p className="text-[0.7rem] text-textMuted mt-0.5">
            Your financial health score is based on your savings rate and spending habits
          </p>
        </div>
      </div>

      {/* Metrics */}
      <div className="flex flex-col gap-3 relative z-10">
        {metrics.map((m) => (
          <div key={m.label} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-bgGlassHover transition-colors -mx-1">
            <span className="text-[0.75rem] text-textSecondary">{m.label}</span>
            <div className="flex flex-col items-end">
              <span className="text-[0.8rem] font-bold font-mono" style={{ color: m.color }}>
                {m.value}
              </span>
              <span className="text-[0.6rem] text-textMuted">{m.sub}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  const { state } = useApp();
  const { totalIncome, totalExpenses, savingsRate } = state.summary;

  return (
    <div className="flex flex-col gap-4 animate-fade-in pb-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2 stagger-children">
        <StatCard
          label="Total Income"
          value={totalIncome}
          icon={TrendingUp}
          color="#10B981"
          bgColor="rgba(16, 185, 129, 0.12)"
          trend={8.2}
          trendLabel="vs last month"
        />
        <StatCard
          label="Total Expenses"
          value={totalExpenses}
          icon={TrendingDown}
          color="#EF4444"
          bgColor="rgba(239, 68, 68, 0.12)"
          trend={-3.1}
          trendLabel="vs last month"
        />
        <StatCard
          label="Savings Rate"
          value={savingsRate}
          icon={Target}
          color="#6366F1"
          bgColor="rgba(99, 102, 241, 0.12)"
          trend={5.4}
          trendLabel="improvement"
          isPercentage={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <IncomeVsExpense />
        <TopCategories />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <MonthlyTrend />
        </div>
        <FinancialHealth />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SpendingRadar />
      </div>
    </div>
  );
}
