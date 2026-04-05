import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ACTIONS } from '../../context/AppReducer';
import { CATEGORIES } from '../../data/mockData';
import { formatCurrency } from '../../utils/formatCurrency';
import { getRelativeDate } from '../../utils/dateHelpers';
import EditTransactionModal from '../common/EditTransactionModal';
import Badge from '../common/Badge';
import { Pencil, Trash2, ArrowDownLeft, ArrowUpRight, MoreVertical } from 'lucide-react';

export default function TransactionRow({ transaction }) {
  const { state, dispatch } = useApp();
  const { role } = state;
  const [editing, setEditing] = useState(false);
  const cat = CATEGORIES[transaction.category] || { icon: '📦', color: '#6B7080', bgColor: 'rgba(107,112,128,0.12)' };

  const handleDelete = () => {
    if (window.confirm('Delete this transaction?')) {
      dispatch({ type: ACTIONS.DELETE_TRANSACTION, payload: transaction.id });
      dispatch({
        type: ACTIONS.SHOW_NOTIFICATION,
        payload: { type: 'success', message: 'Transaction deleted successfully' },
      });
    }
  };

  const statusVariant = 
    transaction.status === 'completed' ? 'success' :
    transaction.status === 'pending' ? 'warning' : 'default';

  const isIncome = transaction.type === 'income';

  return (
    <>
      <div className="flex items-center gap-3 md:gap-4 px-4 md:px-6 py-4 border-b border-borderSubtle/50 transition-all duration-300 hover:bg-bgGlassHover group relative">
        {/* Category Icon */}
        <div className="relative">
          <div 
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-[1.3rem] transition-transform duration-300 group-hover:scale-105 border border-transparent group-hover:border-borderSubtle"
            style={{ background: cat.bgColor }}
          >
            {cat.icon}
          </div>
          {/* Income/Expense indicator */}
          <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center ${
            isIncome ? 'bg-incomeGreen' : 'bg-bgTertiary border border-borderSubtle'
          }`}>
            {isIncome ? (
              <ArrowDownLeft className="w-2.5 h-2.5 text-white" strokeWidth={2.5} />
            ) : (
              <ArrowUpRight className="w-2.5 h-2.5 text-textMuted" strokeWidth={2.5} />
            )}
          </div>
        </div>

        {/* Description */}
        <div className="flex-1 flex flex-col min-w-0 pr-2">
          <div className="text-[0.9rem] font-semibold text-textPrimary truncate group-hover:text-white transition-colors">
            {transaction.description}
          </div>
          <div className="flex flex-wrap items-center gap-1.5 md:gap-2.5 text-[0.7rem] text-textMuted mt-1">
            <span style={{ color: cat.color }} className="font-medium flex items-center gap-1">
              {transaction.category}
            </span>
            <span className="w-1 h-1 rounded-full bg-textMuted/30 hidden md:block" />
            <span className="hidden md:inline">{getRelativeDate(transaction.date)}</span>
            <span className="w-1 h-1 rounded-full bg-textMuted/30 hidden md:block" />
            <span className="hidden lg:inline text-textMuted/70">{transaction.account}</span>
          </div>
        </div>

        {/* Amount & Status */}
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <span className={`font-mono font-bold text-[0.9rem] transition-all duration-300 ${
            isIncome 
              ? 'text-incomeGreen text-glow-green' 
              : 'text-textPrimary'
          }`}>
            {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
          </span>
          <Badge variant={statusVariant}>{transaction.status}</Badge>
        </div>

        {/* Actions */}
        {role === 'admin' && (
          <div className="hidden md:flex opacity-0 group-hover:opacity-100 items-center gap-1 min-w-[72px] transition-all duration-300 shrink-0">
            <button
              className="w-8 h-8 rounded-lg flex items-center justify-center text-textMuted hover:text-accentBlue hover:bg-accentBlueGlow transition-all duration-200 cursor-pointer"
              onClick={() => setEditing(true)}
              title="Edit transaction"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
              className="w-8 h-8 rounded-lg flex items-center justify-center text-textMuted hover:text-expenseRed hover:bg-expenseRedBg transition-all duration-200 cursor-pointer"
              onClick={handleDelete}
              title="Delete transaction"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {editing && (
        <EditTransactionModal
          transaction={transaction}
          onClose={() => setEditing(false)}
        />
      )}
    </>
  );
}
