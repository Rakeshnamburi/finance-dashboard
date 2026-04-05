import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';
import { MONTHLY_TREND_DATA } from '../../data/mockData';
import { 
  CreditCard, Banknote, PiggyBank, TrendingUp, 
  ArrowUpRight, ArrowDownRight, Landmark
} from 'lucide-react';

const ACCOUNTS = [
  { 
    name: 'HDFC Savings', 
    balance: 124500, 
    type: 'Savings',
    icon: Landmark,
    color: '#6366F1',
    bgColor: 'rgba(99, 102, 241, 0.12)',
    change: 8.2
  },
  { 
    name: 'ICICI Credit', 
    balance: -15800, 
    type: 'Credit Card',
    icon: CreditCard,
    color: '#EF4444',
    bgColor: 'rgba(239, 68, 68, 0.12)',
    change: -12.5
  },
  { 
    name: 'SBI Debit', 
    balance: 32000, 
    type: 'Current',
    icon: Banknote,
    color: '#10B981',
    bgColor: 'rgba(16, 185, 129, 0.12)',
    change: 3.1
  },
  { 
    name: 'Zerodha', 
    balance: 85000, 
    type: 'Investment',
    icon: TrendingUp,
    color: '#06B6D4',
    bgColor: 'rgba(6, 182, 212, 0.12)',
    change: 15.4
  },
];

const miniChartData = MONTHLY_TREND_DATA.map(d => ({ v: d.income - d.expense }));

export default function AccountsOverview() {
  return (
    <div className="glass-card gradient-border p-5 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[200px] h-[100px] bg-gradient-to-bl from-accentBlue/[0.03] to-transparent pointer-events-none rounded-2xl" />
      
      <div className="flex items-center justify-between mb-5 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-accentBlueGlow flex items-center justify-center">
            <PiggyBank className="w-4 h-4 text-accentBlue" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-textPrimary">Accounts</h3>
            <p className="text-[0.6rem] text-textMuted">Connected accounts</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 relative z-10">
        {ACCOUNTS.map((account) => {
          const Icon = account.icon;
          const isPositive = account.change >= 0;
          return (
            <div 
              key={account.name}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-bgGlassHover transition-all duration-300 cursor-pointer group -mx-1"
            >
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{ background: account.bgColor }}
              >
                <Icon className="w-5 h-5" style={{ color: account.color }} strokeWidth={1.8} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[0.8rem] font-semibold text-textPrimary truncate">{account.name}</div>
                <div className="text-[0.65rem] text-textMuted">{account.type}</div>
              </div>
              <div className="flex flex-col items-end gap-0.5 shrink-0">
                <span className={`font-mono font-bold text-[0.8rem] ${account.balance >= 0 ? 'text-textPrimary' : 'text-expenseRed'}`}>
                  {formatCurrency(account.balance)}
                </span>
                <span className={`flex items-center gap-0.5 text-[0.6rem] font-semibold ${isPositive ? 'text-incomeGreen' : 'text-expenseRed'}`}>
                  {isPositive ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowDownRight className="w-2.5 h-2.5" />}
                  {Math.abs(account.change)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
