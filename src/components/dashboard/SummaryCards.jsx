import { useApp } from '../../context/AppContext';
import StatCard from './StatCard';
import { Wallet, ArrowDownCircle, ArrowUpCircle, Target } from 'lucide-react';

export default function SummaryCards() {
  const { state } = useApp();
  const { totalBalance, totalIncome, totalExpenses, savingsRate } = state.summary;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6 stagger-children">
      <StatCard
        label="Total Balance"
        value={totalBalance}
        icon={Wallet}
        color="#6366F1"
        bgColor="rgba(99, 102, 241, 0.12)"
        glowColor="rgba(99, 102, 241, 0.2)"
        trend={12.5}
        trendLabel="vs last month"
      />
      <StatCard
        label="Total Income"
        value={totalIncome}
        icon={ArrowDownCircle}
        color="#10B981"
        bgColor="rgba(16, 185, 129, 0.12)"
        glowColor="rgba(16, 185, 129, 0.2)"
        trend={8.2}
        trendLabel="vs last month"
      />
      <StatCard
        label="Total Expenses"
        value={totalExpenses}
        icon={ArrowUpCircle}
        color="#EF4444"
        bgColor="rgba(239, 68, 68, 0.12)"
        glowColor="rgba(239, 68, 68, 0.2)"
        trend={-3.1}
        trendLabel="vs last month"
      />
      <StatCard
        label="Savings Rate"
        value={savingsRate}
        icon={Target}
        color="#F59E0B"
        bgColor="rgba(245, 158, 11, 0.12)"
        glowColor="rgba(245, 158, 11, 0.2)"
        trend={5.4}
        trendLabel="improvement"
        isPercentage={true}
      />
    </div>
  );
}
