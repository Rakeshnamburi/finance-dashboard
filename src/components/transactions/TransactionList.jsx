import { useApp } from '../../context/AppContext';
import { ACTIONS } from '../../context/AppReducer';
import TransactionRow from './TransactionRow';
import EmptyState from '../common/EmptyState';
import { Receipt, ArrowRight } from 'lucide-react';

export default function TransactionList({ limit }) {
  const { state, dispatch } = useApp();
  const transactions = limit
    ? state.filteredTransactions.slice(0, limit)
    : state.filteredTransactions;

  const handleResetFilters = () => {
    dispatch({ type: ACTIONS.RESET_FILTERS });
  };

  return (
    <div className="glass-card gradient-border overflow-hidden animate-fade-in-up">
      <div className="flex items-center justify-between p-5 py-4 border-b border-borderSubtle/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accentPurpleGlow flex items-center justify-center">
            <Receipt className="w-4 h-4 text-accentPurple" />
          </div>
          <div>
            <span className="text-sm font-bold text-textPrimary">
              {limit ? 'Recent Transactions' : 'All Transactions'}
            </span>
            <p className="text-[0.65rem] text-textMuted mt-0.5">
              {limit ? 'Latest activity' : 'Complete transaction history'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[0.7rem] font-semibold text-textMuted bg-bgTertiary/60 px-2.5 py-1 rounded-lg border border-borderSubtle">
            {transactions.length} of {state.transactions.length}
          </span>
          {limit && (
            <button 
              className="flex items-center gap-1 text-[0.7rem] font-semibold text-accentBlue hover:text-accentBlueHover transition-colors"
              onClick={() => dispatch({ type: ACTIONS.SET_ACTIVE_PAGE, payload: 'transactions' })}
            >
              View all <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {transactions.length === 0 ? (
        <EmptyState
          title="No transactions found"
          description="No transactions match your current filters. Try adjusting your search or reset all filters."
          actionLabel="Reset Filters"
          onAction={handleResetFilters}
        />
      ) : (
        <div className="flex flex-col">
          {transactions.map((txn) => (
            <TransactionRow key={txn.id} transaction={txn} />
          ))}
        </div>
      )}
    </div>
  );
}
