import { useState, useEffect } from 'react';
import SummaryCards from '../components/dashboard/SummaryCards';
import SpendingChart from '../components/dashboard/SpendingChart';
import CategoryDonut from '../components/dashboard/CategoryDonut';
import TransactionList from '../components/transactions/TransactionList';
import AccountsOverview from '../components/dashboard/AccountsOverview';
import BudgetProgress from '../components/dashboard/BudgetProgress';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/formatCurrency';
import { 
  Sparkles, ArrowUpRight, ArrowDownRight, 
  Zap, Clock, CalendarCheck 
} from 'lucide-react';

function WelcomeBanner() {
  const { state } = useApp();
  const { totalBalance, totalIncome, totalExpenses } = state.summary;
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div className="relative glass-card gradient-border p-6 mb-6 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[200px] bg-gradient-to-bl from-accentBlue/[0.06] via-accentPurple/[0.04] to-transparent pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-[200px] h-[200px] bg-accentCyan/[0.03] rounded-full blur-[60px] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-accentAmber animate-pulse-soft" />
            <span className="text-[0.65rem] font-bold text-accentAmber uppercase tracking-[0.15em]">
              {greeting}
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-textPrimary mb-1">
            Welcome back, <span className="gradient-text">Rakesh</span>
          </h2>
          <p className="text-sm text-textMuted">
            Here's what's happening with your finances today
          </p>
        </div>

        {/* Quick stats */}
        <div className="flex gap-4 flex-wrap">
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-bgTertiary/40 border border-borderSubtle backdrop-blur-sm">
            <div className="w-9 h-9 rounded-lg bg-incomeGreenBg flex items-center justify-center">
              <ArrowDownRight className="w-4 h-4 text-incomeGreen" />
            </div>
            <div>
              <p className="text-[0.6rem] text-textMuted font-medium uppercase tracking-wider">Income</p>
              <p className="text-sm font-bold font-mono text-incomeGreen">{formatCurrency(totalIncome)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-bgTertiary/40 border border-borderSubtle backdrop-blur-sm">
            <div className="w-9 h-9 rounded-lg bg-expenseRedBg flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 text-expenseRed" />
            </div>
            <div>
              <p className="text-[0.6rem] text-textMuted font-medium uppercase tracking-wider">Expenses</p>
              <p className="text-sm font-bold font-mono text-expenseRed">{formatCurrency(totalExpenses)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickActions() {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {[
        { label: 'Quick Transfer', icon: Zap, color: 'from-accentBlue to-accentPurple' },
        { label: 'Recent', icon: Clock, color: 'from-accentCyan to-accentBlue' },
        { label: 'Schedule', icon: CalendarCheck, color: 'from-incomeGreen to-accentCyan' },
      ].map((action) => {
        const Icon = action.icon;
        return (
          <button
            key={action.label}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-bgTertiary/40 border border-borderSubtle text-xs font-medium text-textSecondary hover:text-textPrimary hover:border-borderHover hover:bg-bgGlassHover transition-all duration-300 group backdrop-blur-sm"
          >
            <div className={`w-6 h-6 rounded-md bg-gradient-to-br ${action.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
              <Icon className="w-3 h-3 text-white" strokeWidth={2} />
            </div>
            {action.label}
          </button>
        );
      })}
    </div>
  );
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="flex flex-col animate-fade-in">
      <WelcomeBanner />
      <QuickActions />
      <SummaryCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-4 mb-4">
        <SpendingChart />
        <CategoryDonut />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <AccountsOverview />
        <BudgetProgress />
        <ActivityFeed />
      </div>

      <TransactionList limit={5} />
    </div>
  );
}
