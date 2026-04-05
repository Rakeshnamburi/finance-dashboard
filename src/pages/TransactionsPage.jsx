import { useApp } from '../context/AppContext';
import FilterBar from '../components/transactions/FilterBar';
import TransactionList from '../components/transactions/TransactionList';
import AddTransactionModal from '../components/transactions/AddTransactionModal';
import { formatCurrency } from '../utils/formatCurrency';
import { ArrowDownCircle, ArrowUpCircle, Hash } from 'lucide-react';

function TransactionStats() {
  const { state } = useApp();
  const filtered = state.filteredTransactions;
  const incomeTotal = filtered.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expenseTotal = filtered.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 stagger-children">
      <div className="flex items-center gap-3 p-4 rounded-xl bg-bgTertiary/30 border border-borderSubtle backdrop-blur-sm">
        <div className="w-10 h-10 rounded-xl bg-accentBlueGlow flex items-center justify-center">
          <Hash className="w-4 h-4 text-accentBlue" />
        </div>
        <div>
          <p className="text-[0.6rem] text-textMuted font-bold uppercase tracking-wider">Total Shown</p>
          <p className="text-lg font-bold font-mono text-textPrimary">{filtered.length}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 p-4 rounded-xl bg-bgTertiary/30 border border-borderSubtle backdrop-blur-sm">
        <div className="w-10 h-10 rounded-xl bg-incomeGreenBg flex items-center justify-center">
          <ArrowDownCircle className="w-4 h-4 text-incomeGreen" />
        </div>
        <div>
          <p className="text-[0.6rem] text-textMuted font-bold uppercase tracking-wider">Income</p>
          <p className="text-lg font-bold font-mono text-incomeGreen">{formatCurrency(incomeTotal)}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 p-4 rounded-xl bg-bgTertiary/30 border border-borderSubtle backdrop-blur-sm">
        <div className="w-10 h-10 rounded-xl bg-expenseRedBg flex items-center justify-center">
          <ArrowUpCircle className="w-4 h-4 text-expenseRed" />
        </div>
        <div>
          <p className="text-[0.6rem] text-textMuted font-bold uppercase tracking-wider">Expenses</p>
          <p className="text-lg font-bold font-mono text-expenseRed">{formatCurrency(expenseTotal)}</p>
        </div>
      </div>
    </div>
  );
}

export default function TransactionsPage() {
  const { state } = useApp();

  return (
    <div className="flex flex-col animate-fade-in h-full">
      <TransactionStats />
      <FilterBar />
      <div className="flex-1">
        <TransactionList />
      </div>
      {state.ui.activeModal === 'addTransaction' && <AddTransactionModal />}
    </div>
  );
}
