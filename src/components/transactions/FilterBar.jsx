import { useApp } from '../../context/AppContext';
import { ACTIONS } from '../../context/AppReducer';
import { CATEGORIES } from '../../data/mockData';
import { exportToCSV, exportToJSON } from '../../utils/exportData';
import Button from '../common/Button';
import { Filter, RotateCcw, Download, FileJson, Plus, SlidersHorizontal } from 'lucide-react';

export default function FilterBar() {
  const { state, dispatch } = useApp();
  const { filters, role } = state;

  const setFilter = (key, value) => {
    dispatch({ type: ACTIONS.SET_FILTER, payload: { [key]: value } });
  };

  const handleExport = (format) => {
    const data = state.filteredTransactions;
    if (format === 'csv') exportToCSV(data);
    else exportToJSON(data);
    
    dispatch({
      type: ACTIONS.SHOW_NOTIFICATION,
      payload: { type: 'success', message: `Exported ${data.length} transactions as ${format.toUpperCase()}` },
    });
  };

  const hasActiveFilters = filters.category !== 'all' || filters.type !== 'all' || filters.sortBy !== 'date_desc';

  return (
    <div className="flex flex-col gap-3 mb-6 animate-fade-in">
      {/* Filter label */}
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="w-4 h-4 text-textMuted" />
        <span className="text-xs font-bold text-textMuted uppercase tracking-wider">Filters & Actions</span>
        {hasActiveFilters && (
          <span className="w-2 h-2 rounded-full bg-accentBlue animate-pulse-soft" />
        )}
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <select
          className="h-10 min-w-full sm:min-w-[150px] text-[0.8rem] !rounded-xl"
          value={filters.category}
          onChange={(e) => setFilter('category', e.target.value)}
        >
          <option value="all">📂 All Categories</option>
          {Object.keys(CATEGORIES).map((cat) => (
            <option key={cat} value={cat}>{CATEGORIES[cat].icon} {cat}</option>
          ))}
        </select>

        <select
          className="h-10 min-w-full sm:min-w-[140px] text-[0.8rem] !rounded-xl"
          value={filters.type}
          onChange={(e) => setFilter('type', e.target.value)}
        >
          <option value="all">💱 All Types</option>
          <option value="income">📥 Income</option>
          <option value="expense">📤 Expense</option>
        </select>

        <select
          className="h-10 min-w-full sm:min-w-[150px] text-[0.8rem] !rounded-xl"
          value={filters.sortBy}
          onChange={(e) => setFilter('sortBy', e.target.value)}
        >
          <option value="date_desc">🕐 Newest First</option>
          <option value="date_asc">🕐 Oldest First</option>
          <option value="amount_high">💰 Highest Amount</option>
          <option value="amount_low">💰 Lowest Amount</option>
        </select>

        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="md"
            icon={RotateCcw}
            onClick={() => dispatch({ type: ACTIONS.RESET_FILTERS })}
          >
            Reset
          </Button>
        )}

        <div className="flex-1" />

        {role === 'admin' && (
          <>
            <div className="flex gap-1.5 w-full sm:w-auto">
              <Button variant="secondary" size="md" icon={Download} onClick={() => handleExport('csv')} title="Export as CSV">
                CSV
              </Button>
              <Button variant="secondary" size="md" icon={FileJson} onClick={() => handleExport('json')} title="Export as JSON">
                JSON
              </Button>
            </div>
            <Button 
              variant="primary" 
              size="md"
              icon={Plus}
              className="w-full sm:w-auto" 
              onClick={() => dispatch({ type: ACTIONS.OPEN_MODAL, payload: 'addTransaction' })}
            >
              Add Transaction
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
