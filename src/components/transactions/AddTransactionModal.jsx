import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ACTIONS } from '../../context/AppReducer';
import { CATEGORIES } from '../../data/mockData';
import Button from '../common/Button';
import { X, Plus, FileText, IndianRupee, Tag, Landmark, CalendarDays } from 'lucide-react';

export default function AddTransactionModal() {
  const { dispatch } = useApp();
  const [form, setForm] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: 'Groceries',
    account: 'HDFC Savings',
    date: new Date().toISOString().split('T')[0],
  });

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.description || !form.amount) return;

    dispatch({
      type: ACTIONS.ADD_TRANSACTION,
      payload: { ...form, id: `txn_${Date.now()}`, amount: Number(form.amount), status: 'completed' },
    });
    dispatch({ type: ACTIONS.SHOW_NOTIFICATION, payload: { type: 'success', message: 'Transaction added successfully!' } });
    dispatch({ type: ACTIONS.CLOSE_MODAL });
  };

  const handleClose = () => dispatch({ type: ACTIONS.CLOSE_MODAL });

  return (
    <div className="fixed inset-0 z-[1000] bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in" onClick={handleClose}>
      <form 
        className="bg-bgSecondary/95 backdrop-blur-2xl border border-borderSubtle rounded-2xl w-full max-w-[520px] overflow-hidden shadow-elevated animate-scale-in" 
        onClick={e => e.stopPropagation()} 
        onSubmit={handleSubmit}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-borderSubtle/50 bg-gradient-to-r from-accentBlue/5 to-accentPurple/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accentBlue to-accentPurple flex items-center justify-center">
              <Plus className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-base font-bold text-textPrimary">Add Transaction</span>
              <p className="text-[0.65rem] text-textMuted">Record a new income or expense</p>
            </div>
          </div>
          <button 
            type="button" 
            className="w-8 h-8 rounded-lg flex items-center justify-center text-textMuted hover:text-textPrimary hover:bg-bgGlassHover transition-all duration-200" 
            onClick={handleClose}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[0.7rem] font-semibold text-textMuted uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3 h-3" /> Description
            </label>
            <input type="text" value={form.description} onChange={e => handleChange('description', e.target.value)} placeholder="e.g. Weekly Groceries" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.7rem] font-semibold text-textMuted uppercase tracking-wider flex items-center gap-1.5">
                <IndianRupee className="w-3 h-3" /> Amount (₹)
              </label>
              <input type="number" min="1" value={form.amount} onChange={e => handleChange('amount', e.target.value)} placeholder="0.00" required />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.7rem] font-semibold text-textMuted uppercase tracking-wider flex items-center gap-1.5">
                <Tag className="w-3 h-3" /> Type
              </label>
              <select value={form.type} onChange={e => handleChange('type', e.target.value)}>
                <option value="expense">📤 Expense</option>
                <option value="income">📥 Income</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.7rem] font-semibold text-textMuted uppercase tracking-wider flex items-center gap-1.5">
                <Tag className="w-3 h-3" /> Category
              </label>
              <select value={form.category} onChange={e => handleChange('category', e.target.value)}>
                {Object.keys(CATEGORIES).map(cat => (
                  <option key={cat} value={cat}>{CATEGORIES[cat].icon} {cat}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.7rem] font-semibold text-textMuted uppercase tracking-wider flex items-center gap-1.5">
                <CalendarDays className="w-3 h-3" /> Date
              </label>
              <input type="date" value={form.date} onChange={e => handleChange('date', e.target.value)} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[0.7rem] font-semibold text-textMuted uppercase tracking-wider flex items-center gap-1.5">
              <Landmark className="w-3 h-3" /> Account
            </label>
            <select value={form.account} onChange={e => handleChange('account', e.target.value)}>
              {['HDFC Savings', 'ICICI Credit', 'SBI Debit', 'SBI Savings', 'Paytm Wallet', 'Zerodha'].map(acc => (
                <option key={acc} value={acc}>{acc}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-5 bg-bgPrimary/50 border-t border-borderSubtle/50">
          <Button type="button" variant="ghost" onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="primary" icon={Plus}>Save Transaction</Button>
        </div>
      </form>
    </div>
  );
}
